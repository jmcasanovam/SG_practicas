
import * as THREE from 'three'

class jeringuilla extends THREE.Object3D {
  constructor() {
    super();

    const x = 0, y = 0.0001;    //declaro 2 variables, la y no puede ser 0 en revolucion

    //Haces la forma del perfil
    const jeringuilla = new THREE.Shape();
    jeringuilla.moveTo(x, y+0.21);      //te mueves sin dibujar
    jeringuilla.lineTo(x+0.02, y+0.21);
    jeringuilla.lineTo(x+0.02, y+0.205);
    jeringuilla.lineTo(x+0.0075, y+0.205);
    jeringuilla.lineTo(x+0.0075, y+0.18);
    jeringuilla.lineTo(x+0.02, y+0.18);
    jeringuilla.lineTo(x+0.02, y+0.07);
    jeringuilla.lineTo(x+0.01, y+0.07);
    jeringuilla.lineTo(x+0.01, y+0.04);
    jeringuilla.lineTo(x+0.001, y+0.04);
    jeringuilla.lineTo(x,y);

    var points = jeringuilla.extractPoints(6).shape;  //siempre se pone esto

    const geometry=new THREE.LatheGeometry(points);
    // const geometry = new THREE.ShapeGeometry(jeringuilla);
    const material = new THREE.MeshStandardMaterial( { color: 0xf5f5f5, side:THREE.DoubleSide, flatShading:false} );
    const mesh = new THREE.Mesh( geometry, material ) ;
    this.add( mesh );


  }
  
  
  
  update () {
  }
}

export { jeringuilla }
