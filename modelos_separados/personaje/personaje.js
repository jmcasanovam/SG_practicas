import * as THREE from 'three'

class personaje extends THREE.Object3D {
  constructor() {
    super();
    var personaje = this.createPersonaje();
    this.add(personaje);
  }

  createPersonaje() {
    var personaje = new THREE.Object3D();

    var brazo1 = this.createBrazo();
    brazo1.position.x = -0.06;
    brazo1.position.y = 0.065;
    brazo1.rotation.z = -(Math.PI * 30 / 360);

    var brazo2 = this.createBrazo();
    brazo2.position.x = 0.06;
    brazo2.position.y = 0.065;
    brazo2.rotation.z = (Math.PI * 30 / 360);

    var tronco = this.createTronco();

    personaje.add(brazo1);
    personaje.add(brazo2);
    personaje.add(tronco)


    var piernaIzq = this.createPiernaSup();
    piernaIzq.position.set(0.025+0.01, -(0.15-0.04), 0);
    personaje.add(piernaIzq);

    var piernaDer = this.createPiernaSup();
    piernaDer.position.set(-(0.025 + 0.01), -(0.15 - 0.04), 0);
    personaje.add(piernaDer);

    var rodillaIzq = this.createPiernaInf();
    rodillaIzq.position.set(0.025 + 0.01, -(0.15 - 0.04) - 0.04, 0);
    personaje.add(rodillaIzq);

    var rodillaDer = this.createPiernaInf();
    rodillaDer.position.set(-(0.025 + 0.01), -(0.15 - 0.04) - 0.04, 0);
    personaje.add(rodillaDer);

    var cabeza = this.cretateCabeza();
    cabeza.position.y = 0.1;
    personaje.add(cabeza);

    var cuello = this.createCuello();
    cuello.position.y = 0.09;
    personaje.add(cuello);

    var sombrero = this.createSombrero();
    sombrero.position.y = 0.17;
    personaje.add(sombrero);

    return personaje;
  }

  cretateCabeza(){
    // const geometry = new THREE.SphereGeometry( 0.05, 32, 16 ); 
    // const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
    // const cabeza = new THREE.Mesh( geometry, material );
    
    var shape = new THREE.Shape();
    shape.moveTo(0.001, 0);
    shape.quadraticCurveTo(0.04, 0, 0.04, 0.04);
    shape.lineTo(0.043, 0.055);
    shape.lineTo(0.043, 0.07);
    shape.lineTo(0.001, 0.07);
    shape.lineTo(0.001, 0);
    

    var points = shape.extractPoints().shape;
    const geometry = new THREE.LatheGeometry(points);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const cabeza = new THREE.Mesh(geometry, material);

    return cabeza;
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
    const material2 = new THREE.MeshStandardMaterial( { color: 0x000000 } ); 
    const material = new THREE.MeshStandardMaterial( {color: 0xffff00} );
    
    const b2 = new THREE.Mesh( geometryb2, material ); 
    b2.position.y=-(0.06/2);
    const sphere2 = new THREE.Mesh( geometryr, material2 );

    var brazobajo=new THREE.Object3D();
    brazobajo.add(b2);
    brazobajo.add(sphere2);
    brazobajo.position.y=-0.09;


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
    shape.lineTo(0.0255, 0.04);
    shape.lineTo(0.00001, 0.04);
    shape.lineTo(0.00001, -0.04);

    var points = shape.extractPoints().shape;
    const geometry=new THREE.LatheGeometry(points);
    // const material = new THREE.MeshStandardMaterial( { color: 0xf5f5f5, side:THREE.DoubleSide, flatShading:false} );
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 }); 

    const mesh = new THREE.Mesh( geometry, material ) ;
    return mesh;

  }

  createPiernaInf() {
    const geometryr = new THREE.SphereGeometry(0.02, 32, 16); 
    const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const material2 = new THREE.MeshStandardMaterial({ color: 0xffff00 });

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
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 }); 
    var tronco = new THREE.Mesh(geometrytr, material);

    return tronco;
  }
  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { personaje }
