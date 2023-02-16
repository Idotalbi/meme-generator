'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}