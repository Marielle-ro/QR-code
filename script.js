const codeReader = new ZXing.BrowserQRCodeReader();
const videoEl = document.getElementById("video");
const resultEl = document.getElementById("result");
const openLinkBtn = document.getElementById("open-link");

let lastScanned = null;

codeReader.getVideoInputDevices().then(videoInputDevices => {
    const deviceId = videoInputDevices.length > 1
        ? videoInputDevices[1].deviceId
        : videoInputDevices[0]?.deviceId;

    codeReader.decodeFromVideoDevice(deviceId, videoEl, (result, err) => {
        if (result) {
            const text = result.getText();

            if (text === lastScanned) return;
            lastScanned = text;

            resultEl.innerText = text;
            resultEl.classList.add("found");

            if (text.startsWith("http://") || text.startsWith("https://")) {
                openLinkBtn.hidden = false;
                openLinkBtn.onclick = () => window.open(text, "_blank");
            } else {
                openLinkBtn.hidden = true;
            }

            setTimeout(() => {
                lastScanned = null;
                resultEl.classList.remove("found");
            }, 5000);
        }
    });
}).catch(err => {
    resultEl.innerText = "Camera error: " + err.message;
    resultEl.style.color = "#ff6b6b";
});