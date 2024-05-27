import * as THREE from 'three'

class personaje extends THREE.Object3D {
  constructor(geometria) {
    super();
    this.variablesEfectos();
    this.tubo=geometria;
    this.path=geometria.parameters.path;
    this.radio=geometria.parameters.radius;
    this.segmentos=geometria.parameters.tubularSegments;
    this.t=0;
    this.r=0;

    var persona = this.createPersonaje();
    persona.position.y+=this.radio+0.21;

    var superficie = new THREE.Object3D();
    superficie.add(persona);

    superficie.rotation.z=this.r;
    var movlateral = new THREE.Object3D();
    movlateral.add(superficie);

    this.nodofinal = new THREE.Object3D();
    this.nodofinal.add(movlateral);
  

    var posTmp=this.path.getPointAt(this.t);


    this.nodofinal.position.copy (posTmp);

    var tangente= this.path.getTangentAt(this.t);
    posTmp.add(tangente);
    var segmentoActual=Math.floor(this.t * this.segmentos);
    this.nodofinal.up=this.tubo.binormals[segmentoActual];
    this.nodofinal.lookAt(posTmp);

    this.add(this.nodofinal);
  }

  
  getThirdPersonCamera(){
    return this.camara;
  }


  createPersonaje() {
    var personaje = new THREE.Object3D();

    this.brazo1 = this.createBrazo();
    this.brazo1.position.x = -0.06;
    this.brazo1.position.y = 0.065;
    this.brazo1.rotation.z = -(Math.PI * 30 / 360);

    this.brazo2 = this.createBrazo();
    this.brazo2.position.x = 0.06;
    this.brazo2.position.y = 0.065;
    this.brazo2.rotation.z = (Math.PI * 30 / 360);

    var tronco = this.createTronco();

    personaje.add(this.brazo1);
    personaje.add(this.brazo2);
    personaje.add(tronco)

    this.piernaIzquierda = new THREE.Object3D();
    this.piernaDerecha = new THREE.Object3D();

    var piernaIzqSup = this.createPiernaSup();
    piernaIzqSup.position.set(0.025+0.01, -(0.15-0.04), 0);
    this.piernaIzquierda.add(piernaIzqSup);

    var piernaDerSup = this.createPiernaSup();
    piernaDerSup.position.set(-(0.025 + 0.01), -(0.15 - 0.04), 0);
    this.piernaDerecha.add(piernaDerSup);

    this.piernaIzqInf = this.createPiernaInf();
    this.piernaIzqInf.position.set(0.025 + 0.01, -(0.15 - 0.04) - 0.04, 0);
    this.piernaIzquierda.add(this.piernaIzqInf);

    this.piernaDerInf = this.createPiernaInf();
    this.piernaDerInf.position.set(-(0.025 + 0.01), -(0.15 - 0.04) - 0.04, 0);
    this.piernaDerecha.add(this.piernaDerInf);

    personaje.add(this.piernaIzquierda);
    personaje.add(this.piernaDerecha);

    this.cabezon = new THREE.Object3D();

    this.cabeza = this.cretateCabeza();
    this.cabezon.add(this.cabeza);
    this.cabezon.position.y = 0.07;


    // this.cabezon.add(this.cabeza);

     personaje.add(this.cabezon);

    // personaje.add(this.cabeza);
    

    this.camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 20);
    personaje.add(this.camara);

    this.camara.position.set(0, 0.5, -1.3);
    this.camara.lookAt(0,0.1,0);

    this.animacion();


    return personaje;
  }

  cretateCabeza(){
    
    var shape = new THREE.Shape();
    shape.moveTo(0.001, 0);
    shape.quadraticCurveTo(0.04, 0, 0.04, 0.04);
    shape.lineTo(0.043, 0.055);
    shape.lineTo(0.043, 0.07);
    shape.lineTo(0.001, 0.07);
    shape.lineTo(0.001, 0);
    

    var points = shape.extractPoints().shape;
    const geometry = new THREE.LatheGeometry(points);
    const material = new THREE.MeshStandardMaterial({ color: 0xeccd6a });
    const cabeza = new THREE.Mesh(geometry, material);

    var cabezaconsombrero = new THREE.Object3D();
    cabezaconsombrero.add(cabeza);

    var sombrero = this.createSombrero();
    sombrero.position.y = 0.07;
    cabezaconsombrero.add(sombrero);

    cabezaconsombrero.position.y+=0.03

    var cabezaconsombreroconcuello = new THREE.Object3D();

    var cuello = this.createCuello();
    cuello.position.y += 0.03/2;

    cabezaconsombreroconcuello.add(cabezaconsombrero);
    cabezaconsombreroconcuello.add(cuello);
    // cabeza.add(cuello);

    return cabezaconsombreroconcuello;
  }

  createCuello() {
    const geometry = new THREE.CylinderGeometry(0.015, 0.015, 0.03, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const cuello = new THREE.Mesh(geometry, material);

    return cuello;
  }

  createSombrero() {
    const ancho = 0.07;
    const alto = 0.04;
    var shape = new THREE.Shape();
    shape.moveTo(0.001, 0);
    shape.lineTo(ancho, 0);
    shape.lineTo(ancho + 0.001, 0.01);
    shape.lineTo(ancho / 2, 0.02);
    shape.quadraticCurveTo(ancho / 2, alto, 0.001, alto);
    shape.lineTo(0.001, 0);

    var points = shape.extractPoints().shape;
    const geometry = new THREE.LatheGeometry(points);
    const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const sombrero = new THREE.Mesh(geometry, material);

    return sombrero;
  }

  createBrazo(){
    const geometryb1 = new THREE.CylinderGeometry( 0.015, 0.015, 0.09, 32 ); 
    const geometryb2 = new THREE.CylinderGeometry( 0.015, 0.015, 0.06, 32 );
    const geometryr = new THREE.SphereGeometry( 0.02, 32, 16 ); 
    const material2 = new THREE.MeshStandardMaterial( { color:  0x434b4d} ); 
    const material = new THREE.MeshStandardMaterial( {color: 0x8a9597, roughness:0.5,  metalness:1} );
    const material3 = new THREE.MeshStandardMaterial( {color: 0xeccd6a} );

    
    const b2 = new THREE.Mesh( geometryb2, material3 ); 
    b2.position.y=-(0.06/2);
    const sphere2 = new THREE.Mesh( geometryr, material2 );

    var brazobajo=new THREE.Object3D();
    brazobajo.add(b2);
    brazobajo.add(sphere2);
    brazobajo.position.y=-0.09;
    brazobajo.rotation.x=-90/180*Math.PI


    const b1 = new THREE.Mesh( geometryb1, material ); 
    const sphere = new THREE.Mesh( geometryr, material2 );
    b1.position.y=-(0.09/2);

    var brazoalto=new THREE.Object3D();
    brazoalto.add(b1);
    brazoalto.add(sphere);
    
    var brazo=new THREE.Object3D();
    brazo.add(brazobajo);
    brazo.add(brazoalto);

    return brazo;
  }

  createPiernaSup(){
    

    var shape=new THREE.Shape();
    shape.moveTo(0.00001, -0.04);
    shape.lineTo(0.01, -0.04);
    shape.quadraticCurveTo(0.025, -0.025, 0.025, 0);
    shape.lineTo(0.0255, 0.02);
    // shape.lineTo(0.0255, 0.04);
    shape.lineTo(0.00001, 0.04);
    shape.lineTo(0.00001, -0.04);

    var points = shape.extractPoints().shape;
    const geometry=new THREE.LatheGeometry(points);
    const material = new THREE.MeshStandardMaterial({ color: 0x332f2c }); 

    const mesh = new THREE.Mesh( geometry, material ) ;
    return mesh;

  }

  createPiernaInf() {
    const geometryr = new THREE.SphereGeometry(0.02, 32, 16); 
    const material = new THREE.MeshStandardMaterial({ color: 0x332f2c });
    const material2 = new THREE.MeshStandardMaterial({ color: 0x78451a });

    var rodilla = new THREE.Mesh(geometryr, material);
    // rodilla.position.y = -(0.3);

    const geometry_pierna = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 32);
    
    var espinilla = new THREE.Mesh(geometry_pierna, material2);
    espinilla.position.y = -(0.03);

    var pierna = new THREE.Object3D();
    pierna.add(rodilla);
    pierna.add(espinilla);

    var pie = new THREE.Mesh(geometryr, material);
    pie.position.y = -(0.06);

    pierna.add(pie);




    return pierna;
  }

  createTronco() {
    const geometrytr = new THREE.CylinderGeometry(0.04, 0.07, 0.15, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x8a9597, roughness:0.5,  metalness:1 }); 
    var tronco = new THREE.Mesh(geometrytr, material);

    return tronco;
  }

  moveLeft() {
    this.rotarI = true;
    // this.r+=0.1;
  }

  moveRight() {
    this.rotarD = true;
    // this.r -= 0.1;
  }

  stopMovingLeft() {
    this.rotarI = false;
  }

  stopMovingRight() {
    this.rotarD = false;
  }

  variablesEfectos(){
    this.movimientopierna = true;
    this.rotacionpierna=0;
    this.rotacionrodilla=0;
    this.rotacioncabeza=0;
    this.avance=0.0005;
    this.contadorlento=0;
    this.empiezalento = false;
    this.puntuacion=0;
    this.vueltas=0;
  }

  efecto(n){
    console.log("efecto:"+n);
    switch(n){
      case "jeringuilla":
        this.lento=true;
        this.empiezalento = false;
        break;
      case "dron":
        this.puntuacion+=100;
      default:
        break;
    }
  }

  animacion(){
    if(this.movimientopierna && this.contadorlento>0) this.rotacionpierna+=1;
    else if(!this.movimientopierna && this.contadorlento>0)this.rotacionpierna-=1;
    else if(this.movimientopierna) this.rotacionpierna+=2;
    else this.rotacionpierna-=2;


    if(this.rotacionpierna>30) this.movimientopierna=false;
    else if(this.rotacionpierna<-30) this.movimientopierna=true;

    if(this.contadorlento>0){
      if(this.rotacionpierna==0) this.rotacionrodilla=0;
      else if(this.movimientopierna && this.rotacionpierna>0) this.rotacionrodilla+=2;
      else if(!this.movimientopierna && this.rotacionpierna>0) this.rotacionrodilla-=2;
      else if(this.movimientopierna && this.rotacionpierna<0) this.rotacionrodilla-=2;
      else if(!this.movimientopierna && this.rotacionpierna<0) this.rotacionrodilla+=2;
    }
    else{
      if(this.rotacionpierna==0) this.rotacionrodilla=0;
      else if(this.movimientopierna && this.rotacionpierna>0) this.rotacionrodilla+=4;
      else if(!this.movimientopierna && this.rotacionpierna>0) this.rotacionrodilla-=4;
      else if(this.movimientopierna && this.rotacionpierna<0) this.rotacionrodilla-=4;
      else if(!this.movimientopierna && this.rotacionpierna<0) this.rotacionrodilla+=4;
    }
    


    this.piernaIzquierda.rotation.x=this.rotacionpierna/180*Math.PI;
    this.piernaDerecha.rotation.x=this.rotacionpierna/180*Math.PI*-1;

    this.brazo1.rotation.x=this.rotacionpierna/180*Math.PI;
    this.brazo2.rotation.x=this.rotacionpierna/180*Math.PI*-1;

    this.piernaIzqInf.rotation.x=this.rotacionrodilla/180*Math.PI;
    this.piernaDerInf.rotation.x=this.rotacionrodilla/180*Math.PI;

    this.rotacioncabeza=this.rotacionpierna*0.2;

    this.cabeza.rotation.z=this.rotacioncabeza/180*Math.PI;


  }
  
  update () {
    this.animacion();
    console.log("Puntuacion: "+this.puntuacion);
    // console.log("Vueltas: "+this.vueltas);
    if(this.lento && !this.empiezalento){
      this.contadorlento=200;
      this.empiezalento=true;
    }

    if (this.lento && this.contadorlento!=0) {
      this.avance =0.00015;
      this.contadorlento= this.contadorlento-1;
    }
    else {
      this.avance=0.0006;
      this.lento = false;
      this.empiezalento=false;

    }
    
    if (this.vueltas == 3) {
      this.avance = 0;
    }

    this.t=(this.t+this.avance);
    if (this.t >= 1) {
      this.vueltas++;
      this.t = this.t % 1;
    }

    var posTmp=this.path.getPointAt(this.t);

    this.nodofinal.position.copy (posTmp);

    var tangente= this.path.getTangentAt(this.t);
    posTmp.add(tangente);
    var segmentoActual=Math.floor(this.t * this.segmentos);
    this.nodofinal.up=this.tubo.binormals[segmentoActual];
    this.nodofinal.lookAt(posTmp);

    if (this.rotarD) {
      this.r += 0.1;
    }else if (this.rotarI) {
      this.r -= 0.1;
    }
    this.nodofinal.rotation.z = this.r;
  }
}

export { personaje }
