function evaluarColisiones(){
	var enemigoColisionado=-1;
	var hayEnemigosVivos=false;
	if (estadoJuego==J_ESTADO_JUGANDO){
		for (i=0;i<enemigos.length;i++) {
			if (enemigos[i].estado==VIVO){
				hayEnemigosVivos=true;
				//Evaluamos las colisiones entre los disparos de la nave y los enemigos
				for (j=0;j<nave.disparos.length;j++) {
					if(hayColision(nave.disparos[j],enemigos[i])){
						puntuacion++;
						animacionExplosion = setInterval(function(){
							enemigos[enemigoColisionado].incrementarFrameExplosion();
						},50);
						enemigoColisionado=i;
						enemigos[enemigoColisionado].matar(animacionExplosion);
						nave.disparos[j].detener();
						break;
					}
				}
				//Evaluamos las colisiones entre los disparos enemigos y la nave
				for (j=0;j<enemigos.length;j++){
					if (enemigos[j].disparando==true){
						if (hayColision(enemigos[j].disparo,nave)){
							//Impacto
							enemigos[j].disparando=false;
							animacionExplosion = setInterval(function(){
								nave.incrementarFrameExplosion();
							},50);
							nave.matar(animacionExplosion);
							break;
						}
					}
				}
			}
		} 
	}

	//Si matamos a todos, revivimos a los enemigos caidos ;-)
	if (hayEnemigosVivos==false && estadoJuego==J_ESTADO_JUGANDO) {
		hayEnemigosVivos=true;
		estadoJuego=J_ESTADO_RESUCITANDO;
		nivel++;
		if (nivel>=NUMERO_NIVELES) nivel=0;
		incDisparo=1+(nivel*0.25);//Incrementa un 25% la velocidad de los disparos enemigos nivel 
		setTimeout(function(){
			crearEnemigos();
			for (i=0;i<planetas.length;i++){
				planetas[i].generar();
			}
			estadoJuego=J_ESTADO_JUGANDO;
		},3000);
	}
	if (estadoJuego==J_ESTADO_RESUCITANDO){
		dibujarTextoNivelSuperado();
	}
}

function hayColision(o1, o2){
	var colision = false;
	if (o1.xpos > o2.xpos && 
		o1.xpos < (o2.xpos+o2.ancho) &&
		o1.ypos > o2.ypos &&
		o1.ypos < (o2.ypos+o2.alto)) {
			colision=true;
		}
	return colision;
}