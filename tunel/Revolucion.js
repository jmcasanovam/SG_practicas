
import * as THREE from 'three'

class Revolucion extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        this.createGUI(gui, titleGui);

        // //Creo una capsula(radio, altura, segmentos)
        // const geometry = new THREE.CapsuleGeometry(1, 1, 4, 8);
        // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        // const capsule = new THREE.Mesh(geometry, material);
        // this.add(capsule);

        var shape = new THREE.Shape();
        //Se crea el contorno exterior
        shape.moveTo(-10, -15);
        shape.lineTo(-10, 15);
        shape.bezierCurveTo(-5, 0, 5, 0, 10, 15);
        shape.splineThru([new THREE.Vector2(12, 15), new THREE.Vector2(8, -5), new THREE.Vector2(10, -15)]);
        shape.quadraticCurveTo(0, -10, -10, -15);
        //Agujeros de ojos y boca
        var hole = new THREE.Shape();
        hole.absellipse(-4, -1, 2, 3, 0, Math.PI * 2, true, 0);
        shape.holes.push(hole);
        //El otro ojo cono otra elipse de manera similar, ahora la boca
        hole = new THREE.Shape();
        hole.absarc(0, -9, 2, Math.PI * 2, Math.PI, true);
        shape.holes.push(hole);

        var options1 = { depth: 1, steps: 2, bevelEnabled: false };
        var geometry1 = new THREE.ExtrudeGeometry(shape, options1);
        var material1 = new THREE.MeshNormalMaterial();

        //Se crea el mesh a partir de la geometría y el material
        var revolucion = new THREE.Mesh(geometry1, material1);
        //Se añade el mesh al grafo de escena
        //this.add(revolucion); -> Habria que descomentarlo para crear el dibujo de la Cara

        //Creo la jeringuilla
        const altura = 0.1;
        const anchura = 0.05;

        var shape2 = new THREE.Shape();
        //Se crea el contorno exterior
        shape2.moveTo(0, 0);
        shape2.lineTo(0, altura);
        shape2.lineTo(anchura, altura);
        shape2.lineTo(anchura, altura - 0.02);
        shape2.lineTo(0.02, altura - 0.02);
        shape2.lineTo(0.02, altura - 0.04);
        shape2.lineTo(anchura, altura - 0.04);
        shape2.lineTo(anchura, altura - 0.06);
        shape2.lineTo(0, 0);


        // const geometry2 = new THREE.ShapeGeometry(shape2);
        // const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const mesh = new THREE.Mesh(geometry2, material2);
        // this.add(mesh);

        //Hago la revolución con el shape2
        // var objetoRevolucion = new THREE.Mesh(new THREE.LatheGeometry(shape2.getPoints(), 20), material1);
        // this.add(objetoRevolucion);
        var points = shape2.extractPoints().shape; //shape2.getPoints();
        var geometry2 = new THREE.LatheGeometry(points, 20);
        var material2 = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: false, shadowFlatShading: false});
        var objetoRevolucion = new THREE.Mesh(geometry2, material2, Math.PI *2);
        this.add(objetoRevolucion);

        


        



    }

    createBase(tama) {
        // El nodo del que van a colgar la caja y los 2 conos y que se va a devolver
        var base = new THREE.Object3D();
        // Cada figura, un Mesh, está compuesto de una geometría y un material
        var cajaBase = new THREE.Mesh(new THREE.BoxGeometry(tama, tama * 0.08, tama * 0.2), this.material);
        cajaBase.position.y = tama * 0.04;
        // La componente geometría se puede compartir entre varios meshes
        var geometriaPivote = new THREE.ConeGeometry(tama * 0.05, tama * 0.12);
        var pivote1 = new THREE.Mesh(geometriaPivote, this.material);
        var pivote2 = new THREE.Mesh(geometriaPivote, this.material);
        // Se posicionan los pivotes con respecto a la base
        pivote1.position.set(tama * 0.45, tama * 0.14, tama * 0.05);
        pivote2.position.set(tama * 0.45, tama * 0.14, -tama * 0.05);
        base.add(cajaBase);
        base.add(pivote1);
        base.add(pivote2);
        return base;
    }

    createGUI(gui, titleGui) {
        // Controles para el movimiento de la parte móvil
        this.guiControls = {
            rotacion: 0
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder(titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        folder.add(this.guiControls, 'rotacion', -0.125, 0.2, 0.001)
            .name('Apertura : ')
            .onChange((value) => this.setAngulo(-value));
    }

    createMovil(tama) {
        // Se crea la parte móvil
        var cajaMovil = new THREE.Mesh(
            new THREE.BoxGeometry(tama, tama * 0.12, tama * 0.2),
            this.material
        );
        cajaMovil.position.set(-tama * 0.45, tama * 0.06, 0);

        var movil = new THREE.Object3D();
        // IMPORTANTE: Con independencia del orden en el que se escriban las 2 líneas siguientes, SIEMPRE se aplica primero la rotación y después la traslación. Prueba a intercambiar las dos líneas siguientes y verás que no se produce ningún cambio al ejecutar.    
        movil.rotation.z = this.guiControls.rotacion;
        movil.position.set(tama * 0.45, tama * 0.2, 0);
        movil.add(cajaMovil);
        return movil;
    }

    setAngulo(valor) {
        this.movil.rotation.z = valor;
    }

    update() {
        // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
    }
}

export { Revolucion }
