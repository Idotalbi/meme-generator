'use strict'

let gElCanvas
let gCtx
let gCurrElImg
function onInit() {
    gElCanvas = document.getElementById('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
}
function renderMeme() {
    const img = new Image()
    var meme = getMeme()
    // console.log('meme:', meme)   
    img.src = `img/${meme.selectedImgId}.jpg`
    const memeTxt = meme.lines[meme.selectedLineIdx]

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(memeTxt.txt, memeTxt.size, memeTxt.align, memeTxt.txtColor, memeTxt.fillColor, 200, 60)
        // drawText(memeTxt.txt, memeTxt.size, memeTxt.align, memeTxt.txtColor, memeTxt.fillColor, 200, 350)
    }
}

function drawText(txt, size, align, txtColor, fillColor, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = txtColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px impact`
    gCtx.textAlign = align
    gCtx.textBaseLine = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onChangeTxt(value) {
    if (gMeme.selectedLineIdx === 'null') return
    setLineTxt(value)
    renderMeme()
}

function onChangeTxtColor(value) {
    if (gMeme.selectedLineIdx === 'null') return
    setLineColor(value)
    renderMeme()
}
function onChangeFillColor(value) {
    if (gMeme.selectedLineIdx === 'null') return
    setFillColor(value)
    renderMeme()
}

function onChangeFontSize(value) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.size += value
    renderMeme(gCurrElImg)
}

function onSwitchLine(){
    switchLine()
    renderMeme()
}

function showGallery(){
    const elGallery=document.querySelector('.gallery')
    const elMemeEditor=document.querySelector('.editor-container')
    elGallery.style.display='grid'
    elMemeEditor.style.display='none'
}

function hiddenGallery(){
    const elGallery=document.querySelector('.gallery')
    const elMemeEditor=document.querySelector('.editor-container')
    elGallery.style.display='none'
    elMemeEditor.style.display='grid'
}