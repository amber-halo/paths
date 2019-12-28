import numpy as np
import math 

nodos = ['A', 'B', 'C', 'D', 'E']
cNodos = len(nodos)
costos = np.zeros((cNodos, cNodos))

for i in range (cNodos):
    for j in range (cNodos):
        costos[i, j] = math.inf
        pass
    pass

matriz = costos

costos[0, 1] = 3
costos[0, 2] = 1
costos[1, 0] = 3
costos[1, 2] = 7
costos[1, 3] = 5
costos[1, 4] = 1
costos[2, 0] = 1
costos[2, 1] = 7
costos[2, 3] = 2
costos[3, 1] = 5
costos[3, 2] = 2
costos[3, 4] = 7
costos[4, 1] = 1
costos[4, 3] = 7

print('matriz de costos: \n')
print(costos)

# Comienza algoritmo

# 1. Marcar el nodo inicial con una distancia actual de 0 y el resto con infinito.

# Nodo inicial = A => [0,0]

matriz[i, j] = 0
nodosVisitados = []
distancia  = 0

for i in range(cNodos):
    v = math.inf
    nodoN = 0
    for j in range(cNodos):
        if (costos[i, j] != math.inf):
            suma = distancia + costos[i, j]
            if (suma < v):
                v = suma
                nodoN = j
                pass
            pass
        pass

    i = nodoN
    distancia += v
    print('nuevo nodo = ', i)
    print('distancia actual = ', distancia)
    nodosVisitados.append(1)

    if (len(nodosVisitados) == cNodos):
        break
    #else:
        #print('nodos visitados: ', len(nodosVisitados))
    pass
