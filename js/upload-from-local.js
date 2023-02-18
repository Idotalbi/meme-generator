
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
      
    }
    reader.readAsDataURL(ev.target.files[0]) 
}

function renderImg(img) {

    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}