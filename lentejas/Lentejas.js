
import * as THREE from 'three';

class Lentejas extends THREE.Object3D {
    constructor() {
        super();      
        this.crearLentejas();
    }

    crearPlato() {
        const y = 0, x = 0.0001; 

        //Haces la forma del perfil    
        const plato = new THREE.Shape();
        plato.moveTo(x, y -0.01);
        plato.lineTo(x + 0.03, y - 0.01);
        plato.quadraticCurveTo(x + 0.03, y, x + 0.05, y + 0.01);
        plato.lineTo(x, y + 0.01);

        //Creo la geometria del plato
        const puntos = plato.extractPoints(6).shape;
        const geometria = new THREE.LatheGeometry(puntos);

        //Creo el material del plato
        const material = new THREE.MeshPhongMaterial({ color: 0x000000});

        //Creo el plato
        const platoFinal = new THREE.Mesh(geometria, material);

        return platoFinal;
    }

    crearComida() {
        const radio = 0.04;
        const segmentos = 32;
        const geometria = new THREE.CircleGeometry(radio, segmentos);

        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('../imgs/lentejas3.png');
        const material = new THREE.MeshPhongMaterial({ map: texture, color: 0xF0F0F0 });
        const comida = new THREE.Mesh(geometria, material);
        comida.rotation.x = -Math.PI / 2;
        
        return comida;

    }

    crearLentejas() {
        this.platoLentejas = new THREE.Object3D();
        this.plato = this.crearPlato();
        this.comida = this.crearComida();

        this.comida.position.y = 0.010009;
        this.platoLentejas.add(this.comida);
        this.platoLentejas.add(this.plato);
        this.add(this.platoLentejas);
    }

    



    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Lentejas }
