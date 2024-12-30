var teclaActual = 0;//0 indica que no hay tecla pulsada
function pulsaTecla(event){
	var tecla = event.keyCode || event.which; 
	switch (tecla) {
		case 39:
			//Derecha
			teclaActual=tecla;
			break;
		case 37:
			//Izquierda
			teclaActual=tecla;
			break;
		case 32:
			//Espacio
			if (estadoJuego==J_ESTADO_JUGANDO){
				nave.dispara();
			} else if (estadoJuego==J_ESTADO_PORTADA){
				iniciarJuego();
			}
			break;
		case 80:
			//Pausa
			if (estadoJuego==J_ESTADO_JUGANDO) {
				estadoJuego = J_ESTADO_PAUSA;
			} else if (estadoJuego==J_ESTADO_PAUSA) {
				estadoJuego = J_ESTADO_JUGANDO;
			}
			break;
	}
}
function sueltaTecla(event){
	var tecla = event.keyCode || event.which; 
	switch (tecla) {
		case 39:
			//Derecha
			if (teclaActual==39) {
				teclaActual=0;
			}
			break;
		case 37:
			//Izquierda
			if (teclaActual==37) {
				teclaActual=0;
			}
			break;
	}
}

function pulsaTactil(event){
	nave.dispara();
}