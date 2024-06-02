
import * as THREE from 'three';

class Kebab extends THREE.Object3D {
    constructor() {
        super();      
        
        this.kebab = new THREE.Object3D();
        var tomate = this.crearTomate();
        tomate.position.set(0.1, 0.1, -0.2);
        this.kebab.add(tomate);
        var tomate2 = this.crearTomate();
        tomate2.position.set(0.45, 0.1, -0.2);
        this.kebab.add(tomate2);
        var fagita = this.crearFagita();
        this.kebab.add(fagita);

        var lechuga = this.crearLechuga();
        lechuga.position.set(0.1, 0.09, -0.4);
        this.kebab.add(lechuga);

        var lechuga2 = this.crearLechuga();
        lechuga2.position.set(0.45, 0.09, -0.4);
        this.kebab.add(lechuga2);

        var tomate3 = this.crearTomate();
        tomate3.position.set(0.27, 0.15, -0.2);
        this.kebab.add(tomate3);

        var lechuga3 = this.crearLechuga();
        lechuga3.position.set(0.27, 0.14, -0.4);
        this.kebab.add(lechuga3);
        this.add(this.kebab);
    }

    crearTomate() {
        var formaTomate = new THREE.Shape();

        formaTomate.moveTo(0, 0.1);
        formaTomate.absarc(0, 0, 0.1, 0, Math.PI * 2);

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
            depth: 0.6,
            bevelEnabled: true,
            steps: 1,
        };

        var geometry = new THREE.ExtrudeGeometry(formaFagita, opciones);
        var material = new THREE.MeshStandardMaterial({ color: 0x964B00 });
        var fagita = new THREE.Mesh(geometry, material);

        return fagita;

    }

    crearLechuga() {
        var formaLechuga = new THREE.Shape();
        
        formaLechuga.moveTo(0, 0);
        formaLechuga.bezierCurveTo(0.03 * 3, 0.02 * 3, 0.02 * 3, 0.03 * 3, 0.03 * 3, 0.04 * 3);
        formaLechuga.bezierCurveTo(0.04 * 3, 0.05 * 3, 0.05 * 3, 0.06 * 3, 0.04 * 3, 0.08 * 3);
        formaLechuga.bezierCurveTo(0.03 * 3, 0.1 * 3, 0.01 * 3, 0.11 * 3, 0 * 3, 0.12 * 3);
        formaLechuga.bezierCurveTo(-0.01 * 3, 0.11 * 3, -0.03 * 3, 0.1 * 3, -0.04 * 3, 0.08 * 3);
        formaLechuga.bezierCurveTo(-0.05 * 3, 0.06 * 3, -0.04 * 3, 0.05 * 3, -0.03 * 3, 0.04 * 3);
        formaLechuga.bezierCurveTo(-0.02 * 3, 0.03 * 3, -0.01 * 3, 0.02 * 3, 0 * 3, 0 * 3);


        var opciones = {
            depth: 0.01,
            bevelEnabled: false,
            steps: 1,
        };

        var geometry = new THREE.ExtrudeGeometry(formaLechuga, opciones);

        var texture = new THREE.TextureLoader().load('../imgs/lechuga.png', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Hace que la textura se repita
            texture.repeat.set(2, 1); // Repite la textura 2 veces en horizontal y 1 en vertical
        });
        var material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide});
        // var material = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
        var lechuga = new THREE.Mesh(geometry, material);

        lechuga.rotation.x = Math.PI / 2;

        return lechuga;
    }


    



    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Kebab }
