$files = Get-ChildItem -Filter *.html -Recurse

foreach ($file in $files) {
    $c = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Update CSS version
    $c = $c -replace 'href="css/style.css\??[a-zA-Z0-9=]*"', 'href="css/style.css?v=6"'
    
    # Remove AI
    $c = $c -replace 'AI 色彩鑑定', '色彩鑑定'
    
    # Update links
    $c = $c -replace 'href="login\.html"', 'href="newlogin.html"'
    $c = $c -replace 'href="account\.html"', 'href="newaccount.html"'
    $c = $c -replace 'action="account\.html"', 'action="newaccount.html"'
    
    # Insert 彩妝品顏色檢測 into nav if missing
    if ($c -notmatch '彩妝品顏色檢測') {
        $c = $c -replace '<a href="color-match\.html"', "`n        <a href=`"makeup-test.html`">彩妝品顏色檢測</a>`n        <a href=`"color-match.html`""
    }

    [System.IO.File]::WriteAllText($file.FullName, $c, [System.Text.Encoding]::UTF8)
}
