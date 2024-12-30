function DisparoEnemigo(){
	this.imagen = new Image();
	this.imagen.src = "./assets/laser_rojo.png";
	this.xpos=0;
	this.ypos=0;

	this.dibujar = function(){
		contexto.drawImage(this.imagen,
			this.xpos, this.ypos,
			this.ancho, this.alto);
	};

	this.disparar = function(_enemigo){
		this.ancho = this.imagen.width;
		this.alto = this.imagen.height;
		this.xpos=_enemigo.xpos+_enemigo.ancho/2-_enemigo.ancho/2;
		this.ypos=_enemigo.ypos+_enemigo.alto;
	}
	
}