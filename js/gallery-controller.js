'use strict'

var gIsGallery = true

function renderGallery() {
    const imgs = getImgs()
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
    gIsGallery = false
    hiddenGallery()
    setImg(imgId)
    renderMeme()
}

function showGallery() {
    const elGallery = document.querySelector('.gallery')
    const elMemeEditor = document.querySelector('.editor-container')

        elGallery.style.display = 'grid'
        elMemeEditor.style.display = 'none'

}

function hiddenGallery() {
    const elGallery = document.querySelector('.gallery')
    const elMemeEditor = document.querySelector('.editor-container')
        elGallery.style.display = 'none'
        elMemeEditor.style.display = 'grid'
    
}

