var umbral=0.3;//Sólo los números random mayores que el umbral generan disparo
const ESPERA_ENTRE_DISPAROS=200;//Número de ms entre intentos de disparo

function dispara(){
	if (estadoJuego==J_ESTADO_JUGANDO) {
		var semilla = Math.random();
		if (semilla>umbral) {
			var enemigoDispara = enemigos[parseInt(Math.random()*enemigos.length)];
			while (enemigoDispara.estado!=VIVO){
				enemigoDispara = enemigos[parseInt(Math.random()*enemigos.length)];
			}
			enemigoDispara.disparar();
		}
	} 
}

//Cada 
setInterval(function(){
	dispara();
},ESPERA_ENTRE_DISPAROS);

