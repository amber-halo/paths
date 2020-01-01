import numpy as np

width = 5
height = 5
#maze = np.array ( [ [1, 1, 1, 1, 2, 2],
#                    [2, 1, 2, 1, 1, 1],
#                    [2, 1, 2, 2, 1, 2],
#                    [1, 1, 2, 1, 2, 2],
#                    [2, 1, 1, 1, 2, 1],
#                    [2, 1, 2, 1, 1, 1] ])
maze = np.array ( [  [1, 1, 1, 1, 2],
                    [1, 2, 1, 1, 2],
                    [1, 2, 1, 1, 2],
                    [1, 2, 2, 1, 2],
                    [1, 2, 2, 2, 2] ] )
wasHere = np.empty([width, height], dtype=bool)
#wasHere.fill(False)
correctPath = np.empty([width, height], dtype=bool)
startX = 0
startY = 0
endX = 3
endY = 3

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
    if (x == endX and y == endY): # Si se llego al final
        return True

    if (maze[x, y] == 2 or wasHere[x, y]): # Si estas en un lugar bloqueado o ya se estuvo aqui
        return False

    wasHere[x, y] = True

    if (x != 0): # Checa si no se sale del limite izquierdo
        if (recursiveSolve(x - 1, y)): # Llama al metodo hacia la izquierda
            correctPath[x, y] = True
            return True

    if (x != width - 1): # Checa si no se sale del limite derecho
        if (recursiveSolve(x + 1, y)): # Llama al metodo hacia la derecha
            correctPath[x, y] = True
            return True

    if (y != 0): # Checa si no se sale del limite arriba
        if (recursiveSolve(x, y - 1)): # Llama al metodo hacia arriba
            correctPath[x, y] = True
            return True

    if (y != height - 1): # Checa si no se sale del limite abajo
        if (recursiveSolve(x, y + 1)): # Llama al metodo hacia abajo
            correctPath[x, y] = True
            return True

    return False

# Comenzar algoritmo

solveMaze()
