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
    this.persona = new personaje(mapam.getGeometry());
    this.meta= new Meta(mapam.getGeometry());
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

    for(let i=0; i<6; i++){  //crear jeringuillas
      var numero=Math.random();
      console.log("Random:"+numero);
      const jeringa= new jeringuilla(mapam.getGeometry(), numero, Math.random()*180);
      this.animados.push(jeringa);
      this.objetosColisiones.push(jeringa);
    }


    this.crearCajasColisiones();


    this.animados.push(this.persona);

    for(let jer of this.objetosColisiones){
      this.add(jer);
    }
    for(let jer of this.picks){
      this.add(jer);
    }

    
    this.add(this.persona);
    this.add(mapam);
    this.add(this.meta);

    this.esfera = new Esfera();
    this.add(this.esfera);

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
