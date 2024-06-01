import * as THREE from 'three'
// import * as personaje from '../personaje/personaje'
import { dron } from '../dron/dron.js'
import { personaje } from '../personaje/personaje.js'
import { mapa } from '../mapa/mapa.js'
import { jeringuilla } from '../jeringuilla/jeringuilla.js';
import { CajaGlobos } from '../caja_globos/CajaGlobos.js';
import { Esfera } from '../esfera/Esfera.js';
import { Meta } from '../meta/Meta.js';




class Juego extends THREE.Object3D {
  constructor() {
    super();
    this.anima=false;

    this.animados = new Array();
    this.picks = new Array();
    this.objetosColisiones = new Array();

    

    var mapam = new mapa();
    this.add(mapam);
    this.persona = new personaje(mapam.getGeometry());
    this.animados.push(this.persona);
    this.add(this.persona);
    this.meta= new Meta(mapam.getGeometry());
    this.add(this.meta);
    this.esfera = new Esfera();
    this.add(this.esfera);

    for(let i=0; i<6; i++){ //creamos drones
      const dronm = new dron(mapam.getGeometry(), Math.random(), Math.random()*180, i.toString());
      this.picks.push(dronm);
      this.animados.push(dronm);
    }

    for(let i=6; i<9; i++){ //creamos drones
      const caja = new CajaGlobos(mapam.getGeometry(), Math.random(), Math.random()*180, i.toString());
      this.picks.push(caja);
    }

    for(let i=0; i<6; i++){  //crear jeringuillas
      const jeringa= new jeringuilla(mapam.getGeometry(), Math.random(), Math.random()*180);
      this.animados.push(jeringa);
      this.objetosColisiones.push(jeringa);
    }


    this.crearCajasColisiones();



    for(let jer of this.objetosColisiones){
      this.add(jer);
    }
    for(let jer of this.picks){
      this.add(jer);
    }

    //Almacenar la luz para cambiar su color despues
    this.ambientLight = null;
    this.pointLight = null;
  }

  setLights(ambientLight, pointLight) {
    this.ambientLight = ambientLight;
    this.pointLight = pointLight;
  }

  crearCajasColisiones() {
    this.cajaPersona = new THREE.Box3();

    this.cajaPersona.setFromObject(this.persona);

    this.cajasColisiones = new Array();
    for(let i=0; i<this.objetosColisiones.length; i++){
      var cajaFigura1 = new THREE.Box3();
      cajaFigura1.setFromObject(this.objetosColisiones[i]);
      this.cajasColisiones.push(cajaFigura1)
    }
  }

  pickeado(n) {
    
    var indice = parseInt(n);
    if (n < this.picks.length && n >= 0) {
      var objeto = this.picks[indice];
      this.persona.efecto(objeto.efecto);
      if(objeto.efecto=="caja globos"){
        this.ambientLight.color.set(0xffffff);
        this.ambientLight.intensity = 0.35;
        this.pointLight.color.set(0xFFFFFF);
        this.pointLight.power = 100;
      }
      this.remove(this.picks[indice]);
    }
    
  }

  revisarColisiones() {
    for (let i=0; i<this.cajasColisiones.length; i++) {
      if(this.cajaPersona.intersectsBox(this.cajasColisiones[i])){
        this.contador += 1;
        var objetoColisionado = this.objetosColisiones[i];
        this.persona.efecto(objetoColisionado.efecto(), this.ambientLight, this.pointLight);
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

          // objetoColisionado.efectoLuces(this.ambientLight, this.pointLight);
        }
      }
    }
    
  }
  parar(){
    this.anima=!this.anima;
  }
  
  update () {
    this.cajaPersona.setFromObject(this.persona);
    if(this.anima)
      for(let m of this.animados){
        m.update();
      }
    this.revisarColisiones();
  }
}

export { Juego }
