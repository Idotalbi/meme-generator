'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') 
    elLink.href = imgContent
}