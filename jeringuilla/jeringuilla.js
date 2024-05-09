
import * as THREE from 'three'

class jeringuilla extends THREE.Object3D {
  constructor(geometria, punto) {
    super();
    this.rotar=0;

    this.tubo=geometria;
    this.path=geometria.parameters.path;
    this.radio=geometria.parameters.radius;
    this.segmentos=geometria.parameters.tubularSegments;
    this.t=punto;
    this.r=0;


    this.jeringa = this.createJeringuilla();

    this.jeringa.rotation.y=this.rotar;

    this.jeringa.position.y+=this.radio+0.105;

    this.superficie = new THREE.Object3D();
    this.superficie.add(this.jeringa);
    

    this.superficie.rotation.z=this.r;
    var movlateral = new THREE.Object3D();
    movlateral.add(this.superficie);

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

  createJeringuilla(){
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

    mesh.position.y-=0.105;

    var rotado = new THREE.Object3D();
    rotado.add(mesh);
    rotado.rotation.z=(30/360)*Math.PI;

    return rotado;
  }

  efecto(){
    return "jeringuilla";
  }
  
  
  
  update () {
    this.rotar+=(5/360)*Math.PI;
    this.jeringa.rotation.y=this.rotar;

  }
}

export { jeringuilla }
