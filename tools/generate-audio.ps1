<#
  Synthesise the Unit 2 listening tracks using the offline Windows
  voices that ship with Windows (Microsoft David / Microsoft Zira).

  Run:  powershell -ExecutionPolicy Bypass -File tools/generate-audio.ps1

  Output: audio/_parts/<track>_<nn>.wav  — one file per spoken line.
  These are merged into audio/<track>.wav by tools/build-audio.js.
#>

param(
  [string]$Manifest = (Join-Path $PSScriptRoot 'audio-manifest.json'),
  [string]$OutDir   = (Join-Path $PSScriptRoot '..\audio')
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Speech

$parts = Join-Path $OutDir '_parts'
New-Item -ItemType Directory -Force -Path $OutDir  | Out-Null
New-Item -ItemType Directory -Force -Path $parts  | Out-Null

if (-not (Test-Path $Manifest)) {
  Write-Error "Manifest not found: $Manifest  (run: node tools/build-audio.js)"
  exit 1
}

$json = Get-Content $Manifest -Raw -Encoding UTF8 | ConvertFrom-Json

# pick available voices, falling back to whatever English voice exists
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$installed = @($synth.GetInstalledVoices() | Where-Object { $_.Enabled } | ForEach-Object { $_.VoiceInfo.Name })
$male   = $installed | Where-Object { $_ -match 'David' } | Select-Object -First 1
$female = $installed | Where-Object { $_ -match 'Zira' }  | Select-Object -First 1
if (-not $male)   { $male   = $installed | Where-Object { $_ -match 'en-' } | Select-Object -First 1 }
if (-not $female) { $female = $male }
Write-Host "Voices: D -> $male | Z -> $female"

# -2 rate is roughly the pace of a slow, clear classroom recording
$synth.Rate = -2
$synth.Volume = 100

$total = 0
foreach ($trackProp in $json.PSObject.Properties) {
  $trackId = $trackProp.Name
  $track   = $trackProp.Value
  $n = 0
  foreach ($line in $track.lines) {
    $n++
    $name = if ($line.s -eq 'Z') { $female } else { $male }
    if ($name) {
      try { $synth.SelectVoice($name) } catch { Write-Warning "Voice $name unavailable" }
    }
    $out = Join-Path $parts ('{0}_{1:d2}.wav' -f $trackId, $n)
    $synth.SetOutputToWaveFile($out)
    $synth.Speak([string]$line.t)
    $synth.SetOutputToNull()
    $total++
  }
  Write-Host ("  {0,-12} {1} line(s)" -f $trackId, $n)
}

$synth.Dispose()
Write-Host "Done: $total line(s) written to $parts"
