# Create a zip file of the application
$source = "."
$destination = "app.zip"

# Create a temporary directory
$tempDir = "temp_deploy"
New-Item -ItemType Directory -Force -Path $tempDir

# Copy files to temporary directory, excluding unnecessary files
Get-ChildItem -Path $source -Exclude "node_modules",".git","app.zip","zip-app.ps1","deploy.ps1" | ForEach-Object {
    $relativePath = $_.FullName.Substring((Get-Location).Path.Length + 1)
    $targetPath = Join-Path $tempDir $relativePath
    $targetDir = Split-Path $targetPath -Parent
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Force -Path $targetDir
    }
    Copy-Item $_.FullName -Destination $targetPath -Force
}

# Create the zip file
Compress-Archive -Path "$tempDir/*" -DestinationPath $destination -Force

# Clean up
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "Application zipped successfully to $destination" 