const TIEMPO_ENTRE_DISPAROS = 400;//Tiempo de espera entre disparo y disparo, para evitar ráfagas
function Nave(){
	//Propiedades
	this.imagen = new Image();
	this.imagen.src = "./assets/spaceship.png";
	this.anchoSprite = 100;//La imagen tiene 9 frames y 900 px
	this.altoSprite = 111;
	this.frame = 4;
	this.ancho=anchoZonaJuego/12;
	this.alto=this.ancho;
	this.xpos=margenIzquierdo+(anchoZonaJuego-this.ancho)/2;
	this.estado = VIVO;
	this.ultimoDisparo=new Date().getTime();
	this.disparos = [];//Pool de disparos
	this.velocidad = 1;//Velocidad de desplazamiento
	this.frameExplosion=0;//Frame actual de la explosión de la nave
	this.idIntervalo;//Identificador del interval de la explosión


	this.ubicarYPos = function(){
		this.ypos=altoLienzo-this.alto*1.25;
	}
	this.ubicarYPos();
	

	this.dibujar = function(){
		if (this.estado==VIVO) {
			contexto.drawImage(this.imagen,
			this.frame*this.anchoSprite,0,this.anchoSprite,this.altoSprite, 
			this.xpos, 
			this.ypos, 
			this.ancho, 
			this.alto);	
		} else if (this.estado==DESTRUYENDO){
			//Muestra explosion
			contexto.drawImage(
				imagenExplosion,
				195*this.frameExplosion, 0,
				195, 186,
				this.xpos, this.ypos, this.ancho, this.alto
				);
		}
	};

	this.dibujarVidas = function(){
		for (i=0;i<vidas;i++) {
			contexto.drawImage(this.imagen,
				this.frame*this.anchoSprite,0,this.anchoSprite,this.altoSprite, 
				anchoLienzo-(this.ancho/1.5*(i+1)),
				0, 
				this.ancho/1.5, 
				this.alto/1.5);
		}
	}
	
	this.desplazar = function(){
		if (this.estado==VIVO){
			if (teclaActual==39 || gpDerecha || sentido==MUEVE_DERECHA){
				this.xpos+=this.velocidad;
				if(this.xpos>margenIzquierdo+anchoZonaJuego-this.ancho) this.xpos=margenIzquierdo+anchoZonaJuego-this.ancho;
			} else if (teclaActual==37 || gpIzquierda || sentido==MUEVE_IZQUIERDA){
				this.xpos-=this.velocidad;
				if(this.xpos<margenIzquierdo) this.xpos=margenIzquierdo;
			}
		}
	}
	
	this.rotar = function(){
		if (teclaActual==39 || gpDerecha || sentido==MUEVE_DERECHA){
			this.frame++;
			if (this.frame>8) this.frame=8;
		} else if (teclaActual==37 || gpIzquierda || sentido==MUEVE_IZQUIERDA){
			this.frame--;
			if (this.frame<0) this.frame=0;
		} else {
			if (this.frame>4) this.frame--;
			else if(this.frame<4) this.frame++;
		}
	}
	
	this.dispara = function(){
		//Si no está a pantalla completa, se pone a pantalla completa
		if (!document.fullScreen && !document.mozFullScreen && !document.webkitIsFullScreen){
			activaPantallaCompleta();	
		}		
		if (this.estado==VIVO){
			var recienteDisparo = new Date().getTime();
			if (recienteDisparo-this.ultimoDisparo>TIEMPO_ENTRE_DISPAROS){
				var disparoLibre = null;
				var disparoAsignado = false;
				if (estadoJuego==J_ESTADO_JUGANDO){
					for (i=0;i<this.disparos.length;i++){
						if (this.disparos[i].enMovimiento==false) {
							this.disparos[i] = new Disparo();
							disparoAsignado = true;
							this.disparos[i].disparar();
							break;
						}
					}
					if (disparoAsignado == false) {
						this.disparos[this.disparos.length] = new Disparo();
						this.disparos[this.disparos.length-1].disparar();
					}
					this.ultimoDisparo = recienteDisparo;
				} 
			}
		}
	} 

	this.matar = function(_idIntervalo){
		this.estado=DESTRUYENDO;
		digito=3;
		this.idIntervalo = _idIntervalo;
		playSonidoExplosion();
		gestionarDestruccionNave();
	}


	this.incrementarFrameExplosion = function(){
		this.frameExplosion++;
		if (this.frameExplosion>NUM_FRAMES_EXPLOSION) {
			this.frameExplosion=0;
			this.estado=DESTRUIDO;
			clearInterval(this.idIntervalo);
		}
	}	
}