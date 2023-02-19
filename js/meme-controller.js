'use strict'

let gElCanvas
let gCtx
let gCurrElImg
let gLineCount = 1
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.getElementById('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    addListeners()
    renderMeme()
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function renderMeme() {
    const img = new Image()
    var meme = getMeme()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach(line => {
            drawText(line.txt, line.size, line.align, line.txtColor,
                line.fillColor, line.font, line.pos.x, line.pos.y, line.txtWidth)

        })

        MarkLine()
    }
}

function drawText(txt, size, align, txtColor, fillColor, font, x, y,) {
    getMeme().lines.forEach(line => {

        gCtx.lineWidth = 2
        gCtx.strokeStyle = txtColor
        gCtx.fillStyle = fillColor
        gCtx.font = `${size}px ${font}`
        gCtx.textAlign = align
        gCtx.textBaseLine = 'middle'

        gCtx.fillText(txt, x, y)
        gCtx.strokeText(txt, x, y)
        line.txtWidth = gCtx.measureText(line.txt).width + 100

    })
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
    document.querySelector('.txt-line-input').value = getSelectedLine().txt
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
    document.querySelector('.txt-line-input').value = getSelectedLine().txt

}

function onDeleteLine() {
    removeLine()
    renderMeme()
    document.querySelector('.txt-line-input').value = getSelectedLine().txt

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
    document.querySelector('.txt-line-input').value = getSelectedLine().txt

}

function MarkLine() {
    const line = getSelectedLine()
    if (!line) return
    const pos = {
        x: line.pos.x - (line.txtWidth / 2),
        y: line.pos.y - (line.size / 2 + 10),
    }
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 3
    gCtx.strokeRect(pos.x, pos.y, line.txtWidth, line.size)
}

function onAlign(align) {
    // MarkLine()
    changeAlign(align)
    renderMeme()
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        onInit()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTxtClicked(pos)) return

    setTxtDrag(true)

    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    let line = getMeme().lines[gMeme.selectedLineIdx].isDrag
    const isDrag = line
    if (!isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveTxt(dx, dy)
    gStartPos = pos
    renderMeme()

}

function onUp() {
    setTxtDrag(false)

    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        console.log('pos:', pos)
    }
    return pos
}
