
import * as THREE from 'three'
import { OBJLoader } from '../libs/OBJLoader.js';

class Tractor extends THREE.Object3D {
    constructor() {
        super();

        var loader = new OBJLoader();
        var self=this;
        loader.load('../tractor/Tractor.obj', function (obj) {
            // Escalar el objeto
            obj.scale.set(0.1, 0.1, 0.1); // Escalar a la mitad del tamaño original

            // Crear la textura
            var textureLoader = new THREE.TextureLoader();
            textureLoader.load('../tractor/Texure_Tractor.jpg', function (texture) {
                // Asignar la textura al material
                var material = new THREE.MeshStandardMaterial({ map: texture });

                // Aplicar el material al objeto
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                    }
                });

                obj.position.set(0, 0, -12); // Establecer la posición del objeto

                self.add(obj);
                
            });

        }, undefined, function (error) {
            console.error(error);
        });

        
    }

    getCajaColision(){
        return this.cajaColision;
    }

    efecto(){
        return "tractor";
    }

    update() {
        
    }
}

export { Tractor }
