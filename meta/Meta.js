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


        // var shape = new THREE.Shape();

        // shape.absarc(0,0,this.radio+0.01,0,Math.PI*2);
        // var hole = new THREE.Shape();
        // hole.absarc(0,0,this.radio-0.1,0,Math.PI*2);
        // shape.holes.push(hole);

        // var opciones = {
        //     depth: -0.1,
        //     steps:1,
        //     bevelEnabled: false,
        //   };

        // var geometria = new THREE.ExtrudeGeometry(shape, opciones);
        // var material = new THREE.MeshStandardMaterial({color: 0x8a9597, side:THREE.DoubleSide});


        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('../imgs/textura-ajedrezada.jpg');

        var material = new THREE.MeshStandardMaterial({ 
            map: texture,
        });

        var geometria = new THREE.CylinderGeometry( this.radio+0.01, this.radio+0.01, 0.1 );


        var meta = new THREE.Mesh(geometria, material);
        // meta.rotation.y=90;ç
        meta.rotation.x=Math.PI/2;

        var nodo = new THREE.Object3D();
        nodo.add(meta);
        

        var posTmp=this.path.getPointAt(this.t);
        nodo.position.copy (posTmp);

        var tangente= this.path.getTangentAt(this.t);
        posTmp.add(tangente);
        var segmentoActual=Math.floor(this.t * this.segmentos);
        nodo.up=this.tubo.binormals[segmentoActual];
        nodo.lookAt(posTmp);

        this.add(nodo);
    }


    update() {
        
    }
}

export { Meta }