# Fetch Stitch project screens (HTML + PNG) via MCP API
# Usage: $env:STITCH_API_KEY = "your-key"; .\scripts\fetch-stitch.ps1

param(
  [string]$ProjectId = "839539877217445505",
  [string]$ApiKey = $env:STITCH_API_KEY,
  [string]$OutDir = "$PSScriptRoot\..\stitch"
)

if (-not $ApiKey) {
  Write-Error "Set STITCH_API_KEY environment variable or pass -ApiKey"
  exit 1
}

$screens = @(
  @{ id = "42d493d543834d90b7134f367ac2e332"; name = "dashboard-home" },
  @{ id = "0e5850dd83624d66992f0953d47362dd"; name = "course-dashboard" },
  @{ id = "10023007eb3a41baabf225848235bacc"; name = "social-events-hub" },
  @{ id = "8bb7672a811c46358cd365ece6e7d950"; name = "personal-planner" }
)

New-Item -ItemType Directory -Force -Path $OutDir, "$OutDir\html", "$OutDir\images" | Out-Null

$headers = @{
  "Content-Type" = "application/json"
  "X-Goog-Api-Key" = $ApiKey
}

foreach ($s in $screens) {
  $body = @{
    jsonrpc = "2.0"
    id = 1
    method = "tools/call"
    params = @{
      name = "get_screen"
      arguments = @{
        projectId = $ProjectId
        screenId = $s.id
      }
    }
  } | ConvertTo-Json -Depth 6 -Compress

  $resp = Invoke-RestMethod -Uri "https://stitch.googleapis.com/mcp" -Method POST -Headers $headers -Body $body
  if ($resp.result.isError) {
    Write-Warning "Failed: $($s.name) - $($resp.result.content[0].text)"
    continue
  }

  $data = $resp.result.structuredContent
  Write-Host "Fetched: $($data.title)"

  curl.exe -L -s -o "$OutDir\html\$($s.name).html" $data.htmlCode.downloadUrl
  curl.exe -L -s -o "$OutDir\images\$($s.name).png" $data.screenshot.downloadUrl
}

# Design system (not a screen — use list_design_systems)
$dsBody = @{
  jsonrpc = "2.0"
  id = 2
  method = "tools/call"
  params = @{
    name = "list_design_systems"
    arguments = @{ projectId = $ProjectId }
  }
} | ConvertTo-Json -Depth 4 -Compress

$dsResp = Invoke-RestMethod -Uri "https://stitch.googleapis.com/mcp" -Method POST -Headers $headers -Body $dsBody
if (-not $dsResp.result.isError) {
  $dsResp.result.structuredContent | ConvertTo-Json -Depth 20 | Out-File "$OutDir\design-system.json" -Encoding utf8
  Write-Host "Saved design-system.json"
}

Write-Host "Done. Assets in $OutDir"
