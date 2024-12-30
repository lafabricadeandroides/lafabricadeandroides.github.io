//Bitmaps
var bg = new Image();//Imagen de fondo
var gameTitle = new Image();//Imagen del titulo
var txtStudioTitle = new Image();//Texto título del estudio
var txtComenzar = new Image();//Texto comenzar
var txtRecomenzar = new Image();//Texto recomenzar
var txtGameOver = new Image();//Texto gameover
var txtLevelCompleted = new Image();//Texto level completed
var txtF11 = new Image();//Texto del f11 for fullscreen
//var txtVerCreditos = new Image();//Texto Game Credits para ver los créditos
var credits = new Image();//Texto con los créditos completos
var catContinue = new Image();//Gato de continuar
var blood=new Image();//Sangre gatuna

//Gatos
var gatos=new Array();

//Estado del juego
var ENPORTADA=0;
var ENPAUSA=1;
var ENEJECUCION=2;
var ENGAMEOVER=3;
var ENLEVELCOMPLETED=4;

var level=1;

//CONSTANTES
var CAT_SPEED = 10;//Velocidad del gato
//VARIABLES
var estadoJuego=ENPORTADA;
var navW;//Ancho del navegador 
var navH;//Alto del navegador
var propHW;//Proporción entre el alto y el ancho del navegador para escalar el fondo
var difH;//Diferencia entre el alto del navegador y el alto del fondo después de escalarlo
var liveCats=0;
var deadCats=0;
var yInc=0;//Incremento de la coordeanda y para mostrar los créditos 
var elIntervalDeCreditos;//Para detener el interval después

function initGame(){
	//Load resources
	gameTitle.src="./images/gametitle.png";
	txtStudioTitle.src="./images/texto_studio_title.png";
	txtComenzar.src="./images/texto_comenzar.png";
	txtRecomenzar.src="./images/texto_recomenzar.png";
	txtGameOver.src="./images/texto_gameover.png";
	txtLevelCompleted.src="./images/texto_levelcompleted.png";
	//txtVerCreditos.src="./images/texto_vercreditos.png";
	txtF11.src="./images/texto_f11tofullscreen.png";
	credits.src="./images/credits.png";
	blood.src="./images/blood.png";
	catContinue.src="./images/cat_continue.png";
	bg.src="./images/bg.png";
	bg.onload = function(){
		getScreenValues();
		gatos[0]=new Kitty();
		liveCats++;
		//Get context
		ctx = document.getElementById('gamezone').getContext('2d');
		//Init text style
		ctx.font = "normal 30px Splurge";
		ctx.fillStyle="orange";
		ctx.lineWidth = 2;
	    ctx.strokeStyle = 'black';
		//Dibuja la portada
		drawAll();
	};
	
}



function manageEvent(x, y){
	if (estadoJuego==ENPORTADA) {
		estadoJuego=ENEJECUCION;
		//Arranca el juego
		drawAll();
		//Arranca los hilos
		setInterval(moveKitty, CAT_SPEED);
		setInterval(cambiaEstadoGato,150);//Hilo de la animación sangrienta
	} else if (estadoJuego==ENEJECUCION){
		for (i=0;i<gatos.length;i++){
			gato=gatos[i];
			if ((x > gato.x) && (x < gato.x+gato.imageDOWN.width) && (y > gato.y) && (y < gato.y+gato.imageDOWN.height)){
				if (gato.estado==BAJANDO){
						if (liveCats==level){
							estadoJuego=ENLEVELCOMPLETED;
							gatos=new Array();
							break;
						}
						gato.estado=SUBIENDO;
						gatos[gatos.length]=new Kitty();
						liveCats++;
				} else if (gato.estado==SUBIENDO){
						maulla();
						gato.estado=EXPLOTANDO;
						liveCats--;
						deadCats++;
						if (liveCats==0) {
							estadoJuego=ENGAMEOVER;
						}
				}
				break;
			}
		}
	} else if ((estadoJuego==ENGAMEOVER) || (estadoJuego==ENLEVELCOMPLETED)){
		if ((x>(navW-catContinue.width-catContinue.height/2)) && 
			(x<(navW-catContinue.width-catContinue.height/2+catContinue.width)) &&
			(y>0+catContinue.height/2) &&
			(y<0+catContinue.height/2+catContinue.height)) {
			gatos = new Array();
			gatos[0]=new Kitty();
			liveCats=1;
			if (estadoJuego==ENGAMEOVER){
				clearInterval(elIntervalDeCreditos);
				yInc=0;
				level=1;
				deadCats=0;
			} else if (estadoJuego==ENLEVELCOMPLETED){
				level++;
			}
			estadoJuego=ENEJECUCION;
		} else if ((estadoJuego==ENGAMEOVER) 
			&& 
			(x>((navW-creditsW)/2)) && (x<((navW-creditsW)/2)+creditsW)
			&&
			(y>(navH-creditsH/4.5)) && (y<(navH-creditsH/4.5+creditsH))) { 
				elIntervalDeCreditos = setInterval(function(){
					yInc--;
					if (yInc<((navH+creditsH)*-1)){
						yInc=100;
					}
				},20);			
		}
	}
}

function getScreenValues(){
	//Get nav. dimension
	navW=window.innerWidth;
	navH=window.innerHeight;
	//Resize canvas
	$("#gamezone").attr("width",navW);
	$("#gamezone").attr("height",navH);
	//Get HW prop.
	propHW = bg.height/bg.width;
	//Get dif
	difH = navH - navW*propHW;
}

function moveKitty(){
	for (i=0;i<gatos.length;i++){
		gato=gatos[i];
		if (gato.estado==SUBIENDO) {
			gato.y=gato.y-1;
			if (gato.y<0-(gato.imageUP.height*1.1)) {
				gato.estado=BAJANDO;
			}
		} else if (gato.estado==BAJANDO){
			gato.y=gato.y+2;
			if (gato.y>navH-gato.imageDOWN.height){
				maulla();
				gato.estado=EXPLOTANDO;
				liveCats--;
				deadCats++;
				if (liveCats==0) {
					estadoJuego=ENGAMEOVER;
				}
			}
		} 
	}
}

