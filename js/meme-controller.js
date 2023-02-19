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
    // resizeCanvas()
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
                line.fillColor, line.font, line.pos.x, line.pos.y)

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


function onAlign(align) {
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
    // console.log('Down')
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos', pos)
    if (!isTxtClicked(pos)) return

    setTxtDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getMeme().lines[0]
    if (!isDrag) return

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveTxt(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderCanvas()

}

function onUp() {
    setTxtDrag(false)
    document.body.style.cursor = 'grab'
}

//   function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
//   }

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        console.log('pos:', pos)
    }
    return pos
}
