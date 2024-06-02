
import * as THREE from 'three';

class Esfera extends THREE.Object3D {
    constructor() {
        super();      
        this.crearEsfera();
    }

    crearEsfera() {
        //Cargo la textura
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('../../imgs/cielo.jpg');

        //Creo el material con la textura
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

        //Creo la esfera
        this.esfera = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), material);

        //Posiciono la esfera
        this.esfera.position.set(0, 0, 0);

        //Añado la esfera a la escena
        this.add(this.esfera);
    }



    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Esfera }
