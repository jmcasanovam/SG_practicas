
import * as THREE from 'three';
import { OBJLoader } from '../libs/OBJLoader.js';


class Paloma extends THREE.Object3D {
    constructor(geometria, punto, rotado, name) {
        super();

        this.userData.name=name;
        this.efecto="paloma";

        this.tubo=geometria;
        this.path=geometria.parameters.path;
        this.radio=geometria.parameters.radius;
        this.segmentos=geometria.parameters.tubularSegments;
        this.t=punto;
        this.r=rotado*Math.PI/180;
        this.nodofinal = new THREE.Object3D();
        

        var loader = new OBJLoader();
        var self = this;
        loader.load('../paloma/Paloma.obj', function (obj) {
            obj.position.set(0, 0, 0); // Establecer la posición del objeto

            // Escalar el objeto
            obj.scale.set(0.1, 0.1, 0.1); // Escalar a la mitad del tamaño original

            // Cambiar el color del material a dorado
            var material = new THREE.MeshPhongMaterial({ color: 0xffd700 });
            obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.userData = self.userData;
                child.material = material;
            }
            //if(child.isMesh)
            });

            obj.scale.set(0.01,0.01,0.01);
            obj.userData.name=self.userData;
            obj.position.y+=self.radio+0.5;

            self.superficie = new THREE.Object3D();
            self.superficie.add(obj);
            

            self.superficie.rotation.z=self.r;
            var movlateral = new THREE.Object3D();
            movlateral.add(self.superficie);
            self.nodofinal.add(movlateral);


            var posTmp=self.path.getPointAt(self.t);
            self.nodofinal.position.copy (posTmp);

            var tangente= self.path.getTangentAt(self.t);
            posTmp.add(tangente);
            var segmentoActual=Math.floor(self.t * self.segmentos);
            self.nodofinal.up=self.tubo.binormals[segmentoActual];
            self.nodofinal.lookAt(posTmp);

        });

        this.nodofinal.traverse((child) => {//Se le asigna un nombre a cada objeto para poder identificarlo
            if (child.isMesh) {
              child.userData = this.userData;
            }
          });
        
        this.add(this.nodofinal);
        
    }

    getCajaColision(){
        return this.cajaColision;
    }

    efecto(){
        return "paloma";
    }
    

}

export { Paloma }
