
import * as THREE from 'three'
import { OBJLoader } from '../libs/OBJLoader.js';

class Modelo extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        this.createGUI(gui, titleGui);


        // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        // var self = this; // Capturar el contexto this

        //var loader = new OBJLoader();
        // //loader.materials = material;

        // loader.load('Tractor.obj', function (obj) {
        //     obj.position.set(0, 0, -10);
        //     obj.scale.set(0.2, 0.2, 0.2);
        //     self.add(obj); // Usar la variable self en lugar de this
        // }, undefined, function (error) {
        //     console.error(error);
        // });

        var loader = new OBJLoader();
        var self = this;
        loader.load('Tractor.obj', function (obj) {
            obj.position.set(0, 0, -10); // Establecer la posición del objeto

            // Escalar el objeto
            obj.scale.set(0.2, 0.2, 0.2); // Escalar a la mitad del tamaño original

            // Crear la textura
            var textureLoader = new THREE.TextureLoader();
            textureLoader.load('Texure_Tractor.jpg', function (texture) {
                // Asignar la textura al material
                var material = new THREE.MeshStandardMaterial({ map: texture });

                // Aplicar el material al objeto
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                    }
                });

                self.add(obj); // Usar la variable self en lugar de this
            });
        }, undefined, function (error) {
            console.error(error);
        });


    }

    
    createGUI(gui, titleGui) {
        // Controles para el movimiento de la parte móvil
        this.guiControls = {
            rotacion: 0
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder(titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        folder.add(this.guiControls, 'rotacion', -0.125, 0.2, 0.001)
            .name('Apertura : ')
            .onChange((value) => this.setAngulo(-value));
    }


    setAngulo(valor) {
        this.movil.rotation.z = valor;
    }

    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Modelo }
