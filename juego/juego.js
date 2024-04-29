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

    this.persona = new personaje(mapam.getGeometry());

    this.add(dronm);
    this.add(this.persona);
    this.add(mapam);
  } 
  
  update () {
    this.persona.update();
  }
}

export { Juego }
