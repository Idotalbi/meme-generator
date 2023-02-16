'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politics', 'trump'] },
    { id: 2, url: 'img/2.jpg', keywords: ['love', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['love', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['love', 'dog'] },
    { id: 5, url: 'img/5.jpg', keywords: ['love', 'dog'] },
    { id: 6, url: 'img/6.jpg', keywords: ['love', 'dog'] },
    { id: 7, url: 'img/7.jpg', keywords: ['love', 'dog'] },
    { id: 8, url: 'img/8.jpg', keywords: ['love', 'dog'] },
    { id: 9, url: 'img/9.jpg', keywords: ['love', 'dog'] },
    { id: 10, url: 'img/10.jpg', keywords: ['love', 'dog'] },
    { id: 11, url: 'img/11.jpg', keywords: ['love', 'dog'] },
    { id: 12, url: 'img/12.jpg', keywords: ['love', 'dog'] },
    { id: 13, url: 'img/13.jpg', keywords: ['love', 'dog'] },
    { id: 14, url: 'img/14.jpg', keywords: ['love', 'dog'] },
    { id: 15, url: 'img/15.jpg', keywords: ['love', 'dog'] },
    { id: 16, url: 'img/16.jpg', keywords: ['love', 'dog'] },
    { id: 17, url: 'img/17.jpg', keywords: ['love', 'dog'] },
    { id: 18, url: 'img/18.jpg', keywords: ['love', 'dog'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter Text Here',
            size: 50,
            align: 'center',
            txtColor: 'white',
            fillColor: 'black',
            font: 'poppins',
            posX: 200,
            posY: 60,
        }

    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(value) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.txt = value
}

function setLineColor(value) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.txtColor = value
}

function setFillColor(value) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.fillColor = value
}

function getImgs() {
    return gImgs
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
        return
    }
    gMeme.selectedLineIdx++
    document.querySelector('.txt-line-input').value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function setLineMove(num) {
    gMeme.lines[gMeme.selectedLineIdx].posY += num
}

function addLine(sticker) {
    const lineCount = gMeme.lines.length
    if (lineCount === 1) {

        var line = {
            txt: sticker || 'Enter Text Here',
            size: 50,
            align: 'center',
            txtColor: 'white',
            fillColor: 'black',
            posX: 200,
            posY: 350
        }
    } else line = {

        txt: sticker || 'Enter Text Here',
        size: 50,
        align: 'center',
        txtColor: 'white',
        fillColor: 'black',
        posX: 200,
        posY: 200
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    return line
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}


