
import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js';

class Molino extends THREE.Object3D {
    constructor() {
        super();

        this.crearMolino(0);
        this.add(this.molino);

    }

    crearMolino(ra) {
        this.molino = new THREE.Object3D();
        this.cabeza = this.crearCabeza(0x000FFF, 0);
        this.cabeza.position.set(0, 0.05, 0);
        this.cabeza.rotation.y = ra;
        this.molino.add(this.cabeza);

        this.tronco = this.crearTronco(0x00FF00);
        this.molino.add(this.tronco);

    }

    crearTronco(color) {
        var material = new THREE.MeshPhongMaterial({ color: color });
        var geometria = new THREE.BoxGeometry(0.1, 1, 0.1);
        var tronco = new THREE.Mesh(geometria, material);
        tronco.position.set(0, -0.5, 0);
        return tronco;
    }

    crearCabeza(color, rb = 0) {
        var cabeza = new THREE.Object3D();
        var material = new THREE.MeshPhongMaterial({ color: color });
        var b = new THREE.BoxGeometry(0.7, 0.1, 0.1);
        var caja = new THREE.Mesh(b, material);

        this.aspas = this.crearAspas();
        this.aspas.position.set(0.4, 0, 0);
        this.aspas.rotation.x = rb;
        cabeza.add(caja);
        cabeza.add(this.aspas);
        
        return cabeza;

    }

    crearAspas() {
        var aspas = new THREE.Object3D();
        var aspa = this.crearAspa(0x00FFEE);
        var aspa2 = this.crearAspa(0x00FFF0);

        aspa.position.set(0, 0.35, 0);
        aspa2.position.set(0, -0.35, 0);
        aspa2.rotation.y = -Math.PI / 4;

        aspas.add(aspa);
        aspas.add(aspa2);

        return aspas;
    }

    crearAspa(color) {
        
        var material = new THREE.MeshPhongMaterial({ color: color });
        var geometria = new THREE.BoxGeometry(0.1, 0.7, 0.05);
        var caja = new THREE.Mesh(geometria, material);      

        return caja;
    }

    update() {
        this.cabeza.rotation.y += 0.005;
        this.aspas.rotation.x += 0.02;

    }
}

export { Molino }
