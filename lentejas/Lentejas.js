
import * as THREE from 'three';

class Lentejas extends THREE.Object3D {
    constructor(geometria, punto, rotado) {
        super();  
        this.tubo=geometria;
        this.path=geometria.parameters.path;
        this.radio=geometria.parameters.radius;
        this.segmentos=geometria.parameters.tubularSegments;
        this.t=punto;
        this.r=rotado*Math.PI/180;

        this.lentejas=this.crearLentejas();

        this.lentejas.position.y+=this.radio+0.05;
    
        this.superficie = new THREE.Object3D();
        this.superficie.add(this.lentejas);
        
    
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
        return this.platoLentejas;
    }

    efecto(){
        return "lentejas";
    }

    
}

export { Lentejas }
