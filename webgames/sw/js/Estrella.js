function Estrella(){
	//Propiedades
	this.xpos=Math.random()*anchoLienzo;
	this.ypos=Math.random()*altoLienzo;
	//Estado 
	this.estado = parseInt(Math.random()*4);

	switch(parseInt(Math.random()*6)) {
	    case 0:
			this.colorEstrella="#111111";
	        break;
	    case 1:
	        this.colorEstrella="#333333";
	        break;
		case 2:
			this.colorEstrella="#555555";
			break;
		case 3:
			this.colorEstrella="#771111";
			break;			
		case 4:
			this.colorEstrella="#111177";
			break;
		case 5:
			this.colorEstrella="#117711";
			break;
		default:
			this.colorEstrella="#777777";

	}

	this.dibujar = function (){
		if (this.estado<2){
			contexto.fillStyle=this.colorEstrella;
			contexto.fillRect(this.xpos,this.ypos,3,4)
		} 
		this.ypos = this.ypos+2;
		if (this.ypos>altoLienzo){
			this.ypos=-2;
		}
	}
	
	this.cambiarEstado = function(){
		this.estado=this.estado+1;
		if (this.estado>4) {
			this.estado=0;
		}
	}
}