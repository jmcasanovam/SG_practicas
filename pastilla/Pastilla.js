
import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js';

class Pastilla extends THREE.Object3D {
    constructor(geometria, punto, rotado, caducado) {
        super();

        this.caducado=caducado;
        this.tubo=geometria;
        this.path=geometria.parameters.path;
        this.radio=geometria.parameters.radius;
        this.segmentos=geometria.parameters.tubularSegments;
        this.t=punto;
        this.r=rotado*Math.PI/180;

        this.pastilla = this.createPastilla();
        this.pastilla.scale.set(0.8,0.8,0.8);
        
        this.pastilla.position.y+=this.radio;
    
        this.superficie = new THREE.Object3D();
        this.superficie.add(this.pastilla);
        
    
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

    setAngulo(valor) {
        this.movil.rotation.z = valor;
    }

    efecto(){
        if(this.caducado)return "pastilla caducada";
        else return "pastilla";
    }

    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Pastilla }
