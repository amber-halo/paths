import numpy as np

width = 6
height = 6
maze = np.array ( [ [1, 1, 1, 1, 2, 2],
                    [2, 1, 2, 1, 1, 1],
                    [2, 1, 2, 2, 1, 2],
                    [1, 1, 2, 1, 2, 2],
                    [2, 1, 1, 1, 2, 1],
                    [2, 1, 2, 1, 1, 1] ])
wasHere = np.empty([width, height], dtype=bool)
#wasHere.fill(False)
correctPath = np.empty([width, height], dtype=bool)
startX = 0
startY = 0
endX = 4
endY = 5

def solveMaze():
    wasHere.fill(False)
    correctPath.fill(False)
    #print(wasHere)
    #print(correctPath)
    b = recursiveSolve(startX, startY)
    print(b)
    print(correctPath)
    pass

def recursiveSolve(x, y):
    if (x == endX and y == endY):
        return True

    if (maze[x, y] == 2 or wasHere[x, y]):
        return False

    wasHere[x, y] = True

    if (x != 0):
        if (recursiveSolve(x - 1, y)):
            correctPath[x, y] = True
            return True

    if (x != width - 1):
        if (recursiveSolve(x + 1, y)):
            correctPath[x, y] = True
            return True

    if (y != 0):
        if (recursiveSolve(x, y - 1)):
            correctPath[x, y] = True
            return True

    if (y != height - 1):
        if (recursiveSolve(x, y + 1)):
            correctPath[x, y] = True
            return True

    return False

# Comenzar algoritmo

solveMaze()
