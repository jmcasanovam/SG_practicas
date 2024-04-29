import * as THREE from 'three'

class dron extends THREE.Object3D {
  constructor() {
    super();
    var dron = this.createDron();
    this.add(dron);
  }

  createDron(){
    var dron=new THREE.Object3D();

    var tronco=this.createTronco();
    dron.add(tronco);

    var brazo1=this.createBrazo(1,1);
    var brazo2=this.createBrazo(1,-1);
    var brazo3=this.createBrazo(-1,1);
    var brazo4=this.createBrazo(-1,-1);
    dron.add(brazo1);
    dron.add(brazo2);
    dron.add(brazo3);
    dron.add(brazo4);    

    return dron;
  }

  createBrazo(izq, delante){     //izq: se pasa un 1 si es izq, si es derecha un -1;  delante: Se pasa un 1 si es delantero, -1 si es trasero 
    var brazo=new THREE.Object3D();

    var shape=new THREE.Shape();
    shape.moveTo(0, -.001);
    shape.quadraticCurveTo(-.001,-.001, -.001, 0);
    shape.quadraticCurveTo(-.001, .001, 0, .001);
    shape.quadraticCurveTo(.001, .001, .001, 0);
    shape.quadraticCurveTo(.001,-.001, 0, -.001);

    var array=[
      new THREE.Vector3 (-0.03*izq, 0.006, 0),
      new THREE.Vector3 (-0.038*izq, 0.007, 0),
      new THREE.Vector3 (-0.045*izq, 0.008, 0),
      new THREE.Vector3 (-0.06*izq, 0.012, 0),
      new THREE.Vector3 (-0.065*izq, 0.018, 0),
      new THREE.Vector3 (-0.07*izq, 0.028, 0),
      new THREE.Vector3 (-0.07*izq, 0.03, 0),
    ];

    var path = new THREE.CatmullRomCurve3(array);

    var options={steps:50, curveSegments: 50, extrudePath: path};
    
    const geometry = new THREE.ExtrudeGeometry(shape, options);
    const material = new THREE.MeshStandardMaterial( { color: 0xbababa, side:THREE.DoubleSide, flatShading:false} );
    const mesh = new THREE.Mesh( geometry, material ) ;
    brazo.add(mesh);

    var aspa=this.createAspa();
    aspa.position.x=-0.07*izq;
    aspa.position.y=0.03+(0.0015/2);
    
    brazo.add(aspa);
    brazo.position.z=delante*0.035;
    return brazo;
  }

  createAspa(){
    const geometry = new THREE.BoxGeometry( .0025, .0015, .03 );
    const material = new THREE.MeshStandardMaterial( {color: 0x000000} );
    const primera = new THREE.Mesh( geometry, material );
    const segunda = new THREE.Mesh( geometry, material );
    segunda.rotation.y=Math.PI/2;

    var aspa=new THREE.Object3D();
    aspa.add(segunda);
    aspa.add(primera);
    return aspa;
  }

  createTronco(){

    var shape=new THREE.Shape();
    shape.moveTo(-0.02, -0.01);
    shape.quadraticCurveTo(-.035, -.01, -.035, -.002);
    shape.lineTo(-.035, .002);
    shape.quadraticCurveTo(-.035, .01, -.02, .01);
    shape.lineTo(.02, .01);
    shape.quadraticCurveTo(.035, .01, .035, .002);
    shape.lineTo(.035, -.002);
    shape.quadraticCurveTo(.035, -.01, .02, -.01);
    shape.lineTo(-.02, -.01);

    var options = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 10,
      steps: 2,
      bevelSize: 0.001,
      bevelThickness: 0.001,
    };
    var geometry = new THREE.ExtrudeGeometry(shape, options);
    var material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const mesh = new THREE.Mesh( geometry, material ) ;
    mesh.position.z=-0.05;
    return mesh;
  }

  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { dron }
