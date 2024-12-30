function Planeta(){
	this.imagen = new Image();
	//Asignación de métodos
	this.dibujar = function(){
		contexto.globalAlpha=1;
		contexto.drawImage(this.imagen, this.xpos, this.ypos, this.ancho, this.alto);
		//this.ypos = this.ypos + this.velocidad;
		if (this.ypos>altoLienzo){
			this.ypos=0-this.alto;
		}
	}

	this.generar = function(){
		this.xpos=Math.random()*anchoLienzo;
		this.ypos=Math.random()*altoLienzo*0.25;
		this.ancho=anchoZonaJuego/(Math.random()*20);
		this.alto=this.ancho;
		this.imagen.src = "./assets/planetas/planet_" + parseInt(Math.random()*15+34) + ".png";
	}

	this.generar();
}