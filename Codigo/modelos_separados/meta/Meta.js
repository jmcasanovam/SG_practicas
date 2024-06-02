import * as THREE from 'three'

class Meta extends THREE.Object3D {
    constructor() {
        super();
        
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('../imgs/textura-ajedrezada.jpg');

        var material = new THREE.MeshStandardMaterial({ 
            map: texture,
        });

        var geometria = new THREE.CylinderGeometry( 0.4+0.01, 0.4+0.01, 0.1 );


        var meta = new THREE.Mesh(geometria, material);
        meta.rotation.x=Math.PI/2;

        this.add(meta);
    }


    update() {
        
    }
}

export { Meta }