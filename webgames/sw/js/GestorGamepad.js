var gamepads;
var gp;
var gpDerecha=false;
var gpIzquierda=false;

function evaluarGamepad() {
	gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	if (gamepads.length>0 && gamepads[0]!=null) {
		gp = gamepads[0];
		//Dirección
		if (gp.axes[0]==1) {
			gpDerecha=true;
			gpIzquierda=false;
		} else if (gp.axes[0]==-1){
			gpDerecha=false;
			gpIzquierda=true;
		} else {
			gpDerecha = false;
			gpIzquierda = false;
		}
		//Fuego
		if (gp.buttons[0].pressed || gp.buttons[1].pressed || gp.buttons[3].pressed || gp.buttons[3].pressed) {
			//Ha pulsado un botón de disparo
			if (estadoJuego==J_ESTADO_JUGANDO){
				nave.dispara();
			} else if (estadoJuego==J_ESTADO_PORTADA){
				/*
				No hace nada. Por incompatibilidad con requestFullScreen se obliga
				a que pulse espacio para lanzar la pantalla completa.
				*/
			}
		} 
		//Fuego
	}	
	
}
