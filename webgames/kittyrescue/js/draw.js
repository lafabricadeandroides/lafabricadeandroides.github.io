var now=Date.now();;
var afterNow;
var f=0;
var fps;
function drawAll(){
	afterNow=Date.now();
	f++;
	if ((afterNow-now)>1000){
		fps=f;
		f=0;
		now=afterNow;
	}
	drawBackground();
	if (estadoJuego==ENPORTADA){
		drawTitle();
		setTimeout(function(){
			requestAnimationFrame(drawAll);
		}, 100);
	} else if (estadoJuego==ENEJECUCION){
		drawPanel();
		drawGatos();
		//requestAnimationFrame(drawAll);
		setTimeout(function(){
			requestAnimationFrame(drawAll);	
		}, 30);
		
	} else if (estadoJuego==ENLEVELCOMPLETED){
		drawPanel();
		drawLevelCompleted();
		setTimeout(function(){
			requestAnimationFrame(drawAll);
		}, 100);

	} else if (estadoJuego==ENGAMEOVER){
		drawPanel();
		drawGameOver();
		setTimeout(function(){
			requestAnimationFrame(drawAll);
		}, 30);
	}

}

function drawBackground(){
	ctx.drawImage(bg,0,0,bg.width,bg.height,0,difH,navW,navW*propHW);
}

function drawTitle(){
	var titleW, titleH;
	var crediW, crediH;
	var comenW, comenH;

	titleW = navW*0.60;
	titleH = titleW*(gameTitle.height/gameTitle.width);
	ctx.drawImage(gameTitle,
		0,0,gameTitle.width,gameTitle.height,
		(navW-titleW)/2,(navH-titleH)/2,titleW,titleH);

	crediW = navW*0.50;
	crediH = crediW*(txtStudioTitle.height/txtStudioTitle.width);
	ctx.drawImage(txtStudioTitle,
		0,0,txtStudioTitle.width,txtStudioTitle.height,
		(navW-crediW)/2,0+txtStudioTitle.height,crediW,crediH);

	comenW = navW*0.40;
	comenH = comenW*(txtComenzar.height/txtComenzar.width);
	ctx.drawImage(txtComenzar,
		0,0,txtComenzar.width,txtComenzar.height,
		(navW-comenW)/2,(navH-comenH)/2+titleH,comenW,comenH);

	f11W = navW*0.20;
	f11H = f11W*(txtF11.height/txtF11.width);
	ctx.drawImage(txtF11,
		0,0,txtF11.width,txtF11.height,
		(navW-f11W)/2,(navH-comenH)/2+titleH*2,f11W,f11H);
 
}

function drawGameOver(){
	var gameOverW, gameOverH;
	var comenW, comenH;

	gameOverW = navW*0.50;
	gameOverH = gameOverW*(txtGameOver.height/txtGameOver.width);
	ctx.drawImage(txtGameOver,
		0,0,txtGameOver.width,txtGameOver.height,
		(navW-gameOverW)/2,(navH-gameOverH)/2,gameOverW,gameOverH);

	comenW = navW*0.40;
	comenH = comenW*(txtRecomenzar.height/txtRecomenzar.width);
	ctx.drawImage(txtRecomenzar,
		0,0,txtRecomenzar.width,txtRecomenzar.height,
		(navW-comenW)/2,(navH-comenH)/2+gameOverH,comenW,comenH);

	creditsW = navW*0.60;
	creditsH = creditsW*(credits.height/credits.width);
	ctx.drawImage(credits,
		0,0,credits.width,credits.height,
		(navW-creditsW)/2,(navH-creditsH/4.5)+yInc,creditsW,creditsH);

	ctx.drawImage(catContinue, navW-catContinue.width-catContinue.height/2, 0+catContinue.height/2);

}

function drawGatos(){
	for (i=0;i<gatos.length;i++) {
		if ((gatos[i].estado==SUBIENDO) || gatos[i].estado==BAJANDO){
			if (gatos[i].estado==SUBIENDO) {
				ctx.drawImage(gatos[i].imageUP,gatos[i].x,gatos[i].y);
			} else {
				ctx.drawImage(gatos[i].imageDOWN,gatos[i].x,gatos[i].y);
			}
		} else if (gatos[i].estado==EXPLOTANDO){
			ctx.drawImage(blood,
				(blood.width/6)*gatos[i].step,0,blood.width/6,blood.height,
				gatos[i].x, gatos[i].y,blood.width/6,blood.height);
		}
	}
}

function drawPanel(){
	ctx.fillText("Level:" + level + " Alive:" + liveCats + " Dead:" + deadCats + " FPS:" + fps,20,30);
	ctx.strokeText("Level:" + level + " Alive:" + liveCats + " Dead:" + deadCats  + " FPS:" + fps,20,30);
}

function drawLevelCompleted(){
	var levelCompletedW, levelCompletedH;
	var comenW, comenH;

	levelCompletedW = navW*0.50;
	levelCompletedH = levelCompletedW*(txtLevelCompleted.height/txtLevelCompleted.width);
	ctx.drawImage(txtLevelCompleted,
		0,0,txtLevelCompleted.width,txtLevelCompleted.height,
		(navW-levelCompletedW)/2,(navH-levelCompletedH)/2,levelCompletedW,levelCompletedH);

	comenW = navW*0.40;
	comenH = comenW*(txtRecomenzar.height/txtRecomenzar.width);
	ctx.drawImage(txtRecomenzar,
		0,0,txtRecomenzar.width,txtRecomenzar.height,
		(navW-comenW)/2,(navH-comenH)/2+levelCompletedH,comenW,comenH);

	ctx.drawImage(catContinue, navW-catContinue.width-catContinue.height/2, 0+catContinue.height/2);

}