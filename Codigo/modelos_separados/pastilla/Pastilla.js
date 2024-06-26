
import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js';

class Pastilla extends THREE.Object3D {
    constructor() {
        super();

        //Creo la pastilla
        var pastilla = this.createPastilla();
        this.add(pastilla);
    }

    createPastilla() {
        var pastillaFinal = new THREE.Object3D();
        var pastillaInferior = this.createPastillaInferior();
        var pastillaSuperior = this.createPastillaSuperior();
        pastillaFinal.add(pastillaInferior);
        pastillaFinal.add(pastillaSuperior);
        return pastillaFinal;
    }

    createPastillaSuperiorShape() {
        const altura = 0.3;
        const anchura = 0.05;
        const x = 0.001;
        const y = 0;
        var shape = new THREE.Shape();
        shape.moveTo(x, altura/2);
        shape.lineTo(anchura * 1.1, altura / 2);
        shape.lineTo(anchura * 1.1, altura * 3 / 4);
        shape.quadraticCurveTo(anchura * 1.1, altura, 0, altura);
        shape.lineTo(x, altura / 2);

        return shape;
    }

    createPastillaInferiorShape() {
        const altura = 0.3;
        const anchura = 0.05;
        const x = 0.001;
        const y = 0;
        var shape = new THREE.Shape();
        //Se crea el contorno exterior
        shape.moveTo(x, y);
        shape.quadraticCurveTo(anchura, 0, anchura, altura / 4);
        shape.lineTo(anchura, altura / 2);
        shape.lineTo(x, altura / 2);
        shape.lineTo(x, y);

        return shape;
    }

    createPastillaInferior(color = 0x0000FF) {
        var shape = this.createPastillaInferiorShape();

        var points = shape.extractPoints().shape;
        var geometry2 = new THREE.LatheGeometry(points, 20);
        var material2 = new THREE.MeshMatcapMaterial({color: color});
        var objetoRevolucion = new THREE.Mesh(geometry2, material2, Math.PI * 2);
        return objetoRevolucion;
    }

    createPastillaSuperior(color = 0xFFFF00) {
        var shape = this.createPastillaSuperiorShape();

        var points = shape.extractPoints().shape;
        var geometry2 = new THREE.LatheGeometry(points, 20);
        var material2 = new THREE.MeshMatcapMaterial({ color: color });
        var objetoRevolucion = new THREE.Mesh(geometry2, material2, Math.PI * 2);
        return objetoRevolucion;
    }

    

    update() {
        
    }
}

export { Pastilla }
