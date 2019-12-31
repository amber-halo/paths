import pygame
import numpy as np
import time
import sys

sys.setrecursionlimit(10**6)

screen_width = 600
screen_height = 400

palette_height = screen_height - 50 -5

iniciox = 10
inicioy = 10
#finx = screen_width - 10
#finy = screen_height - 60

#iniciox = 0
#inicioy = 0
finx = 250
finy = 150

width = screen_width
height = palette_height

def text_objects(text, font):
    textSurface = font.render(text, True, (0, 0, 0))
    return textSurface, textSurface.get_rect()

def boton(texto, x, y, w, h, ic, ac, mouse, screen, accion=None):
    click = pygame.mouse.get_pressed()
    if x + w > mouse[0] > x and y + h > mouse[1] > y:
        pygame.draw.rect(screen, ac, (x, y, w, h))

        if click[0] == 1 and accion != None:
            print('boton ', texto, ' presionado')
            accion(screen)
            time.sleep(0.5)
            pass
    else:
        pygame.draw.rect(screen, ic, (x, y, w, h))

    txt = pygame.font.Font("freesansbold.ttf", 20)
    textSurf, textRect = text_objects(texto, txt)
    textRect.center = ( (x + (w / 2)), (y + (h / 2)) )
    screen.blit(textSurf, textRect)
    pass

###### ALGORITMO DE RESOLUCION ########
estuvoAqui = np.empty([width, height], dtype=bool)
#caminoCorrecto

#estuvoAqui = np.empty([6, 6], dtype=bool)

maze = []

def resolver():
    global estuvoAqui
    estuvoAqui.fill(False)
    #print(estuvoAqui)
    print('tamano mazo x', len(maze))
    print('tamano mazo y', len(maze[0]))
    b = solucionRecursiva(iniciox, inicioy)
    print(b)

def solucionRecursiva(x, y):
    if (x == finx and y == finy): # Si se llego al final
        return True

    if (maze[x, y] == 2 or estuvoAqui[x, y]): # Si estas en un lugar bloqueado o ya se estuvo aqui
        return False

    estuvoAqui[x, y] = True

    if (x != 0): # Checa si no se sale del limite izquierdo
        if (solucionRecursiva(x - 1, y)): # Llama al metodo hacia la izquierda
            #correctPath[x, y] = True
            return True

    if (x != width - 1): # Checa si no se sale del limite derecho
        if (solucionRecursiva(x + 1, y)): # Llama al metodo hacia la derecha
            #correctPath[x, y] = True
            return True
        
    if (y != 0): # Checa si no se sale del limite arriba
        if (solucionRecursiva(x, y - 1)): # Llama al metodo hacia arriba
            #correctPath[x, y] = True
            return True

    if (y != height - 1): # Checa si no se sale del limite abajo
        if (solucionRecursiva(x, y + 1)): # Llama al metodo hacia abajo
            #correctPath[x, y] = True
            return True
                       
    return False

#######################################

# ACCIONES PARA BOTONES
def getColorValues(screen):
    matrix = np.empty((screen_width, palette_height))
    for i in range(screen_width):
        for j in range(palette_height):
            if screen.get_at((i, j))[0] == 255: # El pixel es blanco (libre)
                matrix[i, j] = 1
            else:
                matrix[i, j] = 2 # El pixel es negro (bloqueado)
            pass
        pass
    #print(matrix)
    #matrix = np.array ( [ [1, 1, 1, 1, 2, 2],
    #                    [2, 1, 2, 1, 1, 1],
    #                    [2, 1, 2, 2, 1, 2],
    #                    [1, 1, 2, 1, 2, 2],
    #                    [2, 1, 1, 1, 2, 1],
    #                    [2, 1, 2, 1, 1, 1] ])
    return matrix

def iniciar(screen):
    global maze
    maze = getColorValues(screen)
    resolver()

### MAIN

def main():
    pygame.init()

    pygame.display.set_caption("Maze")

    screen = pygame.display.set_mode((screen_width, screen_height))

    screen.fill((255, 255, 255))

    pygame.display.flip()

    running = True
    clock = pygame.time.Clock()

    # main loop
    while running:
        # NODO INICIAL
        pygame.draw.circle(screen, (255, 0, 0), (iniciox, inicioy), 5)

        # NODO FINAL
        pygame.draw.circle(screen, (0, 0, 255), (finx, finy), 5)

        # CONTROL DE MOUSE PARA DIBUJO
        pos = pygame.mouse.get_pos()

        discSize = 15
        r = 0
        g = 0
        b = 0
        discCol = [r, g, b]

        # Verificar que el mouse este en una posicion lejos de los botones para poder dibujar en la pantalla
        if pos[1] < screen_height - 50 - 5:
            pygame.draw.circle(screen, discCol, pos, discSize)

        # BOTONES

        # Boton Iniciar Valores
        btnW = 100
        btnH = 30
        btnIniX = screen_width / 2 - btnW
        btnIniY = screen_height - btnH - 5

        # Boton Reiniciar Valores
        btnReiX = btnIniX + btnW + 20
        btnReiY = btnIniY

        # Boton Iniciar
        boton("Iniciar", btnIniX, btnIniY, btnW, btnH, (0, 200,0), (200, 200, 0), pos, screen, iniciar)

        # Boton Reiniciar
        boton("Reiniciar", btnReiX, btnReiY, btnW, btnH, (0, 200, 0), (200, 200, 0), pos, screen)

        # Actualizar ventana
        pygame.display.flip()
        pygame.display.update()
        clock.tick(50)

        # control de eventos
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
                pass
            pass
        pass

# Iniciar main
if __name__=="__main__":
    main()
