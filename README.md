# Pulsos a flujo

Llega reporte TCP type CT32.

Esto ocurre cada cierto lapso de duracion indeterminada.
Cada pulso corresponde a 100 litros.
Por cada reporte se debe informar de la cantidad de litros por segundo.
En cada reporte llega un numero mayor al anterior, por lo que hay que tomar la diferencia con el anterior

ENTRADA:
nowPulsos

SALIDA
lt/s (litros por segundo)

lastReporte = null (type timestamp)
lastPulsos = null (type int)

Es primer reporte?
    no:
        delta = (timestamp - lastReporte) * 1000 // tenemos segundos
        pulsos = nowPulsos - lastPulsos
        r = pulsos / delta // tenemos pulsos por segundo
        salida = r * 100 // tenemos litros por segundo
    lastReporte = ts
    lastPulsos = nowPulsos

# Modificar NR-pulsos para mejorar el muestreo de datos

Cada vez que llega un reporte conteniendo pulsos, informar (en el output del nodo) los l/s acumulados desde un instante  en el tiempo immediatamente superior o igual a un intervalo T (unidad en segundos a configurar por formulario del nodo).
Este intervalo T es relativo al instante del reporte arrivado, por ejemplo:

Dado T=60secs
- reporte a las 13:00:00 => encontrar l/s desde 12:58:50 a 13:00:00, si el reporte mas cercano y superior a T fue a las 12:58:50. Seria los l/s en 1min con 10 secs.

Restricción no usar DB.

https://www.pivotaltracker.com/story/show/169339742/comments/208063232