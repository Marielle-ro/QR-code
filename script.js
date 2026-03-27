function onScanSuccess(decodedText, decodedResult) {
    document.getElementById("result").innerText = "Scanned: " + decodedText;

    // OPTIONAL: auto-open links
    if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
        window.open(decodedText, "_blank");
    }
}

function onScanError(errorMessage) {
    // You can ignore scan errors
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: 250 },
    false
);

html5QrcodeScanner.render(onScanSuccess, onScanError);