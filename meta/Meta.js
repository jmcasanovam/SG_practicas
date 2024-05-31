import * as THREE from 'three'

class Meta extends THREE.Object3D {
    constructor(geometria) {
        super();
        this.tubo=geometria;
        this.path=geometria.parameters.path;
        this.radio=geometria.parameters.radius;
        this.segmentos=geometria.parameters.tubularSegments;
        this.t=0;
        this.r=0;


        var shape = new THREE.Shape();

        shape.absarc(0,0,this.radio+0.01,0,Math.PI*2);
        var hole = new THREE.Shape();
        hole.absarc(0,0,this.radio-0.1,0,Math.PI*2);
        shape.holes.push(hole);

        var opciones = {
            depth: -0.1,
            steps:1,
            bevelEnabled: false,
          };

        var geometria = new THREE.ExtrudeGeometry(shape, opciones);
        
        var material = new THREE.MeshStandardMaterial({color: 0x8a9597, side:THREE.DoubleSide});

        var meta = new THREE.Mesh(geometria, material);
        

        var posTmp=this.path.getPointAt(this.t);
        meta.position.copy (posTmp);

        var tangente= this.path.getTangentAt(this.t);
        posTmp.add(tangente);
        var segmentoActual=Math.floor(this.t * this.segmentos);
        meta.up=this.tubo.binormals[segmentoActual];
        meta.lookAt(posTmp);

        this.add(meta);
    }


    update() {
        
    }
}

export { Meta }