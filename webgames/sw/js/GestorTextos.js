//Textos
var txtBatallaGalactica = new Image();
var txtpulsaParaContinuar = new Image();
//var txtPulsaF11 = new Image();
var txtPausa = new Image();
var txtNivelSuperado = new Image();
var txtFernandopaniaguacom = new Image();
var txtGameOver = new Image();
var txtNumeros = [];
var nivelAlpha = 0;

txtBatallaGalactica.src = "./assets/textos/batalla_galactica.png";
txtpulsaParaContinuar.src = "./assets/textos/pulsa_continuar.png";
//txtPulsaF11.src = "./assets/textos/pantalla_completa.png";
txtPausa.src = "./assets/textos/pausa.png";
txtFernandopaniaguacom.src = "./assets/textos/wwwfernandopaniaguacom.png";
txtNivelSuperado.src = "./assets/textos/nivel_superado.png";
txtGameOver.src = "./assets/textos/game_over.png";
for (i=0;i<10;i++){
	txtNumeros[i] = new Image();
	txtNumeros[i].src="./assets/textos/" + i + ".png"; 
}


function dibujarTextoPortada(){
	contexto.drawImage(txtBatallaGalactica,
			margenIzquierdo+(anchoZonaJuego-txtBatallaGalactica.width/1.6)/2,altoLienzo/6*2,
			txtBatallaGalactica.width/1.6,txtBatallaGalactica.height/1.6);
	nivelAlpha+=0.001;
	contexto.globalAlpha=nivelAlpha;
	contexto.drawImage(txtpulsaParaContinuar,
			margenIzquierdo+(anchoZonaJuego-(txtpulsaParaContinuar.width/3))/2,altoLienzo/6*3,
			txtpulsaParaContinuar.width/3,txtpulsaParaContinuar.height/3);
	contexto.drawImage(txtFernandopaniaguacom,
			margenIzquierdo+(anchoZonaJuego-(txtFernandopaniaguacom.width/6))/2,altoLienzo/6,
			txtFernandopaniaguacom.width/6,txtFernandopaniaguacom.height/6);
	/*contexto.drawImage(txtPulsaF11,
			(anchoZonaJuego-(txtPulsaF11.width/6))/2,altoLienzo/6*4.5,
			txtPulsaF11.width/6,txtPulsaF11.height/6);*/
	contexto.globalAlpha=1;
	
}

function dibujarTextoNivelSuperado(){
	contexto.drawImage(txtNivelSuperado,
			margenIzquierdo+(anchoZonaJuego/10),altoLienzo/4,
			anchoZonaJuego/10*8,anchoZonaJuego/10);
}

function dibujarTextoPausa(){
	contexto.drawImage(txtPausa,
			margenIzquierdo+(anchoZonaJuego-txtPausa.width/2)/2,altoLienzo/6*2,
			txtPausa.width/2,txtPausa.height/2);
}

var digito=0;
function setDigito(_digito){
	digito = _digito;
}


function dibujarDigito(){
	if (estadoJuego==J_ESTADO_JUGANDO){
		if (digito>0){
			contexto.drawImage(txtNumeros[digito],
			margenIzquierdo+(anchoZonaJuego-txtNumeros[digito].width/2)/2,(altoLienzo-txtNumeros[digito].height)/2);			
		}
	}
}

function dibujarPuntuacion(_puntuacion){
	const NUM_DIGITOS=6;
	var sPuntuacion = _puntuacion+"";
	var posDigito=0;
	for (i=0;i<NUM_DIGITOS;i++){
		if (i>=(NUM_DIGITOS-(sPuntuacion.length))) {
			contexto.drawImage(txtNumeros[sPuntuacion.charAt(posDigito)],
				i*(anchoZonaJuego/50),0,
				txtNumeros[sPuntuacion.charAt(posDigito)].width*0.5,
				txtNumeros[sPuntuacion.charAt(posDigito)].height*0.5);	
			posDigito++;
		} else {
			contexto.drawImage(txtNumeros[0],
				i*(anchoZonaJuego/50),0,
				txtNumeros[0].width*0.5,
				txtNumeros[0].height*0.5);	
		}
	}
}

function dibujarGameOver(){
	if (estadoJuego==J_ESTADO_GAMEOVER){
		contexto.drawImage(txtGameOver,
			margenIzquierdo+((anchoZonaJuego-txtGameOver.width/2)/2),(altoLienzo-txtGameOver.height)/2,
			txtGameOver.width/2,txtGameOver.height/2);	
	}
}