import * as THREE from 'three'

class personaje extends THREE.Object3D {
  constructor() {
    super();

    var personaje = new THREE.Object3D();

    const geometrytr = new THREE.CylinderGeometry( 0.04, 0.07, 0.15, 32 ); 
    const material = new THREE.MeshStandardMaterial( {color: 0xffff00} ); 

    var brazo1 = this.createBrazo();
    brazo1.position.x=-0.06;
    brazo1.position.y=0.065;
    brazo1.rotation.z=-(Math.PI*30/360);
    var brazo2 = this.createBrazo();
    brazo2.position.x=0.06;
    brazo2.position.y=0.065;
    brazo2.rotation.z=(Math.PI*30/360);

    

    const tronco = new THREE.Mesh( geometrytr, material );

    personaje.add(brazo1);
    personaje.add(brazo2);
    personaje.add(tronco)


    var pierna=this.createPierna()
    // this.add(pierna)



   

   
    this.add(personaje);

    
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

  createPierna(){
    

    var shape=new THREE.Shape();
    shape.moveTo(0.00001, -0.04);
    shape.lineTo(0.01, -0.04);
    shape.quadraticCurveTo(0.025, -0.025, 0.025, 0);
    shape.lineTo(0.0255, 0.04);
    shape.lineTo(0.00001, 0.04);
    shape.lineTo(0.00001, -0.04);

    var points = shape.extractPoints(6).shape;  //siempre se pone esto
    const geometry=new THREE.LatheGeometry(points);
    const material = new THREE.MeshStandardMaterial( { color: 0xf5f5f5, side:THREE.DoubleSide, flatShading:false} );
    const mesh = new THREE.Mesh( geometry, material ) ;
    return mesh;

  }
  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { personaje }
