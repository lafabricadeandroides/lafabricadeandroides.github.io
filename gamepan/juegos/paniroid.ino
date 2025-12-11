/*************
Librerías 5110
**************/
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>
/*
 * IMAGEN DE PORTADA (READY ICON + BATMAN)
 */
static const unsigned char PROGMEM logo[] = {
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC0, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x01, 0xC0, 0x0C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xFF, 0xFC, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x01, 0xFF, 0xFC, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xFF,
  0xFC, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xFF, 0xFC, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x01, 0xFF, 0xFC, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xFF, 0xFC, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xFF, 0xFC, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x01, 0xFF, 0xFC, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xFF, 0xFC, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x01, 0x9C, 0x7C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x9C,
  0x7C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x7E, 0x00, 0x00, 0x00, 0xFF, 0xFF,
  0x00, 0x00, 0x00, 0x9C, 0x7F, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0x00, 0x9C, 0x7F, 0x00,
  0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0x03, 0xE1, 0xFF, 0xC0, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00,
  0x03, 0xE1, 0xFF, 0xC0, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0x03, 0x9E, 0x37, 0xE0, 0x00, 0x00,
  0xFF, 0xFF, 0x40, 0x00, 0x04, 0x00, 0x00, 0xF0, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0x04, 0x00,
  0x00, 0xF0, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0x04, 0x12, 0x08, 0xF0, 0x00, 0x00, 0xFF, 0xFF,
  0x40, 0x00, 0x18, 0x7F, 0x86, 0x3C, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0x18, 0x7F, 0x86, 0x3C,
  0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0x18, 0x8C, 0x06, 0x3C, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00,
  0x1C, 0x80, 0x06, 0x3C, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0x1C, 0x80, 0x06, 0x3C, 0x00, 0x00,
  0xFF, 0xFF, 0x40, 0x00, 0x23, 0xE0, 0x0F, 0x3E, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0xC3, 0xFF,
  0xF8, 0xFE, 0x00, 0x00, 0xFF, 0xFF, 0x40, 0x00, 0xC3, 0xFF, 0xF8, 0xFE, 0x00, 0x00, 0x00, 0x00,
  0x40, 0x00, 0x27, 0xFF, 0xF8, 0x3E, 0x00, 0x00, 0x3F, 0xFF, 0xC0, 0x00, 0x3F, 0x9F, 0xCE, 0xFE,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0F, 0x9F, 0xCE, 0xFE, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x0F, 0x83, 0x87, 0xFE, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0F, 0x8F, 0x8F, 0xFE, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x0F, 0x8F, 0x8F, 0xFE, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0F, 0x8F,
  0x8F, 0xFE, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3F, 0x8F, 0x8F, 0xFE, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x3F, 0x8F, 0x8F, 0xFE, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7F, 0x63, 0x8F, 0xFE,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3C, 0x03, 0xC7, 0xFE, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x3C, 0x03, 0xC7, 0xFE, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x1E, 0x07, 0xFE, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x18, 0xEC, 0x08, 0xFC, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0xEC,
  0x08, 0xFC, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0x0C, 0x70, 0x38, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x03, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x80, 0x00
};
/*
 * MÚSICA INTRO (STAR WARS)
 */
const int c = 261;
const int d = 294;
const int e = 329;
const int f = 349;
const int g = 391;
const int gS = 415;
const int a = 440;
const int aS = 455;
const int b = 466;
const int cH = 523;
const int cSH = 554;
const int dH = 587;
const int dSH = 622;
const int eH = 659;
const int fH = 698;
const int fSH = 740;
const int gH = 784;
const int gSH = 830;
const int aH = 880;

//Inicialización LCD
Adafruit_PCD8544 display = Adafruit_PCD8544(7, 6, 5, 4, 3);
/*
 * INICIALIZACIÓN DE LOS ASTERIODES A1, A2, A3 Y A4
 */
float a1x = 30;
float a1y = 0;
float a2x = 70;
float a2y = 50;
float a3x = 20;
float a3y = 18;
float a4x = 40;
float a4y = 10;
int a1alive = 0;//Indicador de si el asteroide 1 vive o no: 0 vivo; 1 muerto
int a2alive = 0;//Indicador de si el asteroide 2 vive o no: 0 vivo; 1 muerto
int a3alive = 0;//Indicador de si el asteroide 3 vive o no: 0 vivo; 1 muerto
int a4alive = 0;//Indicador de si el asteroide 4 vive o no: 0 vivo; 1 muerto
/*
 * INICIALIZACIÓN DE LA NAVE
 */
int xNave = 10;
int yNave = 20;
byte nave[2][23] = {
  {0, 1, 2, 3, 1, 4, 5, 2, 6, 7, 3, 8, 9, 2, 6, 7, 1, 4, 5, 0, 1, 2, 3},
  {0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6}
};
//Inicialización del pulsador/interruptor
int pinPulsador = 8;//El pin en el que está conectado el pulsador
int pulsador;// Pulsador láser
//Inicialización del joystick
int xJoy = 0;
int yJoy = 0;
int joyPin1 = 0; // slider variable connecetd to analog pin 0
int joyPin2 = 1; // slider variable connecetd to analog pin 1
int opcion = 0; //Opción del menú de sonido
int disparando = 0; //0 - No está disparando; 1 - Hay un disparo en proceso
int xDisparo = 0;
int yDisparo = 0;

int score = 0;//Puntuación
int lasers = 0;//Disparos láser gastados
//Inicialización de variables de sonido
int sound = 1; //0 - sin sonido; 1 - con sonido
//Inicialización música imperio Star Wars

const int buzzerPin = 9; // Digital Pin 8
int musicaReproducida = 0;//0 indica que la música de la intro no ha sido reproducida
//Fin de imperio galáctico


void setup() {

  Serial.begin(9600);
  display.begin();
  //Setup sonido
  pinMode(buzzerPin, OUTPUT); // Digital Pin 8
  //Setup LCD
  display.setContrast(50);
  display.clearDisplay();
  //Setup pulsador
  pinMode (pinPulsador, INPUT); // define the key switch sensor output interface
  muestraIntro();
  menuSonido();
  menuComenzar();
  /*
  * Si ha activado el sonido, suena la marcha imperial
  */
  if (sound == 1) {
    if (musicaReproducida == 0) {
      playMarchaImperial();
      musicaReproducida = 1;
    }
  }

}

void loop() {
  leeJoystick();
  drawNave();
  mueveAsteroides();
  drawAsteorides();
  evaluarDisparo();
  evaluarImpacto();
  drawPuntuacion();
  if (score == 4) {
    muestraGameOver();
  }
  display.display();
  display.clearDisplay();
}
/**
 * Muestra GAME OVER y los créditos
 */
void muestraGameOver() {
  for (int i = 40; i > -65; i--) {
    display.clearDisplay();
    display.setCursor(15, i+10);
    display.print("GAME OVER");
    display.setCursor(13,i+30);
    display.print("PANIROIDES");
    display.setCursor(0,i+38);
    display.print("by F. Paniagua");
    display.setCursor(15,i+50);
    display.print("(C) 2015");
    display.display();
    delay(100);
  }
  score = 0;
  lasers = 0;
  a1alive = 0;
  a2alive = 0;
  a3alive = 0;
  a4alive = 0;
}

/**
 * Lee el joystick analógico
 */
void leeJoystick() {
  //Lectura del joystick
  //Rango Y del joystick 0-48
  //Rango X del joystick 0-84
  xJoy = analogRead(joyPin2);
  delay(50);//Pausa necesaria para no duplicar lecturas
  yJoy = analogRead(joyPin1);
  if (xJoy > 750) {
    xNave--;
  } else if (xJoy < 250) {
    Serial.println (xJoy);
    xNave++;
  }
  if (yJoy > 750) {
    yNave++;
  } else if (yJoy < 250) {
    yNave--;
  }
}

/*
 * Pinta la nave
 */
void drawNave() {
  for (int i = 0; i < 23; i++) {
    display.drawPixel(nave[0][i] + xNave, nave[1][i] + yNave, BLACK);
  }
}
/**
 * Mueve los asteroides
 */
void mueveAsteroides() {
  a1x = a1x + 0.4;
  if (a1x > 85) a1x = -10;
  a1y = a1y + 0.8;
  if (a1y > 50) a1y = -5;

  a2x = a2x - 0.6;
  if (a2x < -12) a2x = 90;
  a2y = a2y + 0.4;
  if (a2y > 50) a2y = -5;

  a3x = a3x + 0.4;
  if (a3x > 85) a3x = -10;
  a3y = a3y - 0.5;
  if (a3y < -10) a3y = 50;

  a4x = a4x - 0.4;
  if (a4x < -12) a4x = 90;
  a4y = a4y - 0.5;
  if (a4y < -10) a4y = 50;
}
/*
 * Pinta los asterioides
 */
void drawAsteorides() {
  //Asterioide 1
  if (a1alive == 0) {
    linea(0 + a1x, 4 + a1y, 7 + a1x, 0 + a1y);
    linea(7 + a1x, 0 + a1y, 9 + a1x, 5 + a1y);
    linea(9 + a1x, 5 + a1y, 2 + a1x, 8 + a1y);
    linea(2 + a1x, 8 + a1y, 0 + a1x, 4 + a1y);
  }
  //Asterioide 2
  if (a2alive == 0) {
    linea(4 + a2x, 0 + a2y, 6 + a2x, 2 + a2y);
    linea(6 + a2x, 2 + a2y, 6 + a2x, 4 + a2y);
    linea(6 + a2x, 4 + a2y, 8 + a2x, 4 + a2y);
    linea(8 + a2x, 4 + a2y, 10 + a2x, 2 + a2y);
    linea(10 + a2x, 2 + a2y, 12 + a2x, 4 + a2y);
    linea(12 + a2x, 4 + a2y, 6 + a2x, 10 + a2y);
    linea(6 + a2x, 10 + a2y, 0 + a2x, 4 + a2y);
    linea(0 + a2x, 4 + a2y, 4 + a2x, 0 + a2y);
  }
  //Asterioide 3
  if (a3alive == 0) {
    linea(0 + a3x, 4 + a3y, 7 + a3x, 0 + a3y);
    linea(7 + a3x, 0 + a3y, 9 + a3x, 5 + a3y);
    linea(9 + a3x, 5 + a3y, 2 + a3x, 8 + a3y);
    linea(2 + a3x, 8 + a3y, 0 + a3x, 4 + a3y);
  }
  //Asterioide 4
  if (a4alive == 0) {
    linea(0 + a4x, 4 + a4y, 7 + a4x, 0 + a4y);
    linea(7 + a4x, 0 + a4y, 9 + a4x, 5 + a4y);
    linea(9 + a4x, 5 + a4y, 2 + a4x, 8 + a4y);
    linea(2 + a4x, 8 + a4y, 0 + a4x, 4 + a4y);
  }

}

/**
 * Evalua si ha disparado el láser
 */
void evaluarDisparo() {
  pulsador = digitalRead (pinPulsador);
  if (pulsador == LOW) {
    lasers = lasers + 1;
    disparando = 1;
    xDisparo = nave[0][12] + xNave;
    yDisparo = nave[1][12] + yNave;
    if (sound == 1) {
      beep(eH, 50);
    }
    delay(50);//Para que no detecte dos disparos por cada pulsación
  }
}
/**
 * Evalua si el láser impacta en un asteoride
 */
void evaluarImpacto() {
  if (disparando == 1) {
    display.drawPixel(xDisparo, yDisparo, BLACK);
    display.drawPixel(xDisparo + 1, yDisparo, BLACK);
    xDisparo++;
    /*
     * Evaluar si el disparo impacta en un asteroide
     */
    if ((a1alive == 0) && (xDisparo > a1x) && (xDisparo < (a1x + 9)) && (yDisparo > a1y) && (yDisparo < (a1y + 9))) {
      disparando = 0;
      score = score + 1;
      a1alive = 1;
      delay(100);
    }
    if ((a2alive == 0) && (xDisparo > a2x) && (xDisparo < (a2x + 12)) && (yDisparo > a2y) && (yDisparo < (a2y + 12))) {
      disparando = 0;
      score = score + 1;
      a2alive = 1;
      delay(100);
    }
    if ((a3alive == 0) && (xDisparo > a3x) && (xDisparo < (a3x + 9)) && (yDisparo > a3y) && (yDisparo < (a3y + 9))) {
      disparando = 0;
      score = score + 1;
      a3alive = 1;
      delay(100);
    }
    if ((a4alive == 0) && (xDisparo > a4x) && (xDisparo < (a4x + 9)) && (yDisparo > a4y) && (yDisparo < (a4y + 9))) {
      disparando = 0;
      score = score + 1;
      a4alive = 1;
      delay(100);
    }
    if (xDisparo == 84) {
      disparando = 0;
    }
  }
}

/**
 * Pinta una línea recta.
 * Parámetros:
 * x0 - Coordeanda x del punto de inicio de la recta
 * y0 - Coordenada y del punto de inicio de la recta
 * x1 - Coordenada x del punto de final de la recta
 * y1 - Coordenada y del punto de final de la recta
 */
void linea(int x0, int y0, int x1, int y1) {
  display.drawLine(x0, y0, x1, y1, BLACK);
}
/**
 * Pinta la puntuación y el número de vidas
 */
void drawPuntuacion() {
  display.setCursor(0, 0);
  display.print("P:");
  display.print(score);
  display.print(" LASERS:");
  display.print(lasers);
}

/**
 * Emite un pitido.
 * Parámetros:
 * note: nota
 * duration: duración en ms
 */
void beep(int note, int duration)
{
  tone(buzzerPin, note, duration);
  delay(duration);
  noTone(buzzerPin);

}

/**
 * Muestra la pantalla de presentación, con el icono del estudio
 */
void muestraIntro() {
  display.clearDisplay();
  display.drawBitmap(1, 1, logo, 80, 48, 1);
  display.display();
  delay(4000);
}

/**
 * Muestra el menú para elegir si se desea o no sonido
 */
void menuSonido() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(BLACK);
  display.println("");
  display.println("->1. Sound ON");
  display.println("");
  display.println("");
  display.println("  2. Sound OFF");
  display.display();
  while (opcion == 0) {
    yJoy = analogRead(joyPin1);
    if (yJoy < 300) {
      //Arriba
      display.clearDisplay();
      display.println("");
      display.println("->1. Sound ON");
      display.println("");
      display.println("");
      display.println("  2. Sound OFF");
      display.display();
      sound = 1;
    } else if (yJoy > 500) {
      //Abajo
      display.clearDisplay();
      display.println("");
      display.println("  1. Sound ON");
      display.println("");
      display.println("");
      display.println("->2. Sound OFF");
      display.display();
      sound = 0;
    }
    //Lee el pulsador
    pulsador = digitalRead (pinPulsador);
    if (pulsador == LOW) {
      opcion = 1;
    }
    delay(50);
  }
}
/**
 * Muestra el menú para indicar si se desea comenzar.
 */
void menuComenzar() {
  delay(300);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(BLACK);
  display.println("");
  display.println("  PANIROIDES");
  display.println("by F. Paniagua");
  display.println("");
  display.println("  PRESS FIRE");
  display.println("   TO START");
  display.display();
  int pulsaFire = 0;
  int comenzar = 0;
  while (comenzar == 0) {
    //Lee el pulsador
    pulsaFire = digitalRead (pinPulsador);
    if (pulsaFire == LOW) {
      comenzar = 1;
    }
    delay(100);
  }
}

/**
 * Suenan los primeros compases de la BSO de Star Wars (Marcha Imperial).
 */
void playMarchaImperial()
{
  beep(a, 500);
  beep(a, 500);
  beep(a, 500);
  beep(f, 350);
  beep(cH, 150);
  beep(a, 500);
  beep(f, 350);
  beep(cH, 150);
  beep(a, 650);

  delay(500);

  beep(eH, 500);
  beep(eH, 500);
  beep(eH, 500);
  beep(fH, 350);
  beep(cH, 150);
  beep(gS, 500);
  beep(f, 350);
  beep(cH, 150);
  beep(a, 650);

  delay(500);
}
