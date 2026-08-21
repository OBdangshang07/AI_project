# Headless render probe: launch Chrome, grab <pre id="probe"> stats/ASCII and
# <pre class="shot"> JPEG frames, write images into _test\shots\.
# Run with pwsh (PowerShell 7) to avoid legacy-encoding issues.
#   pwsh -File _test\shots.ps1 -Views "harbour,central" -Query "t=20.5" -W 960
param(
  [string]$Views = "harbour",
  [string]$Query = "t=18.6",
  [int]$W = 960,
  [int]$Wait = 120,
  [string]$Tag = ""
)
$root = Split-Path -Parent $PSCommandPath | Split-Path -Parent
$dir = Join-Path $root "_test\shots"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$url = "file:///" + ($root.Replace('\', '/')) + "/index.html?probe=1&shot=$W&views=$Views&" + $Query
$stamp = [Guid]::NewGuid().ToString('N').Substring(0, 6)
$dump = Join-Path $root ("_test\dom_" + $stamp + ".txt")
$prof = Join-Path $root ("_test\prof_" + $stamp)
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (!(Test-Path $chrome)) { "NO CHROME at $chrome"; exit 1 }

# Kill leftover headless instances of THIS project only (never the user's browser).
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" -ErrorAction SilentlyContinue |
Where-Object { $_.CommandLine -and $_.CommandLine -like "*hk-harbour-voxel\_test\*" } |
ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 400

$a = "--headless=new --no-sandbox --disable-breakpad --disable-crash-reporter --no-first-run " +
"--disable-dev-shm-usage --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader " +
"--hide-scrollbars --window-size=1280,720 --virtual-time-budget=$($Wait * 1000) " +
"--run-all-compositor-stages-before-draw --user-data-dir=`"$prof`" --dump-dom `"$url`""
cmd /c "`"$chrome`" $a > `"$dump`" 2>nul"
if (!(Test-Path $dump)) { "NO DUMP"; exit 1 }

# dump-dom may still be flushing after cmd returns: wait for </html> + stable size.
$txt = ""; $prev = -1
for ($i = 0; $i -lt 120; $i++) {
  try { $txt = [IO.File]::ReadAllText($dump) } catch { $txt = "" }
  if ($txt.Length -gt 200 -and $txt.TrimEnd().EndsWith("</html>") -and $txt.Length -eq $prev) { break }
  $prev = $txt.Length
  Start-Sleep -Milliseconds 500
}
Copy-Item $dump (Join-Path $root "_test\dom.txt") -Force -ErrorAction SilentlyContinue
Remove-Item $dump -Force -ErrorAction SilentlyContinue
Remove-Item $prof -Recurse -Force -ErrorAction SilentlyContinue
if (!$txt) { "EMPTY DUMP (chrome failed to start)"; exit 1 }
if (!$txt.TrimEnd().EndsWith("</html>")) { "WARN incomplete dump len=" + $txt.Length }

# ---- JPEG frames first, so a parse problem never loses the images ----
$rxShot = '(?s)<pre class="shot" data-n="([^"]+)"[^>]*>(.*?)</pre>'
$shots = [regex]::Matches($txt, $rxShot)
foreach ($s in $shots) {
  $name = $s.Groups[1].Value
  $b64 = ($s.Groups[2].Value -replace '\s', '')
  $file = Join-Path $dir ($name + $Tag + ".jpg")
  try {
    [IO.File]::WriteAllBytes($file, [Convert]::FromBase64String($b64))
    "SHOT " + $file + " " + [Math]::Round((Get-Item $file).Length / 1KB, 1) + "KB"
  }
  catch { "SHOT FAIL " + $name + " : " + $_.Exception.Message }
}
if ($shots.Count -eq 0) { "NO SHOTS (need &shot=<width>)" }

# ---- captured console warnings/errors (shader compile failures show up here) ----
$lg = [regex]::Match($txt, '(?s)<pre id="probelog"[^>]*>(.*?)</pre>')
if ($lg.Success) {
  $body = $lg.Groups[1].Value -replace '&lt;', '<' -replace '&gt;', '>' -replace '&quot;', '"' -replace '&amp;', '&'
  $body | Set-Content (Join-Path $root "_test\console.txt") -Encoding UTF8
  "CONSOLE (" + (($body -split "`n").Count) + " lines) -> _test\console.txt"
  ($body -split "`n" | Select-Object -First 24) -join "`n"
}

# ---- stats + ASCII luminance map ----
$rxProbe = '(?s)<pre id="probe"[^>]*>(.*?)</pre>'
$m = [regex]::Match($txt, $rxProbe)
if ($m.Success) {
  $body = $m.Groups[1].Value -replace '&lt;', '<' -replace '&gt;', '>' -replace '&quot;', '"' -replace '&amp;', '&'
  $body | Set-Content (Join-Path $root "_test\last.txt") -Encoding UTF8
  ($body -split "`n" | Where-Object { $_ -match '^PROBE ' }) -join "`n"
}
else {
  $t = [regex]::Match($txt, '<title>(.*?)</title>')
  "NO PROBE BLOCK. title=" + $t.Groups[1].Value
  $lm = [regex]::Match($txt, '(?s)class="lmsg">(.*?)</div>')
  if ($lm.Success) { "loading msg: " + $lm.Groups[1].Value }
  exit 1
}
