import * as THREE from 'three'
// import * as personaje from '../personaje/personaje'
import { dron } from '../dron/dron.js'
import { personaje } from '../personaje/personaje.js'
import { mapa } from '../mapa/mapa.js'



class Juego extends THREE.Object3D {
  constructor() {
    super();

    var mapam = new mapa();
    this.dronm = new dron(mapam.getGeometry());

    // dronm.name = "dron";
    // mapam.name = "mapa";
    // this.name = "juego";
    this.dronm.userData = { name: "dron" };
    
    this.persona = new personaje(mapam.getGeometry());
    this.persona.name = "persona";

    this.add(this.dronm);
    this.add(this.persona);
    this.add(mapam);
  } 
  
  update () {
    this.persona.update();
    this.dronm.update();
  }
}

export { Juego }
