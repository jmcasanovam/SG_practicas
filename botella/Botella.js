
import * as THREE from 'three';

class Botella extends THREE.Object3D {
    constructor(geometria, punto, rotado) {
        super();

        this.tubo=geometria;
        this.path=geometria.parameters.path;
        this.radio=geometria.parameters.radius;
        this.segmentos=geometria.parameters.tubularSegments;
        this.t=punto;
        this.r=rotado*Math.PI/180;

        this.botella = this.crearBotella();

        this.botella.position.y+=this.radio;
    
        this.superficie = new THREE.Object3D();
        this.superficie.add(this.botella);
        
    
        this.superficie.rotation.z=this.r;
        var movlateral = new THREE.Object3D();
        movlateral.add(this.superficie);
    
        this.nodofinal = new THREE.Object3D();
        this.nodofinal.add(movlateral);
    
    
        var posTmp=this.path.getPointAt(this.t);
    
    
        this.nodofinal.position.copy (posTmp);
    
        var tangente= this.path.getTangentAt(this.t);
        posTmp.add(tangente);
        var segmentoActual=Math.floor(this.t * this.segmentos);
        this.nodofinal.up=this.tubo.binormals[segmentoActual];
        this.nodofinal.lookAt(posTmp);
    
    
        this.add(this.nodofinal);
    }

    crearBotella() {
        const y = 0, x = 0.0001;

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

        this.botellaFinal.position.y += 0.1;
        return this.botellaFinal;
        
    }

    efecto(){
        return "botella";
    }

    



    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Botella }
