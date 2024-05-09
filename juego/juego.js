import * as THREE from 'three'
// import * as personaje from '../personaje/personaje'
import { dron } from '../dron/dron.js'
import { personaje } from '../personaje/personaje.js'
import { mapa } from '../mapa/mapa.js'
import { jeringuilla } from '../jeringuilla/jeringuilla.js';



class Juego extends THREE.Object3D {
  constructor() {
    super();

    this.animados = new Array();
    

    var mapam = new mapa();
    this.persona = new personaje(mapam.getGeometry());
    this.dronm = new dron(mapam.getGeometry(), 0.5, "dron1");
    this.dron2 = new dron(mapam.getGeometry(), 0.6, "dron2");
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

    this.animados.push(this.dronm);
    this.animados.push(this.dron2);

    this.animados.push(this.persona);

    for(let jer of this.objetosColisiones){
      this.add(jer);
    }

    this.add(this.dronm);
    this.add(this.dron2);
    this.add(this.persona);
    this.add(mapam);
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

  revisarColisiones() {
    for (let i=0; i<this.cajasColisiones.length; i++) {
      if(this.cajaPersona.intersectsBox(this.cajasColisiones[i])){
        this.contador += 1;
        this.persona.efecto(this.objetosColisiones[i].efecto())
        this.cajasColisiones.splice(i, 1);
        this.remove(this.objetosColisiones[i]);
        this.objetosColisiones.splice(i, 1);
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
