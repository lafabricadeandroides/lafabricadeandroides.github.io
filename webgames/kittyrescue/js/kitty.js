//Estado de los gatos
var KO=-1;
var SUBIENDO=0;
var BAJANDO=1;
var EXPLOTANDO=2;

function Kitty() {
	this.step=0;
	this.estado=BAJANDO;
	this.imageUP = new Image();
	this.imageDOWN = new Image();
	this.x;
	this.y;
	this.imageUP.src="./images/cat_up.png";
	this.imageDOWN.src="./images/cat_down.png";
	this.x=(Math.random()*navW)-50;
	if (this.x<50) {
		this.x=50
	};
	this.y=Math.random()*navH-navH;
	
}
function cambiaEstadoGato(){
	for (i=0;i<gatos.length;i++) {
		gato=gatos[i];
		if (gato.estado==EXPLOTANDO){
			gato.step++;
			if (gato.step==6) {
				gato.step=0;
				gato.estado=KO;
			}
		} 
	}
}
var miauMP3=new Audio("sounds/maullido.mp3");
function maulla(){
	miauMP3.play();
}