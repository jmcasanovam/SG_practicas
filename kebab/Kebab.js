
import * as THREE from 'three';

class Kebab extends THREE.Object3D {
    constructor() {
        super();      
        var tomate = this.crearTomate();
        tomate.position.set(0.1, 0.2, -0.2);
        this.add(tomate);
        var tomate2 = this.crearTomate();
        tomate2.position.set(0.45, 0.2, -0.2);
        this.add(tomate2);
        var fagita = this.crearFagita();
        this.add(fagita);
    }

    crearTomate() {
        var formaTomate = new THREE.Shape();

        formaTomate.moveTo(0, 0.1);
        formaTomate.absarc(0, 0, 0.1, 0, Math.PI * 2);

        // var hole = new THREE.Shape();
        // hole.moveTo(0, 0.1);
        // hole.absarc(0, 0, 0.05, 0, Math.PI * 2);
        var triangulo = new THREE.Shape();
        triangulo.moveTo(0.03, 0.01);
        triangulo.lineTo(0.03, 0.075);
        triangulo.lineTo(0.06, 0.01);
        formaTomate.holes.push(triangulo);

        var triangulo2 = new THREE.Shape();
        triangulo2.moveTo(-0.03, 0.01);
        triangulo2.lineTo(-0.03, 0.075);
        triangulo2.lineTo(-0.06, 0.01);
        formaTomate.holes.push(triangulo2);

        var triangulo3 = new THREE.Shape();
        triangulo3.moveTo(0.03,-0.01);
        triangulo3.lineTo(0.03, -0.075);
        triangulo3.lineTo(0.06,-0.01);
        formaTomate.holes.push(triangulo3);

        var triangulo4 = new THREE.Shape();
        triangulo4.moveTo(-0.03, -0.01);
        triangulo4.lineTo(-0.03, -0.075);
        triangulo4.lineTo(-0.06, -0.01);
        formaTomate.holes.push(triangulo4);



        var opciones = {
            depth: 0.01,
            bevelEnabled: false,
            steps: 1,
        };
        

        var geometry = new THREE.ExtrudeGeometry(formaTomate, opciones);
        var material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });

        var tomate = new THREE.Mesh(geometry, material);

        tomate.rotation.x = Math.PI / 2;

        return tomate;
    }

    crearFagita() {
        var formaFagita = new THREE.Shape();
        formaFagita.moveTo(0.5, 0.41/2);
        formaFagita.lineTo(0, 0.41/2);
        formaFagita.lineTo(0, 0);
        formaFagita.lineTo(0.5, 0);
        formaFagita.lineTo(0.5, 0.3/2);
        formaFagita.lineTo(0.4, 0.4/2);
        formaFagita.lineTo(0.4, 0.4/2);
        formaFagita.lineTo(0.5, 0.41/2);

        var opciones = {
            depth: 1,
            bevelEnabled: true,
            steps: 1,
        };

        var geometry = new THREE.ExtrudeGeometry(formaFagita, opciones);
        var material = new THREE.MeshStandardMaterial({ color: 0x964B00 });
        var fagita = new THREE.Mesh(geometry, material);

        return fagita;

    }


    



    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Kebab }
