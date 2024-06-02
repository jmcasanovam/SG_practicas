import * as THREE from 'three'

class personaje extends THREE.Object3D {
  constructor() {
    super();
    this.variablesEfectos();
    

    var persona = this.createPersonaje();
    persona.position.y+=0.21;

    var superficie = new THREE.Object3D();
    superficie.add(persona);

    var movlateral = new THREE.Object3D();
    movlateral.add(superficie);

    this.nodofinal = new THREE.Object3D();
    this.nodofinal.add(movlateral);

    this.add(this.nodofinal);
  }

  
  getThirdPersonCamera(){
    return this.camara;
  }

  crearMateriales(){
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('../../imgs/armadura.jpg');
    var normalMap = textureLoader.load('../../imgs/armadura_normal.png');

    this.materialarmadura = new THREE.MeshStandardMaterial({ 
      map: texture,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(1, 1) // Ajusta este valor para cambiar la intensidad del relieve
    });

    this.materialArticulacion = new THREE.MeshStandardMaterial({ color: 0x434b4d });
    this.materialPierna = new THREE.MeshStandardMaterial({ color: 0x78451a });
    this.materialpiel = new THREE.MeshStandardMaterial( {color: 0xeccd6a} );
    this.materialsombrero = new THREE.MeshStandardMaterial({ color: 0x000000 });
    this.materialpelo = new THREE.MeshStandardMaterial({ color: 0xffffff });

    this.materialojos = new THREE.MeshStandardMaterial({ color: 0x006400 });


  }


  createPersonaje() {
    this.crearMateriales();
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

    personaje.add(this.cabezon);


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
    const cabeza = new THREE.Mesh(geometry, this.materialpiel);

    var cabezaconsombrero = new THREE.Object3D();
    cabezaconsombrero.add(cabeza);

    var sombrero = this.createSombrero();
    sombrero.position.y = 0.07;
    cabezaconsombrero.add(sombrero);
    cabezaconsombrero.add(this.createPelo());
    cabezaconsombrero.add(this.createBigote());
    cabezaconsombrero.add(this.createPerilla());
    cabezaconsombrero.add(this.createOjos());


    cabezaconsombrero.position.y+=0.03

    var cabezaconsombreroconcuello = new THREE.Object3D();

    var cuello = this.createCuello();
    cuello.position.y += 0.03/2;

    cabezaconsombreroconcuello.add(cabezaconsombrero);
    cabezaconsombreroconcuello.add(cuello);
    // cabezaconsombreroconcuello.add(pelo);


    return cabezaconsombreroconcuello;
  }

  createPelo(){
    var formapelo = new THREE.Shape();
    formapelo.moveTo(-0.040, 0.055);
    formapelo.quadraticCurveTo(-0.030, 0.01, -0.02, 0);
    formapelo.lineTo(-0.015, 0.02);
    formapelo.lineTo(-0.010, 0);
    formapelo.lineTo(-0.005, 0.02);
    formapelo.lineTo(0.000, 0);
    formapelo.lineTo(0.005, 0.02);
    formapelo.lineTo(0.010, 0);
    formapelo.lineTo(0.015, 0.02);
    formapelo.lineTo(0.020, 0);
    formapelo.quadraticCurveTo(0.030, 0.01, 0.040, 0.055);
    formapelo.lineTo(-0.040, 0.055);
    var opciones = {
      depth: 0.01,
      steps:1,
      bevelEnabled: false,
    };

    var geometria = new THREE.ExtrudeGeometry(formapelo, opciones);

    var pelo = new THREE.Mesh(geometria, this.materialpelo);
    pelo.position.z =-0.04-0.005;
    pelo.position.y =0.07-0.055-0.0001; //La altura de la cabeza menos la del pelo, para que esté arriba


    return pelo
  }

  createBigote(){
    var formabigote= new THREE.Shape();
    formabigote.moveTo(0, 0.0112);
    formabigote.lineTo(0.007, 0.014);
    formabigote.quadraticCurveTo(0.0175, 0.0028, 0.028, 0.014);
    formabigote.quadraticCurveTo(0.0252, 0, 0.0014, 0.0028);
    formabigote.lineTo(-0.0014, 0.0028);
    formabigote.quadraticCurveTo(-0.0252, 0, -0.028, 0.014);
    formabigote.quadraticCurveTo(-0.0175, 0.0028, -0.007, 0.014);
    formabigote.lineTo(0, 0.0112);

    var opciones = {
      depth: 0.01,
      steps:1,
      bevelEnabled: false,
    };

    var geometria = new THREE.ExtrudeGeometry(formabigote, opciones);
    var bigote = new THREE.Mesh(geometria, this.materialpelo);

    bigote.position.z=0.037;
    bigote.position.y=0.03;


    return bigote;
  }

  createPerilla(){
    var formaperilla= new THREE.Shape();
    formaperilla.moveTo(0.0175, 0);
    formaperilla.lineTo(0, -0.052);
    formaperilla.lineTo(-0.0175, 0);
    formaperilla.lineTo(0.0175, 0);

    var opciones = {
      depth: 0.01,
      steps:1,
      bevelEnabled: false,
    };

    var geometria = new THREE.ExtrudeGeometry(formaperilla, opciones);
    var perilla = new THREE.Mesh(geometria, this.materialpelo);

    perilla.position.z=0.032;
    perilla.position.y=0.028;


    return perilla;
  }

  createOjos(){
    const geometria = new THREE.CircleGeometry( 0.012 ); 
    const ojoizq = new THREE.Mesh( geometria, this.materialojos );
    const ojoder = new THREE.Mesh( geometria, this.materialojos );
    ojoizq.position.y+=0.01;
    ojoizq.position.x+=-0.013;

    ojoder.position.y+=0.01;
    ojoder.position.x+=0.013;

    var ojos=new THREE.Object3D();
    ojos.add(ojoizq);
    ojos.add(ojoder);

    ojos.scale.y=0.7;

    ojos.position.y=0.047;
    ojos.position.z=0.043;

    
    return ojos
  }



  createCuello() {
    const geometry = new THREE.CylinderGeometry(0.015, 0.015, 0.03, 32);
    const cuello = new THREE.Mesh(geometry, this.materialpiel);

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
    const sombrero = new THREE.Mesh(geometry, this.materialsombrero);

    return sombrero;
  }

  createBrazo(){
    const geometryb1 = new THREE.CylinderGeometry( 0.015, 0.015, 0.09, 32 ); 
    const geometryb2 = new THREE.CylinderGeometry( 0.015, 0.015, 0.06, 32 );
    const geometryr = new THREE.SphereGeometry( 0.02, 32, 16 ); 

    
    const b2 = new THREE.Mesh( geometryb2, this.materialpiel ); 
    b2.position.y=-(0.06/2);
    const sphere2 = new THREE.Mesh( geometryr, this.materialArticulacion );

    var brazobajo=new THREE.Object3D();
    brazobajo.add(b2);
    brazobajo.add(sphere2);
    brazobajo.position.y=-0.09;
    brazobajo.rotation.x=-90/180*Math.PI


    const b1 = new THREE.Mesh( geometryb1, this.materialarmadura ); 
    const sphere = new THREE.Mesh( geometryr, this.materialArticulacion );
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
    shape.lineTo(0.00001, 0.04);
    shape.lineTo(0.00001, -0.04);

    var points = shape.extractPoints().shape;
    const geometry=new THREE.LatheGeometry(points);

    const mesh = new THREE.Mesh( geometry, this.materialarmadura ) ;
    return mesh;

  }

  createPiernaInf() {
    const geometryr = new THREE.SphereGeometry(0.02, 32, 16); 
    const geometry_pierna = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 32);
  
    var rodilla = new THREE.Mesh(geometryr, this.materialArticulacion);
    
    var espinilla = new THREE.Mesh(geometry_pierna, this.materialPierna);
    espinilla.position.y = -(0.03);

    var pierna = new THREE.Object3D();
    pierna.add(rodilla);
    pierna.add(espinilla);

    var pie = new THREE.Mesh(geometryr, this.materialArticulacion);
    pie.position.y = -(0.06);

    pierna.add(pie);

    return pierna;
  }

  createTronco() {
    const geometrytr = new THREE.CylinderGeometry(0.04, 0.07, 0.15, 32);
    
    var tronco = new THREE.Mesh(geometrytr, this.materialarmadura);

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
    if(this.rotacionpierna>30) this.movimientopierna=false;
    else if(this.rotacionpierna<-30) this.movimientopierna=true;

    
    if(this.movimientopierna && this.contadorlento>0) this.rotacionpierna+=1;
    else if(!this.movimientopierna && this.contadorlento>0)this.rotacionpierna-=1;
    else if(this.movimientopierna) this.rotacionpierna+=2;
    else this.rotacionpierna-=2;

    this.rotacionrodilla=Math.abs(this.rotacionpierna)*2

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

    
  }
}

export { personaje }
