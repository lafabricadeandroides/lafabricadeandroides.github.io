//Número de enemigos
const NUM_FILAS=6;
const NUM_COLUMNAS=10;
//DIMENSIONES DE LOS ENEMIGOS
const PROPORCION = 20;
const SEPARACION = 1.2;//Separación entre enemigos - proporcion
const MARGEN_SUP = 30;//Margen extra superior entre el bloque de enemigos y el resto, en pixeles
//VELOCIDAD DE DEPLAZAMIENTO
const INCREMENTO_POS_X=1;//Número de píxeles que se mueve el enemigo en el eje x
const INCREMENTO_POS_Y=10;//Número de píxeles que se mueve el enemigo en el eje y

function Enemigo(i,j){
	//Propiedades
	this.incx=INCREMENTO_POS_X;
	this.incy=INCREMENTO_POS_Y;
	this.incDisparo=1+(nivel*Math.random());
	this.imagen = new Image();
	this.disparo = new DisparoEnemigo();
	if (screens[nivel][i][j]!=0){
		this.imagen.src = "./assets/enemigos/" + screens[nivel][i][j] + ".png";
		this.disparo.src = "./assets/laser_rojo.png";
		this.ancho=anchoZonaJuego/PROPORCION;
		this.alto=this.ancho;
		this.xpos=margenIzquierdo+(anchoZonaJuego/PROPORCION*(j+1)*SEPARACION);
		this.ypos=anchoZonaJuego/PROPORCION*i+this.alto+MARGEN_SUP;
		this.estado = VIVO;
		this.disparando = false;
		this.frameExplosion=0;
		this.idIntervalo;
	} else {
		this.estado = SIN_ESTADO;
	}

	this.dibujar = function(){
		if (this.estado==VIVO) {
			contexto.drawImage(this.imagen, this.xpos, this.ypos, this.ancho, this.alto);	
		} else if (this.estado==DESTRUYENDO) {
			//Muestra explosion
			contexto.drawImage(
				imagenExplosion,
				195*this.frameExplosion, 0,
				195, 186,
				this.xpos, this.ypos, this.ancho, this.alto
				);
		}
		//Aunque la nave haya sido destruida el disparo sigue su trayectoria
		if (this.disparando==true){
			this.disparo.dibujar();
		}
	};

	this.disparar = function(){
		if (nave.estado==VIVO && this.estado==VIVO && this.disparando==false) {
			this.disparando=true;
			this.disparo.disparar(this);
		}
	}
	
	this.desplazar = function(){
		this.xpos = this.xpos + this.incx;
		if (this.xpos>(margenIzquierdo+anchoZonaJuego-this.ancho-10)){
			this.xpos=margenIzquierdo+anchoZonaJuego-this.ancho-10;
			this.incx=this.incx*-1;
			//this.ypos = this.ypos + this.incy;
		}
		if (this.xpos<margenIzquierdo){
			this.xpos=margenIzquierdo;
			this.incx=this.incx*-1;
			//this.ypos = this.ypos + this.incy;
		}
		//if (this.ypos>altoLienzo){
		//	this.ypos=0-this.alto;
		//}
		//Desplazar el disparo
		if (this.disparando==true){
			this.disparo.ypos=this.disparo.ypos + this.incDisparo;
			if (this.disparo.ypos>altoLienzo){
				this.disparo.ypos=0;
				this.disparando=false;
			}
		}
			
	}

	this.matar = function(_idIntervalo){
		this.idIntervalo = _idIntervalo;
		this.estado=DESTRUYENDO;
		playSonidoExplosion();
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

function crearEnemigos(){
	for (j=0;j<NUM_FILAS;j++){
		for (i=0;i<NUM_COLUMNAS;i++){
			enemigos[i*NUM_FILAS+j] = new Enemigo(j,i);
		}
	}
}
