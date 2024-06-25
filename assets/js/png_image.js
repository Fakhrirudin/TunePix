function loadImage(event) {
    const output = document.getElementById('uploaded-image');
    output.innerHTML = '';
    const img = document.createElement('img');
    img.id = 'uploadedImage';
    img.src = URL.createObjectURL(event.target.files[0]);
    img.onload = function() {
        URL.revokeObjectURL(img.src); // Free memory
        const sizeInfo = document.getElementById('size-info');
        const originalSize = (event.target.files[0].size / 1024).toFixed(2);
        sizeInfo.innerHTML = `Original Size: ${originalSize} KB`;
    };
    output.appendChild(img);
}
  
function dataURLtoBlob(dataURL) {
    const binary = atob(dataURL.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
}
  
  function compressImagePNG() {
    const img = document.getElementById('uploadedImage');
    if (!img) {
        alert("Please upload an image first.");
        return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const compressedDataURL = canvas.toDataURL('image/png');
    const compressedBlob = dataURLtoBlob(compressedDataURL);
    const compressedSize = (compressedBlob.size / 1024).toFixed(2);
    document.getElementById('size-info').innerHTML += `<br>Compressed Size (PNG): ${compressedSize} KB`;
    const compressedImg = new Image();
    compressedImg.onload = function() {
        const compressedImageDiv = document.getElementById('compressed-image');
        compressedImageDiv.innerHTML = '';
        compressedImageDiv.appendChild(compressedImg);
        const downloadLink = document.createElement('a');
        downloadLink.href = compressedDataURL;
        downloadLink.download = 'compressed_image_PNG.png';
        downloadLink.textContent = 'Download Compressed Image (PNG)';
        downloadLink.id = 'download-compressed-button-png';
        const existingDownloadLink = document.getElementById('download-compressed-button-png');
        if (existingDownloadLink) {
            existingDownloadLink.parentNode.replaceChild(downloadLink, existingDownloadLink);
        } else {
            document.getElementById('download-link').appendChild(downloadLink);
        }
    };
    compressedImg.src = compressedDataURL;
}
