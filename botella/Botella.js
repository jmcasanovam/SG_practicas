
import * as THREE from 'three';

class Botella extends THREE.Object3D {
    constructor() {
        super();      
        this.crearBotella();
    }

    crearBotella() {
        const y = 0, x = 0.0001;    //declaro 2 variables, la y no puede ser 0 en revolucion

        //Haces la forma del perfil
        const botella = new THREE.Shape();
        botella.moveTo(x, y - 0.1);
        botella.lineTo(x + 0.03, y - 0.1);
        botella.lineTo(x + 0.03, y + 0.02);
        botella.quadraticCurveTo(x + 0.03, y + 0.1, x+0.01, y + 0.1);
        botella.lineTo(x + 0.01, y + 0.17);
        botella.lineTo(x, y + 0.17);

        //Creo la geometria de la botella
        const puntos = botella.extractPoints(6).shape;
        const geometria = new THREE.LatheGeometry(puntos);

        //Creo el material de la botella
        const material = new THREE.MeshPhongMaterial({ color: 0x000000, transparent: true, opacity: 0.9 });

        //Creo la botella
        this.botellaFinal = new THREE.Mesh(geometria, material);

        this.botellaFinal.position.y -= 0.035;
        this.add(this.botellaFinal);

        
    }

    



    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Botella }
