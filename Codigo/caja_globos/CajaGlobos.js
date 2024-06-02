
import * as THREE from 'three'

class CajaGlobos extends THREE.Object3D {
  constructor(geometria, pos, rotado, name) {
    super();
    this.userData.name=name;
    this.efecto="caja globos";

    this.tubo=geometria;
    this.path=geometria.parameters.path;
    this.radio=geometria.parameters.radius;
    this.segmentos=geometria.parameters.tubularSegments;
    this.t=pos;
    this.r=rotado*Math.PI/180;

    this.cajaglobos=this.createCajaGlobo();

    this.cajaglobos.position.y+=this.radio+0.6;

    this.superficie = new THREE.Object3D();
    this.superficie.add(this.cajaglobos);
    

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

  createCajaGlobo(){
    var final=new THREE.Object3D();

    var caja=this.crearCaja();
    final.add(caja);

    var brazo1=this.createBrazo(1,1,0xfe0000);
    var brazo2=this.createBrazo(1,-1,0xfded00 );
    var brazo3=this.createBrazo(-1,1, 0x00aae4);
    var brazo4=this.createBrazo(-1,-1, 0x02d12b);
    final.add(brazo1);
    final.add(brazo2);
    final.add(brazo3);
    final.add(brazo4);

    final.traverse((child) => {//Se le asigna un nombre a cada objeto para poder identificarlo
      if (child.isMesh) {
        child.userData = this.userData;
      }
    });
    return final
  }


  crearGlobo(color_globo) {
    var shape = new THREE.Shape();
    shape.moveTo(0.00001, 0);
    shape.lineTo(0.001, 0);
    shape.lineTo(0.001, 0.0035);
    shape.lineTo(0.013, 0.017);
    shape.lineTo(0.018, 0.025);
    shape.lineTo(0.02, 0.035);
    shape.lineTo(0.0205, 0.04);
    shape.quadraticCurveTo(0.02, 0.052, 0.00001, 0.053);
    shape.lineTo(0.00001, 0.0535);
    shape.lineTo(0.00001, 0);

    var points = shape.extractPoints(6).shape;
    const geometry = new THREE.LatheGeometry(points);
    const material = new THREE.MeshStandardMaterial({ color: color_globo });

    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  createBrazo(izq, delante, color){
    var brazo=new THREE.Object3D();

    const geometry = new THREE.CylinderGeometry( 0.001, 0.001, 0.04, 32 ); 
    const material = new THREE.MeshStandardMaterial( {color: 0x000000} ); 
    const cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.y+=0.02;

    var globo=this.crearGlobo(color);
    globo.position.y=0.04;
    brazo.add(globo);
    brazo.add(cylinder);

    brazo.rotation.z=Math.PI*(20/360*izq)
    brazo.position.x=-0.042*izq;
    brazo.position.z=0.06*delante;
    brazo.position.y+=0.07;

    return brazo;
  }

  crearCaja() {
    const geometry = new THREE.BoxGeometry( 0.095, 0.07, 0.11, 32 ); 
    const material = new THREE.MeshStandardMaterial( {color: 0xeed09d} ); 
    const caja = new THREE.Mesh( geometry, material );
    caja.position.y+=0.035;

    return caja;
    
  }

  efecto(){
    return "caja globos";
  }

  
  
}

export { CajaGlobos }
