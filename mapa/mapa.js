
import * as THREE from 'three'

class mapa extends THREE.Object3D {
  constructor() {
    super();

    const geometryT = new THREE.TorusKnotGeometry( 2, 0.8); 
    const path = this.getPathFromTorusKnot(geometryT);
    this.geometry = new THREE.TubeGeometry( path, 200, 0.4, 8, true );
    const material = new THREE.MeshStandardMaterial( { color: 0x0000ff } ); 
    const mesh = new THREE.Mesh( this.geometry, material );

    
    this.add( mesh );
  }

  createMapa(){
    
    return mesh;
  }

  getGeometry(){
    return this.geometry;
  }
  
  getPathFromTorusKnot (torusKnot) {
    // La codificación de este método está basado
    //   en el código fuente de la página oficial de Three.js
    // https://github.com/mrdoob/three.js/blob/master/src/geometries/TorusKnotGeometry.js
    const p = torusKnot.parameters.p;
    const q = torusKnot.parameters.q;
    const radius = torusKnot.parameters.radius;
    const resolution = torusKnot.parameters.tubularSegments;
    var u, cu, su, quOverP, cs;
    var x,y,z;
    // En  points  se almacenan los puntos que extraemos del torusKnot
    const points = [];
    for ( let i = 0; i < resolution; ++ i ) {
			u = i / resolution * p * Math.PI * 2;
      cu = Math.cos( u );
			su = Math.sin( u );
			quOverP = q / p * u;
			cs = Math.cos( quOverP );

			x = radius * ( 2 + cs ) * 0.5 * cu;
			y = radius * ( 2 + cs ) * su * 0.5;
			z = radius * Math.sin( quOverP ) * 0.5;

      points.push (new THREE.Vector3 (x,y,z));
    }
    // Una vez tenemos el array de puntos 3D construimos y devolvemos el CatmullRomCurve3
    return new THREE.CatmullRomCurve3 (points, true);
  }
  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { mapa }
