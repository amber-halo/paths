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

#matriz = costos

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

'''
1. Marcar el nodo inicial elegido con una distancia actual de 0 y el resto con infinito.
2. Establecer el nodo no visitado con la menor distancia actual como el nodo actual A.
3. Para cada vecino V del nodo actual A: suma la distancia actual de A con el peso de la arista que conecta a A con V. Si el resultado es menor que la distancia actual   de V, establecerlo como la nueva distancia actual de V.
4. Marca el nodo actual A como visitado.
5. Si hay nodos no visitados, ir al paso 2.

'''

# 1

#matriz[i, j] = 0
nodosVisitados = []
distancia  = 0
i = 0

while (True):
    print('i = ', i)
    v = math.inf
    nodoN = 0
    distanciaV = 0
    for j in range(cNodos):
        if (costos[i, j] != math.inf and j not in nodosVisitados):
            #print('valor en i,j = ', costos[i, j])
            suma = distancia + costos[i, j]
            print('suma --- distancia: ', distancia, ', costo: ', costos[i,j])
            if (suma < v):
                v = suma
                nodoN = j
                distanciaV = costos[i,j]
                pass
            pass
        pass

    nodosVisitados.append(i)
    i = nodoN
    distancia += distanciaV
    print('nuevo nodo = ', i)
    print('distancia actual = ', distancia)
    print('nodos visitados = ', nodosVisitados)

    print('-----------------------')

    if (len(nodosVisitados) == cNodos):
        break
    #else:
        #print('nodos visitados: ', len(nodosVisitados))
    pass
