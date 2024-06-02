
import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js';

class Cartel extends THREE.Object3D {
    constructor() {
        super();

        var cartel = this.createCartelCompleto();
        this.add(cartel);

        
    }

    createCartelCompleto() {
        const giro = Math.PI / 8;
        var cartel = new THREE.Object3D();
        var cartel1 = this.createFiguraCartel();
        var cartel2 = this.createFiguraCartel();
        cartel2.position.set(0, 0, 0.8);
        cartel1.rotation.x = giro;
        cartel2.rotation.x = -1 * giro;
        cartel.add(cartel1);
        cartel.add(cartel2);

        var caja = new THREE.BoxGeometry(0.01, 0.05, 0.5);
        var material = new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 1, roughness: 0.9 });
        var cajaMesh = new THREE.Mesh(caja, material);
        cajaMesh.position.set(0.01, 0.35, 0.25 + 0.17);
        cartel.add(cajaMesh);
        var caja2 = new THREE.BoxGeometry(0.01, 0.05, 0.5);
        var cajaMesh2 = new THREE.Mesh(caja2, material);
        cajaMesh2.position.set(0.49, 0.35, 0.25 + 0.17);
        cartel.add(cajaMesh2);
        return cartel;
    }

    createFiguraCartel() {
        var cartelShape = this.createCartelShape();
        var options1 = { depth: 0.05, steps: 1, bevelEnabled: false };
        var cartelGeometry = new THREE.ExtrudeGeometry(cartelShape, options1);

        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('../../imgs/suelo_mojado.png', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Hace que la textura se repita
            texture.repeat.set(2, 1.1); // Repite la textura 2 veces en horizontal y 1.1 en vertical

        });
        const material = new THREE.MeshStandardMaterial({ color: 0xffff00, map: texture });
        var cartel = new THREE.Mesh(cartelGeometry, material);
        return cartel;
    }


    createCartelShape() {
        const altura = 1;
        const anchura = 0.5;
        const x = 0;
        const y = 0;
        var shape = new THREE.Shape();
        //Se crea el contorno exterior
        shape.moveTo(x, y);
        shape.lineTo(anchura * 0.2, y);
        shape.lineTo(anchura * 0.2, altura * 0.1);
        shape.lineTo(anchura * 0.8, altura * 0.1);
        shape.lineTo(anchura * 0.8, y);
        shape.lineTo(anchura, y);
        shape.lineTo(anchura, altura);
        shape.lineTo(anchura * 0.8, altura);
        shape.lineTo(anchura * 0.8, altura * 0.8);
        shape.lineTo(anchura * 0.2, altura * 0.8);
        shape.lineTo(anchura * 0.2, altura);
        shape.lineTo(x, altura);
        shape.lineTo(x, y);

        return shape;
    }


    efecto() {
        return "cartel";
    }

    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Cartel }
