
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
        this.cajaColision = new THREE.Box3();
        this.superficie = new THREE.Object3D();
        this.nodofinal = new THREE.Object3D();



        var loader = new OBJLoader();
        var self=this;
        loader.load('../tractor/Tractor.obj', function (obj) {
            obj.position.set(0, 0, 0); // Establecer la posición del objeto

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
                obj.scale.set(0.008,0.008,0.008);
                obj.rotation.y=Math.PI/2;
                obj.position.x-=0.8;
                obj.position.y+=self.radio+0.2;
    
                self.superficie.add(obj);
              
            });
        }, undefined, function (error) {
            console.error(error);
        });

        this.superficie.rotation.z=this.r;
        var movlateral = new THREE.Object3D();
        movlateral.add(this.superficie);

        this.nodofinal.add(movlateral);


        var posTmp=this.path.getPointAt(this.t);


        this.nodofinal.position.copy (posTmp);

        var tangente= this.path.getTangentAt(this.t);
        posTmp.add(tangente);
        var segmentoActual=Math.floor(this.t * this.segmentos);
        this.nodofinal.up=this.tubo.binormals[segmentoActual];
        this.nodofinal.lookAt(posTmp);

        this.cajaColision.setFromObject(this.nodofinal);

        this.add(this.nodofinal);

        // this.cajaColision=self.cajaColision;
        
    }

    getCajaColision(){
        return this.cajaColision;
    }

    efecto(){
        return "tractor";
    }

    update() {
        this.cajaColision.setFromObject(this.superficie);
        this.r=(this.r-(Math.PI*2)*0.5/360)%(Math.PI*2);
        this.superficie.rotation.z=this.r;
    }
}

export { Tractor }
