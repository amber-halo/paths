function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(() => {
    setMatrix()
    getMatrix()
    $(document).find("#" + startX + "-" + startY).addClass('start')
    $(document).find("#" + endX + "-" + endY).addClass('end')
})

var $table = $('table')

// Handle block drawing

$table.on('mousedown', function() {
    // $(this).find("#tableBody").find("tr").find("td:hover").addClass("blocked")
    // $cell = $(this).find("#tableBody").find("tr").find("td:hover")
    // if (String($cell.className).localeCompare("start") === 0) console.log("start")

    var cell = $(this).find("#tableBody").find("tr").find("td:hover").attr('class')

    if (String(cell).localeCompare("start") === 0)  { // Handle start node drag
        $table.on('mousemove', function () {
            $(this).find(".start").removeClass("start")
            $(this).find("#tableBody").find("tr").find("td:hover").addClass("start")
        }).on('mouseup', function () {
            $table.off('mousemove')
        })
    } else if (String(cell).localeCompare("end") === 0) { // Handle end node drag

        $table.on('mousemove', function () {
            $(this).find(".end").removeClass("end")
            $(this).find("#tableBody").find("tr").find("td:hover").addClass("end")
        }).on('mouseup', function () {
            $table.off('mousemove')
        })

    } else { // Handle block nodes drag

        $table.on('mousemove', function () {
            var className = $(this).find("#tableBody").find("tr").find("td:hover").attr('class')
            if (String(className).localeCompare("start") != 0 && String(className).localeCompare("end") != 0) {
                $(this).find("#tableBody").find("tr").find("td:hover").addClass("blocked")
            }

            // $(this).find("#tableBody").find("tr").find("td:hover").addClass("blocked")
        }).on('mouseup', function () {
            $table.off('mousemove')
        })  

    }
})

// Handle button start

var startX = 0
var startY = 0
var endX = 1
var endY = 1

$("#btnStart").on('click', function () {
    getMatrix()
    startX = parseInt(String($(document).find(".start").attr("id")).split("-")[0])
    startY = parseInt(String($(document).find(".start").attr("id")).split("-")[1])
    endX = parseInt(String($(document).find(".end").attr("id")).split("-")[0])
    endY = parseInt(String($(document).find(".end").attr("id")).split("-")[1])
    console.log(startX + " " + startY + " - " + endX + " " + endY)
    // solveMaze()
    startBFS()
    $(document).find("#" + startX + "-" + startY).removeClass('path').removeClass('searchPath')
    $(document).find("#" + endX + "-" + endY).removeClass('path')
})


// Handle button reset

$("#btnRestart").on('click', function () {
    $("#tableBody").empty()
    setMatrix()
    getMatrix()
    $(document).find("#" + startX + "-" + startY).addClass('start')
    $(document).find("#" + endX + "-" + endY).addClass('end')
})

$("#btnMaze").click(function () {
    mazeGen()
    $(document).find("#" + startX + "-" + startY).removeClass('blocked')
    $(document).find("#" + endX + "-" + endY).removeClass('blocked')
})

//// VARIABLES ////
const width = 50
const height = 50

// const startX = 0
// const startY = 0
// const endX = 0
// const endY = 19

// const startX = parseInt(String($(document).find(".start").attr("id")).split("-")[0])
// const startY = parseInt(String($(document).find(".start").attr("id")).split("-")[1])
// const endX = parseInt(String($(document).find(".end").attr("id")).split("-")[0])
// const endY = parseInt(String($(document).find(".end").attr("id")).split("-")[1])

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

            cell.id = i + "-" + j

            // if (i === startX && j === startY) cell.classList.add('start')
            // if (i === endX && j === endY) cell.classList.add('end')

            if (String(cell.className).localeCompare('blocked') === 0) 
                maze[i][j] = 2
            else
                maze[i][j] = 1
        }
    }
    // console.log(maze);
}

//// SOLVING ALGORITHM //// ////// //// SOLVING ALGORITHM //// ////// //// SOLVING ALGORITHM //// ////// 

// var wasHere = []
// var correctPath = []

// function solveMaze() {
//     // getMatrix()
//     for (let i = 0; i < maze.length; i++) {
//         wasHere[i] = []
//         correctPath[i] = []
//         for (let j = 0; j < maze[i].length; j++) {
//             wasHere[i][j] = false
//             correctPath[i][j] = false
//         }
//     }
//     var b = recursiveSolve(startX, startY)
//     $(document).find("#" + startX + startY).removeClass('path')
//     $(document).find("#" + startX + startY).addClass('start')
//     console.log(b)
//     console.table(correctPath);
//     // drawCells()
// }

// function recursiveSolve(x, y) {
//     if (x == endX && y == endY) return true; 
//     if (maze[x][y] == 2 || wasHere[x][y]) return false; 

//     wasHere[x][y] = true;

//     if (x != 0) // Checks if not on left edge
//         if (recursiveSolve(x-1, y)) { // Recalls method one to the left
//             correctPath[x][y] = true; // Sets that path value to true;
//             drawCell(x, y)
//             return true;
//         }
//     if (x != width - 1) // Checks if not on right edge
//         if (recursiveSolve(x+1, y)) { // Recalls method one to the right
//             correctPath[x][y] = true;
//             drawCell(x, y)
//             return true;
//         }
//     if (y != 0)  // Checks if not on top edge
//         if (recursiveSolve(x, y-1)) { // Recalls method one up
//             correctPath[x][y] = true;
//             drawCell(x, y)
//             return true;
//         }
//     if (y != height - 1) // Checks if not on bottom edge
//         if (recursiveSolve(x, y+1)) { // Recalls method one down
//             correctPath[x][y] = true;
//             drawCell(x, y)
//             return true;
//         }
        
//     return false;
// }

/////////////////////////////////////////////////////////////////////////////////////////////


class Queue {
    constructor () {
        this.items = []
    }

    add (element) {
        this.items.push(element)
    }

    poll () {
        if (this.isEmpty()) 
            return "No elements in queue"
        
        return this.items.shift()
    }

    isEmpty () {
        return this.items.length == 0
    }
}

class Node {
    constructor (x, y, dist, parent) {
        this.x = x
        this.y = y
        this.dist = dist
        this.parent = parent
    }

    toString() {
        return "{" + this.x + ", " + this.y + "}"
    }
}

M = width
N = height

row = [-1, 0, 0, 1]
col = [0, -1, 1, 0]

function isValid(mat, visited, row, col) {
    return (row >= 0) && (row < M) && (col >= 0) && (col < N) && (mat[row][col] == 1 && !visited[row][col])
}

function BFS(mat, i, j, x, y) {
    // var visited = [M][N]
    var visited = []
    for (let a = 0; a < M; a++) {
        visited[a] = []
        for (let b = 0; b < N; b++) {
            visited[a][b] = false
        }
    }

    // console.table(visited)

    var q = new Queue()

    visited[i][j] = true
    q.add(new Node(i, j, 0, null))

    var min_dist = Number.MAX_VALUE
    var node = null

    while (!q.isEmpty()) {
        node = q.poll()

        i = node.x
        j = node.y
        var dist = node.dist

        if (i == x && j == y) {
            min_dist = dist
            break
        }

        for (let k = 0; k < 4; k++) {
            if (isValid(mat, visited, i + row[k], j + col[k])) {
                visited[i + row[k]][j + col[k]] = true
                drawSearchCell(i, j)
                q.add(new Node(i + row[k], j + col[k], dist  +1, node))
            }
        }
    }

    if (min_dist != Number.MAX_VALUE) {
        console.log("The shortest path has length " + min_dist)
        printPath(node)
    } else {
        alert("No hay solucion.")
    }
}

function printPath(node) {
    if (node == null) {
        return
    }
    printPath(node.parent)
    drawCell(node.x, node.y)
    // console.log(node.toString())
}

function startBFS() {
    BFS(maze, startX, startY, endX, endY)
}

//// MAZE ALGORITHM //// ////// //// MAZE ALGORITHM //// ////// //// MAZE ALGORITHM //// //////

var wall = 2
var passage = 1

function mazeGen() {

    // console.table(maze)

    var x = Math.floor(Math.random() * width)
    var y = Math.floor(Math.random() * height)
    let frontier = []
    frontier.push([x, y, x, y])

    let mazeW = []

    for (let i = 0; i < width; i++) {
        mazeW[i] = []
        for (let j = 0; j < height; j++) {
            mazeW[i][j] = false
        }
    }

    console.log(mazeW)

    while (frontier.length != 0) {
        // console.log(frontier.length)
        var f = frontier.splice( Math.floor(Math.random() * frontier.length), 1 )
        // console.table(f)
        x = f[0][2]
        y = f[0][3]
        // console.log(x + " | " + y)

        if (mazeW[x][y] == false) {
            // console.log("hola")
            mazeW[ f[0][0] ] [ f[0][1] ] = mazeW[x][y] = true
            if ( x >= 2 && mazeW[x-2][y] == false )
                frontier.push([x-1, y, x-2, y])
            if ( y >= 2 && mazeW[x][y-2] == false )
                frontier.push([x, y-1, x, y-2])
            if ( x < width-2 && mazeW[x+2][y] == false )
                frontier.push([x+1, y, x+2, y])
            if ( y < height-2 && mazeW[x][y+2] == false )
                frontier.push([x, y+1, x, y+2])
        }
    }

    cadena(mazeW)
}

function cadena(mazeW) {
    let b = ""
    for (let x = 0; x < width + 2; x++) 
        b += "|"
    b += "\n"
    for (let y = 0; y < height; y++) {
        b += "|"
        for (let x = 0; x < width; x++)
            // b += maze[x][y] == 2 ? "|" : " "
            if (mazeW[x][y] == false) {
                b += "|"
                drawBlockCell(x, y)
                // console.log("aqui")
            } else {
                b += " "
            }
        b += "|"
        b += "\n"
    }
    for (let x = 0; x < width + 2; x++)
        b += "|"
    b += "\n"
    console.log(b)
}


///////////////////////////////// DRAWING CELLS //////////////////////////////////////////

async function drawCell(x, y) {
    var id = "#" + x +  "-" + y
    // console.log(id)
    $(document).find(id).addClass('path').removeClass('searchPath')
}

function drawSearchCell(x, y) {
    var id = "#" + x +  "-" + y
    $(document).find(id).addClass('searchPath')
}

function drawBlockCell(x, y) {
    var id = "#" + x +  "-" + y
    $(document).find(id).addClass('blocked')
}