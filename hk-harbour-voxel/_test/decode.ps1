# Decode JPEG frames + PROBE stats out of an existing _test\dom.txt (no browser run).
#   pwsh -File _test\decode.ps1
param([string]$Tag = "")
$root = Split-Path -Parent $PSCommandPath | Split-Path -Parent
$dump = Join-Path $root "_test\dom.txt"
$dir = Join-Path $root "_test\shots"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
if (!(Test-Path $dump)) { "NO DUMP"; exit 1 }
$txt = [IO.File]::ReadAllText($dump)
"dump chars=$($txt.Length)"

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
if ($shots.Count -eq 0) { "NO SHOTS" }

$m = [regex]::Match($txt, '(?s)<pre id="probe"[^>]*>(.*?)</pre>')
if ($m.Success) {
  $body = $m.Groups[1].Value -replace '&lt;', '<' -replace '&gt;', '>' -replace '&quot;', '"' -replace '&amp;', '&'
  $body | Set-Content (Join-Path $root "_test\last.txt") -Encoding UTF8
  ($body -split "`n" | Where-Object { $_ -match '^PROBE ' }) -join "`n"
}
else {
  $t = [regex]::Match($txt, '<title>(.*?)</title>')
  "NO PROBE BLOCK. title=" + $t.Groups[1].Value
}
