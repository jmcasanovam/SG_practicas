import * as THREE from 'three'
// import * as personaje from '../personaje/personaje'
import { dron } from '../dron/dron.js'
import { personaje } from '../personaje/personaje.js'
import { mapa } from '../mapa/mapa.js'
import { jeringuilla } from '../jeringuilla/jeringuilla.js';
import { CajaGlobos } from '../caja_globos/CajaGlobos.js';



class Juego extends THREE.Object3D {
  constructor() {
    super();

    this.animados = new Array();
    this.picks = new Array();

    

    var mapam = new mapa();
    this.persona = new personaje(mapam.getGeometry());
    this.dron0 = new dron(mapam.getGeometry(), 0.2, "0");
    this.dron1 = new dron(mapam.getGeometry(), 0.3, "1");
    this.dron2 = new dron(mapam.getGeometry(), 0.4, "2");
    this.dron3 = new dron(mapam.getGeometry(), 0.6, "3");
    this.dron4 = new dron(mapam.getGeometry(), 0.7, "4");
    this.dron5 = new dron(mapam.getGeometry(), 0.8, "5");
    this.cajag1 = new CajaGlobos(mapam.getGeometry(), 0.2, "6");
    this.cajag2 = new CajaGlobos(mapam.getGeometry(), 0.4, "7");
    this.cajag3 = new CajaGlobos(mapam.getGeometry(), 0.6, "8");

    this.picks.push(this.dron0);
    this.picks.push(this.dron1);
    this.picks.push(this.dron2);
    this.picks.push(this.dron3);
    this.picks.push(this.dron4);
    this.picks.push(this.dron5);
    this.picks.push(this.cajag1);
    this.picks.push(this.cajag2);
    this.picks.push(this.cajag3);
    

    
    this.animados.push(this.dron0);
    this.animados.push(this.dron1);
    this.animados.push(this.dron2);
    this.animados.push(this.dron3);
    this.animados.push(this.dron4);
    this.animados.push(this.dron5);

    this.jeringa= new jeringuilla(mapam.getGeometry(), 0.1);
    this.jeringa2 = new jeringuilla(mapam.getGeometry(), 0.2);
    this.jeringa3 = new jeringuilla(mapam.getGeometry(), 0.3);
    this.jeringa4 = new jeringuilla(mapam.getGeometry(), 0.4);
    this.jeringa5 = new jeringuilla(mapam.getGeometry(), 0.5);
    this.jeringa6 = new jeringuilla(mapam.getGeometry(), 0.6);

    this.animados.push(this.jeringa);
    this.animados.push(this.jeringa2);
    this.animados.push(this.jeringa3);
    this.animados.push(this.jeringa4);
    this.animados.push(this.jeringa5);
    this.animados.push(this.jeringa6);
    this.crearCajasColisiones();

    this.objetosColisiones = new Array();
    this.objetosColisiones.push(this.jeringa);
    this.objetosColisiones.push(this.jeringa2);
    this.objetosColisiones.push(this.jeringa3);
    this.objetosColisiones.push(this.jeringa4);
    this.objetosColisiones.push(this.jeringa5);
    this.objetosColisiones.push(this.jeringa6);

    this.animados.push(this.persona);

    for(let jer of this.objetosColisiones){
      this.add(jer);
    }
    for(let jer of this.picks){
      this.add(jer);
    }

    
    this.add(this.persona);
    this.add(mapam);

    //Almacenar la luz para cambiar su color despues
    this.ambientLight = null;
    this.pointLight = null;
  }

  setLights(ambientLight, pointLight) {
    this.ambientLight = ambientLight;
    this.pointLight = pointLight;
  }

  crearCajasColisiones() {
    var cajaFigura1 = new THREE.Box3();
    var cajaFigura2 = new THREE.Box3();
    var cajaFigura3 = new THREE.Box3();
    var cajaFigura4 = new THREE.Box3();
    var cajaFigura5 = new THREE.Box3();
    var cajaFigura6 = new THREE.Box3();
    this.cajaPersona = new THREE.Box3();

    this.cajaPersona.setFromObject(this.persona);

    
    cajaFigura1.setFromObject(this.jeringa);
    cajaFigura2.setFromObject(this.jeringa2);
    cajaFigura3.setFromObject(this.jeringa3);
    cajaFigura4.setFromObject(this.jeringa4);
    cajaFigura5.setFromObject(this.jeringa5);
    cajaFigura6.setFromObject(this.jeringa6);

    this.cajasColisiones = new Array();
    this.cajasColisiones.push(cajaFigura1);
    this.cajasColisiones.push(cajaFigura2);
    this.cajasColisiones.push(cajaFigura3); 
    this.cajasColisiones.push(cajaFigura4);
    this.cajasColisiones.push(cajaFigura5);
    this.cajasColisiones.push(cajaFigura6);

  }

  pickeado(n) {
    
    var indice = parseInt(n);
    if (n < this.picks.length && n >= 0) {
      var objeto = this.picks[indice];
      this.persona.efecto(objeto.efecto);
      this.remove(this.picks[indice]);
    }
    
  }

  revisarColisiones() {
    for (let i=0; i<this.cajasColisiones.length; i++) {
      if(this.cajaPersona.intersectsBox(this.cajasColisiones[i])){
        this.contador += 1;
        var objetoColisionado = this.objetosColisiones[i];
        this.persona.efecto(objetoColisionado.efecto());
        this.cajasColisiones.splice(i, 1);
        this.remove(this.objetosColisiones[i]);
        this.objetosColisiones.splice(i, 1);

        if (this.ambientLight && this.pointLight) {
          // var red = Math.random() % 255;
          // const newColor = new THREE.Color(red, (red+50)%255, (red+100)%255);
          // this.light.color.set(newColor);
          // this.light = this.objetosColisiones[i].efectoLuces();

          
          // this.ambientLight.color.set(objetoColisionado.efectoLuces());
          // this.ambientLight.intensity = 0.1;
          // this.pointLight.color.set(0xFFFFFF);
          // this.pointLight.intensity = 1;

          objetoColisionado.efectoLuces(this.ambientLight, this.pointLight);
        }
      }
    }
    
  }
  
  update () {
    this.cajaPersona.setFromObject(this.persona);
    for(let m of this.animados){
      m.update();
    }
    this.revisarColisiones();
  }
}

export { Juego }
