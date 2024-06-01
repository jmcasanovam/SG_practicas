
import * as THREE from 'three'
import { OBJLoader } from '../libs/OBJLoader.js';

class Tractor extends THREE.Object3D {
    constructor(geometria, punto, rotado) {
        super();

        this.tubo=geometria;
        this.path=geometria.parameters.path;
        this.radio=geometria.parameters.radius;
        this.segmentos=geometria.parameters.tubularSegments;
        this.t=punto;
        this.r=rotado*Math.PI/180;

        var loader = new OBJLoader();
        var self=this;
        loader.load('../tractor/Tractor.obj', function (obj) {
            obj.position.set(0, 0, -10); // Establecer la posición del objeto

            // Escalar el objeto
            obj.scale.set(0.2, 0.2, 0.2); // Escalar a la mitad del tamaño original

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
                obj.scale.set(0.01,0.01,0.01);
                obj.position.y+=self.radio;
    
                self.superficie = new THREE.Object3D();
                self.superficie.add(obj);
                

                self.superficie.rotation.z=self.r;
                var movlateral = new THREE.Object3D();
                movlateral.add(self.superficie);

                self.nodofinal = new THREE.Object3D();
                self.nodofinal.add(movlateral);


                var posTmp=self.path.getPointAt(self.t);


                self.nodofinal.position.copy (posTmp);

                var tangente= self.path.getTangentAt(self.t);
                posTmp.add(tangente);
                var segmentoActual=Math.floor(self.t * self.segmentos);
                self.nodofinal.up=self.tubo.binormals[segmentoActual];
                self.nodofinal.lookAt(posTmp);


                self.add(self.nodofinal);
            });
        }, undefined, function (error) {
            console.error(error);
        });

        
    }

    efecto(){
        return "tractor";
    }

    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Tractor }
