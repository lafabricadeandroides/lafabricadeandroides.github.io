var bso = new Audio("./assets/audios/8bit.mp3");
var laser=new Audio("./assets/audios/laser_gun_2.wav");
var poolExplosiones =[];
var iExplosion=0;

bso.play();

for (i=0;i<3;i++){
	poolExplosiones[i]=new Audio("./assets/audios/explosion.wav");
}

function playSonidoLaser(){
	laser.play();
}
function playSonidoExplosion(){
	iExplosion++;
	if (iExplosion>2) iExplosion=0;
	poolExplosiones[iExplosion].play();
}