'use strict'

function renderGallery() {
    const imgs = getImgs()
    // console.log('img:', imgs)
    const strHTMLs = imgs.map((img) => {
        return `
        <article>
        <img onclick="onImgSelect(${img.id})"
        src="${img.url}"/>
        </article>
        `
    })
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    hiddenGallery()
    setImg(imgId)
    renderMeme()
}

