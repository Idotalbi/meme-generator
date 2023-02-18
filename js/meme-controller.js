'use strict'

let gElCanvas
let gCtx
let gCurrElImg
let gLineCount = 1

function onInit() {
    gElCanvas = document.getElementById('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
}

function renderMeme() {
    const img = new Image()
    var meme = getMeme()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach(line => {
            drawText(line.txt, line.size, line.align, line.txtColor,
                line.fillColor, line.font, line.posX, line.posY)

        })

    }
}

function drawText(txt, size, align, txtColor, fillColor, font, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = txtColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseLine = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onChangeTxt(value) {
    setLineTxt(value)
    renderMeme()
}

function onChangeTxtColor(value) {
    setLineColor(value)
    renderMeme()
}

function onChangeFillColor(value) {
    setFillColor(value)
    renderMeme()
}

function onChangeFontSize(value) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.size += value
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onLineUp() {
    setLineMove(-5)
    renderMeme()
}

function onLineDown() {
    setLineMove(5)
    renderMeme()

}

function onAddLine() {
    addLine()
    renderMeme()
}

function onDeleteLine() {
    removeLine()
    renderMeme()
}

function onChangeFont(font) {
    setFont(font)
    renderMeme()
}

function onAddSticker(elSticker) {
    const meme = getMeme()
    const sticker = elSticker.innerText
    const line = addLine(sticker)
    renderMeme()
}

function renderImgFromUser(img) {
    gCurrElImg = img
    resizeCanvas(img)
    renderMeme(gCurrElImg)
}

function onAlign(align) {
    changeAlign(align)
    renderMeme()
}
