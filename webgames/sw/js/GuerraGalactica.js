const NUMERO_NIVELES=7;//Niveles del juego
const NIVEL_INICIAL=0;//Constante utilizada en debug
const NUMERO_VIDAS=3;
//Estados del juego
const J_ESTADO_JUGANDO = 0;
const J_ESTADO_RESUCITANDO = 1;
const J_ESTADO_PORTADA = 2;
const J_ESTADO_PAUSA = 3;
const J_ESTADO_GAMEOVER = 4;
//Estados de los elementos del juego (enemigos y nave)
const VIVO=0;
const DESTRUYENDO=1;
const DESTRUIDO=2;
const SIN_ESTADO = 3;
//Dimensiones del lienzo
var anchoLienzo;
var anchoZonaJuego = 800;
const MIN_ALTO_LIENZO=600;//Alto mínimo del lienzo
const PORCENTAJE_LIENZO=0.95;//Porcentaje de ocupación del lienzo sobre el total de la ventana
var altoLienzo;
var margenIzquierdo;//Margen izquierdo para ajustar las imágenes
//Variables de dimensiones y dibujo
var contexto;//El contexto
var lienzo;//El lienzo


//Objetos
var planetas = [];
var estrellas = [];
var enemigos = [];
var nave;

//Temporizadores
var dTiempo=0;
var tActual=0;
var tAnterior=0;

//Explosiones
const NUM_FRAMES_EXPLOSION=9;//Número de frames de la explosión
var animacionExplosion;
var imagenExplosion = new Image();
imagenExplosion.src = "./assets/explosion.png"; 

//Estado inicial del juego
var estadoJuego=J_ESTADO_PORTADA;
var puntuacion=0;
var nivel=NIVEL_INICIAL;
var vidas=NUMERO_VIDAS;

/*
 Asigna los tamaños a los elementos,
 Crea los GameObjects	
 */
function inicializarJuego(){
	asignarTamanyos();
	lienzo = document.getElementById("idLienzo");
	contexto = lienzo.getContext("2d");
	crearGameObjects();
}

function iniciarJuego(){
	estadoJuego=J_ESTADO_JUGANDO;
	nave.estado=VIVO;
	nivel=NIVEL_INICIAL;
	vidas=NUMERO_VIDAS;
	puntuacion=0;
	if (!document.fullScreen && !document.mozFullScreen && !document.webkitIsFullScreen){
		activaPantallaCompleta();	
	}
}

function crearGameObjects(){
	//Planetas
	for (i=0;i<3;i++) {
		planetas[i] = new Planeta();
	}
	//Enemigos
	crearEnemigos();

	//Estrellas
	for (i=0;i<300;i++){
		estrellas[i] = new Estrella();
	}
	//Nave
	nave = new Nave();
	//Disparo
	disparo = new Disparo();
}

function asignarTamanyos(){
	var anchoNavegador = window.innerWidth;
	asignarTamanyoLienzo();
	document.getElementById("divContenedor").style.left = parseInt((anchoNavegador-anchoLienzo)/2) + ".px";
}

function asignarTamanyoLienzo(){
	var lienzo = document.getElementById("idLienzo");
	altoLienzo = window.innerHeight;
	altoZonaJuego = window.innerHeight*PORCENTAJE_LIENZO;
	anchoLienzo = screen.width;
	margenIzquierdo = (anchoLienzo - anchoZonaJuego)/2;
	if (margenIzquierdo<0) margenIzquierdo = 0;

	lienzo.setAttribute("width",anchoLienzo);
	lienzo.setAttribute("height",altoLienzo);
}

/*
Se arranca desde Index.html. No se detienen.
*/
function arrancarElementos(){
	//Mover enemigos
	setInterval(function(){
		if (estadoJuego==J_ESTADO_JUGANDO){
			if (tAnterior==0){
				tAnterior = Date.now();
			} else {
				tActual = Date.now();
				dTiempo = tActual - tAnterior;
				for (i=0;i<enemigos.length;i++){
					enemigos[i].desplazar();	
				}
				tAnterior = tActual;
			}
		}
	},5);
	//Mover estrellas
	setInterval(function(){
		for (i=0;i<estrellas.length;i++){
			estrellas[i].cambiarEstado();
		}
	},200);
	//Mover nave
	setInterval(function(){
		if (estadoJuego==J_ESTADO_JUGANDO){
			nave.desplazar();
		}
	},3);
	//Rotar nave
	setInterval(function(){
		nave.rotar();
	},30);
}


//Gameloop	
function gameLoop(){
	//Limpiamos la pantalla
	contexto.clearRect(0, 0, anchoLienzo, altoLienzo);
	//Dibujamos
	dibujar();
	//Evaluamos el gamepad
	evaluarGamepad();
	//Buscamos colisiones
	evaluarColisiones();
	//Llamamos al método de pintado cuando se pueda
	requestAnimationFrame(gameLoop);
}


function dibujar(){
	//Dibujamos las estrellas
	for (i=0;i<estrellas.length;i++){
		estrellas[i].dibujar();
	}

	//Dibujamos los planetas
	for (i=0;i<planetas.length;i++){
		planetas[i].dibujar();	
	}	

	//Dibujamos los enemigos
	if ((estadoJuego==J_ESTADO_JUGANDO) || (estadoJuego==J_ESTADO_PAUSA)){
		for (i=0;i<enemigos.length;i++){
			enemigos[i].dibujar();
		}
	}

	//Dibujamos la nave
	nave.dibujar();	

	//Dibujamos las vidas
	nave.dibujarVidas();

	//Dibujamos la puntuación
	dibujarPuntuacion(puntuacion);

	//Dibujamos el disparo
	for (i=0;i<nave.disparos.length;i++) {
		nave.disparos[i].dibujar();	
	}

	//Dibujamos los controles tactiles
	dibujarControlesTactiles();

	//Dibujamos los textos según estados
	if (estadoJuego==J_ESTADO_PORTADA){
		dibujarTextoPortada();
	} else if (estadoJuego==J_ESTADO_PAUSA){
		dibujarTextoPausa();
	}
	//Dibujar los dígitos de espera 3, 2, 1
	if (nave.estado==DESTRUIDO){
		dibujarDigito();
	}
	//Dibujar GameOver
	dibujarGameOver();
}





function recalcula(){
	asignarTamanyoLienzo();
	nave.ubicarYPos();
}

function gestionarDestruccionNave(){
	//Detener disparos enemigos
	for (i=0;i<enemigos.length;i++){
		enemigos[i].disparando=false;
	}
	//Restar vida
	vidas--;
	if (vidas>=0) {
		setTimeout(function(){
			setDigito(3);
		},500);
		setTimeout(function(){
			setDigito(2);
		},1500);
		setTimeout(function(){
			setDigito(1);
		},2500);
		setTimeout(function(){
			setDigito(0);
			nave.estado=VIVO;
		},3500);
	} else {
		setDigito(0);
		estadoJuego=J_ESTADO_GAMEOVER;
		setTimeout(function(){
			estadoJuego=J_ESTADO_PORTADA;
			nivel=0;
			crearEnemigos();
		},3000);
	}
}


//Pone el juego a pantalla completa
function activaPantallaCompleta(){
	var pantallaCompletaDisponible = (
		document.fullscreenEnabled || 
		document.webkitFullscreenEnabled || 
		document.mozFullScreenEnabled ||
		document.msFullscreenEnabled);
	var li = document.getElementById("elbody");
	if (pantallaCompletaDisponible) {
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		}
	}
}