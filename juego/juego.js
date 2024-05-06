import * as THREE from 'three'
// import * as personaje from '../personaje/personaje'
import { dron } from '../dron/dron.js'
import { personaje } from '../personaje/personaje.js'
import { mapa } from '../mapa/mapa.js'



class Juego extends THREE.Object3D {
  constructor() {
    super();

    this.animados = new Array();
    

    var mapam = new mapa();
    this.dronm = new dron(mapam.getGeometry(), 0.5, "dron1");
    this.dron2 = new dron(mapam.getGeometry(), 0.6, "dron2");
    this.animados.push(this.dronm);
    this.animados.push(this.dron2);

    this.persona = new personaje(mapam.getGeometry());
    this.animados.push(this.persona);

    this.add(this.dronm);
    this.add(this.dron2);
    this.add(this.persona);
    this.add(mapam);
  } 
  
  update () {
    for(let m of this.animados){
      m.update();
    }
  }
}

export { Juego }
