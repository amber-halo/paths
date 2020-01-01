$(document).ready(() => {
    setMatrix()
})

// Handle block drawing

var $table = $('table')

$table.on('mousedown', function() {
    $(this).find("#tableBody").find("tr").find("td:hover").addClass("blocked")

    $table.on('mousemove', function () {
        $(this).find("#tableBody").find("tr").find("td:hover").addClass("blocked")
    }).on('mouseup', function () {
        $table.off('mousemove')
    })
})

// Handle button start

$("#btnStart").on('click', function () {
    getMatrix()
    solveMaze()
})


// Handle button reset

$("#btnRestart").on('click', function () {
    $("#tableBody").empty()
    setMatrix()
})

//// VARIABLES ////
const width = 50
const height = 50

const startX = 0
const startY = 0
const endX = 35
const endY = 35

var maze = []

//// FUNCTIONS ////

// Draw table

function setMatrix() {
    var html = ""

    for (let i = 0; i < width; i++) {
        html += "<td></td>"
    }

    for (let i = 0; i < height; i++) {
        $("#tableBody").append("<tr>" + html + "</tr>")
    }
}

// Convert table to matrix

function getMatrix() {
    var table = document.getElementById('table')

    var rowLength = table.rows.length

    for (let i = 0; i < rowLength; i++) {
        maze[i] = []

        var row = table.rows[i]

        var cellLength = row.cells.length

        for (let j = 0; j < cellLength; j++) {
            var cell = row.cells[j]

            // $cell = cell

            cell.id = i + "" + j

            if (i === startX && j === startY) cell.classList.add('start')
            if (i === endX && j === endY) cell.classList.add('end')

            if (String(cell.className).localeCompare('blocked') === 0) 
                maze[i][j] = 2
            else
                maze[i][j] = 1
        }
    }
    // console.log(maze);
}

//// SOLVING ALGORITHM ////

var wasHere = []
var correctPath = []

function solveMaze() {
    // getMatrix()
    for (let i = 0; i < maze.length; i++) {
        wasHere[i] = []
        correctPath[i] = []
        for (let j = 0; j < maze[i].length; j++) {
            wasHere[i][j] = false
            correctPath[i][j] = false
        }
    }
    var b = recursiveSolve(startX, startY)
    $(document).find("#" + startX + startY).removeClass('path')
    $(document).find("#" + startX + startY).addClass('start')
    console.log(b)
    // drawCells()
}

function recursiveSolve(x, y) {
    if (x == endX && y == endY) return true;
    if (maze[x][y] == 2 || wasHere[x][y]) return false; 

    wasHere[x][y] = true;

    if (x != 0) // Checks if not on left edge
        if (recursiveSolve(x-1, y)) { // Recalls method one to the left
            correctPath[x][y] = true; // Sets that path value to true;
            drawCell(x, y)
            return true;
        }
    if (x != width - 1) // Checks if not on right edge
        if (recursiveSolve(x+1, y)) { // Recalls method one to the right
            correctPath[x][y] = true;
            drawCell(x, y)
            return true;
        }
    if (y != 0)  // Checks if not on top edge
        if (recursiveSolve(x, y-1)) { // Recalls method one up
            correctPath[x][y] = true;
            drawCell(x, y)
            return true;
        }
    if (y != height - 1) // Checks if not on bottom edge
        if (recursiveSolve(x, y+1)) { // Recalls method one down
            correctPath[x][y] = true;
            drawCell(x, y)
            return true;
        }
    return false;
}

function drawCell(x, y) {
    var id = "#" + x + y
    // console.log(id)

    $(document).find(id).addClass('path')
}

function drawCells() {
    for (let i = 0; i < correctPath.length; i++) {
        for (let j = 0; j < correctPath[i].length; j++) {
            if (correctPath[i][j] == true && i === startX && j === startY)
                // console.log("i: " + i + ", j: " + j)
                i = i
            else if (correctPath[i][j] == true && i === endX && j === endY) {
                // console.log("i=== " + i + ", j=== " + j)
                i = i
            } else if (correctPath[i][j] == true) {
                drawCell(i, j)
                // console.log("i= " + i + ", j= " + j)
            } 
        }
    }
    // && i != endX && j != endY 
    // console.log(correctPath);
    // console.table(correctPath);
}