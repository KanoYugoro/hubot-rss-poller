$OCTO_SERVER = "https://octopus.exchange-solutions.tech";
$NPM_MASTER = "https://artifacts.exchange-solutions.tech/artifactory/api/npm/npm-master";
$NPM_BRANCHES = "https://artifacts.exchange-solutions.tech/artifactory/api/npm/npm-branches/";

function Get-Branchname {
  git rev-parse --abbrev-ref HEAD
}

function Get-ShortSha {
  git rev-parse --short HEAD
}

function Get-PackageJson {
  Get-Content .\package.json | ConvertFrom-Json
}

function Git-Tag($version) {
  git tag $version
  git push --tags
}

function Rewrite-Package($json, $version) {
  $json.version = $version
  ($json | ConvertTo-Json) | Out-File -FilePath ".\package.json"
}

function Npm-Pack {
  npm pack
}

function Npm-Publish($artifactName, $path) {
  [System.Net.ServicePointManager]::SecurityProtocol = "TLS12"
  $Uri = $path
  $Source = $artifactName
  $Key = $env:ARTFICATORY_KEY
  Invoke-RestMethod -uri $Uri -Method Put -InFile $Source -Headers @{"X-JFrog-Art-Api"=$Key}
}

function Npm-Push {
  $Json = Get-PackageJson
  $branchName = Get-Branchname
  $packageName = $Json.name
  $shortSha = Get-ShortSha
  if ($branchName -eq "master") {
    $packageVersion = $Json.version
    Git-Tag($packageVersion)
    Rewrite-Package($json,$packageVersion)
    $package = Npm-Pack
    Npm-Publish($package,$NPM_MASTER)
  } else {
    $packageVersion = $Json.version + "-" + $branchName + "-" + $shortSha
    Git-Tag($packageVersion)
    Rewrite-Package($json,$packageVersion)
    $package = Npm-Pack
    Npm-Publish($package,$NPM_BRANCHES)
  }
}
