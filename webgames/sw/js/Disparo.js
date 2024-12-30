function Disparo(){
	this.imagen = new Image();
	this.imagen.src = "./assets/laser.png";
	this.ancho = nave.ancho/5;
	this.alto = this.ancho*2;
	this.xpos;
	this.ypos;
	this.enMovimiento=false;

	this.dibujar = function(){
		contexto.drawImage(this.imagen,
			this.xpos, this.ypos,
			this.ancho, this.alto);
		this.ypos=this.ypos-10;
		if (this.ypos<0) {
			this.detener();
		}
	};

	this.disparar = function(){
		playSonidoLaser();
		this.xpos = nave.xpos + (nave.ancho/2) - (this.ancho/2);
		this.ypos = nave.ypos;
		this.enMovimiento=true;

	}

	this.detener = function(){
		this.xpos=-1000;
		this.ypos=-1000;
		this.enMovimiento=false;
	}
	
}