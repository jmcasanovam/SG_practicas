import * as THREE from 'three'
// import * as personaje from '../personaje/personaje'
import { dron } from '../dron/dron.js'
import { personaje } from '../personaje/personaje.js'
import { mapa } from '../mapa/mapa.js'



class Juego extends THREE.Object3D {
  constructor() {
    super();

    var mapam = new mapa();
    var dronm = new dron();

    // dronm.name = "dron";
    // mapam.name = "mapa";
    // this.name = "juego";
    dronm.userData = { name: "dron" };
    this.persona = new personaje(mapam.getGeometry());
    this.persona.name = "persona";

    this.add(dronm);
    this.add(this.persona);
    this.add(mapam);
  } 
  
  update () {
    this.persona.update();
  }
}

export { Juego }
