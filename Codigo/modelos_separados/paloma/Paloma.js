
import * as THREE from 'three';
import { OBJLoader } from '../libs/OBJLoader.js';


class Paloma extends THREE.Object3D {
    constructor() {
        super();

        var loader = new OBJLoader();
        var self = this;
        loader.load('Paloma.obj', function (obj) {
            obj.position.set(0, 0, 0); // Establecer la posición del objeto

            // Escalar el objeto
            obj.scale.set(0.1, 0.1, 0.1); // Escalar a la mitad del tamaño original

            // Cambiar el color del material a dorado
            var material = new THREE.MeshPhongMaterial({ color: 0xffd700 });
            obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
            });

            self.add(obj);
        });
        
    }

   
    



    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Paloma }
