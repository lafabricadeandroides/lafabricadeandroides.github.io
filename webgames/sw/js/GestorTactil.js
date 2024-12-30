var cIzquierda = new Image();
cIzquierda.src ="./assets/izquierda.png";
var cDerecha = new Image();
cDerecha.src ="./assets/derecha.png";
var cFuego = new Image();
cFuego.src ="./assets/fuego.png";

const QUIETO = 0;
const MUEVE_IZQUIERDA = 1;
const MUEVE_DERECHA = 2;

var sentido = QUIETO;

function pulsaTactil(event){
	//clientX, clientY
	if (event.clientX > 0 && event.clientX < cIzquierda.width) {
		sentido = MUEVE_IZQUIERDA;
	} else if (event.clientX > cIzquierda.width && event.clientX < cIzquierda.width*2) {
		sentido = MUEVE_DERECHA;
	} else {
		sentido = QUIETO;
		nave.dispara();	
	}
}

function dibujarControlesTactiles(){
	contexto.globalAlpha=0.25;
	contexto.drawImage(cIzquierda,0,altoLienzo-cIzquierda.height);
	contexto.drawImage(cDerecha,cIzquierda.width,altoLienzo-cDerecha.height);
	contexto.drawImage(cFuego,anchoLienzo-cFuego.width,altoLienzo-cFuego.height);

	/*contexto.drawImage(txtpulsaParaContinuar,
			(ANCHO_LIENZO-(txtpulsaParaContinuar.width/3))/2,altoLienzo/6*3,
			txtpulsaParaContinuar.width/3,txtpulsaParaContinuar.height/3);*/
	contexto.globalAlpha=1;
	
}