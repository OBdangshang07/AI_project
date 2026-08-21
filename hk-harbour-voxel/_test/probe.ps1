# Headless stats probe (no images): thin wrapper over shots.ps1.
# Prints one PROBE json line per view plus the ASCII luminance map into _test\last.txt.
#   pwsh -File _test\probe.ps1 -Views "harbour,central" -Query "t=18.6"
param(
  [string]$Views = "harbour",
  [string]$Query = "t=18.6",
  [int]$Wait = 120
)
$me = Split-Path -Parent $PSCommandPath
& (Join-Path $me "shots.ps1") -Views $Views -Query $Query -W 0 -Wait $Wait
Get-Content (Join-Path (Split-Path -Parent $me) "_test\last.txt") -ErrorAction SilentlyContinue
