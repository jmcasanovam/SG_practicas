
import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'

class ejer5 extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    var cara = new THREE.Shape();

    cara.absellipse(0,0, 0.25, .3 , (2*Math.PI)*340/360, (2*Math.PI)*200/360);
    // const geometry = new THREE.ShapeGeometry(cara);

    var options = {
      depth: -3,
      bevelEnabled: false,
      curveSegments: 50
    };

    const geometry = new THREE.ExtrudeGeometry(cara, options);
    const material = new THREE.MeshStandardMaterial( { color: 0xf5f5f5, side:THREE.DoubleSide, flatShading:false} );
    const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.z=-0.03


    var cara2 = new THREE.Shape();
    cara2.absellipse(0,0, 0.23, 0.28, (2*Math.PI)*340/360, (2*Math.PI)*200/360);
    const geometry2 = new THREE.ExtrudeGeometry(cara2, options);
    const material2 = new THREE.MeshStandardMaterial( { color: 0x9811f0, side:THREE.DoubleSide, flatShading:false} );
    const mesh2 = new THREE.Mesh(geometry2, material2);

    var csg = new CSG();
    csg.subtract([mesh2, mesh]); //El grande tiene q estar el segundo?¿
    var mesh3 = csg.toMesh(); //Se queda el color del primero

    // this.add(mesh);
    // this.add(mesh2);
    this.add(mesh3);

  }   
  
  
  
  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { ejer5 }
