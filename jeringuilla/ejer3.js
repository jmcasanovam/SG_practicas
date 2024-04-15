
import * as THREE from 'three'

class ejer3 extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    this.createGUI(gui,titleGui);

    const x = 0, y = 0.0001;    //declaro 2 variables, la y no puede ser 0 en revolucion

    //Haces la forma del perfil
    const jeringuilla = new THREE.Shape();
    jeringuilla.moveTo(x, y+0.21);      //te mueves sin dibujar
    jeringuilla.lineTo(x+0.02, y+0.21);
    jeringuilla.lineTo(x+0.02, y+0.205);
    jeringuilla.lineTo(x+0.0075, y+0.205);
    jeringuilla.lineTo(x+0.0075, y+0.18);
    jeringuilla.lineTo(x+0.02, y+0.18);
    jeringuilla.lineTo(x+0.02, y+0.07);
    jeringuilla.lineTo(x+0.01, y+0.07);
    jeringuilla.lineTo(x+0.01, y+0.04);
    jeringuilla.lineTo(x+0.001, y+0.04);
    jeringuilla.lineTo(x,y);

    var points = jeringuilla.extractPoints(6).shape;  //siempre se pone esto

    const geometry=new THREE.LatheGeometry(points);
    // const geometry = new THREE.ShapeGeometry(jeringuilla);
    const material = new THREE.MeshStandardMaterial( { color: 0xf5f5f5, side:THREE.DoubleSide, flatShading:false} );
    const mesh = new THREE.Mesh( geometry, material ) ;
    this.add( mesh );


  }
  
  createBase(tama) {
    // El nodo del que van a colgar la caja y los 2 conos y que se va a devolver
    var base = new THREE.Object3D();
    // Cada figura, un Mesh, está compuesto de una geometría y un material
    var cajaBase = new THREE.Mesh (new THREE.BoxGeometry (tama,tama*0.08,tama*0.2), this.material);
    cajaBase.position.y = tama*0.04;
    // La componente geometría se puede compartir entre varios meshes
    var geometriaPivote = new THREE.ConeGeometry (tama*0.05, tama*0.12);
    var pivote1 = new THREE.Mesh (geometriaPivote, this.material);
    var pivote2 = new THREE.Mesh (geometriaPivote, this.material);
    // Se posicionan los pivotes con respecto a la base
    pivote1.position.set (tama*0.45, tama*0.14, tama*0.05);
    pivote2.position.set (tama*0.45, tama*0.14, -tama*0.05);
    base.add(cajaBase);
    base.add(pivote1);
    base.add(pivote2);
    return base;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
      rotacion : 0
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder.add (this.guiControls, 'rotacion', -0.125, 0.2, 0.001)
      .name ('Apertura : ')
      .onChange ( (value) => this.setAngulo (-value) );
  }
  
  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { ejer3 }
