import img from '../texture/background.jpg';

function Main() {
  let _this = this;
  // let currentObj = null;

  this.init = function () {

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let aspect = windowWidth / windowHeight;

    this.lookAtObj=new THREE.Vector3(0,0,0);
    this.camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(this.lookAtObj);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('.three-player canvas'),
      alpha: true
    });
    this.renderer.setSize(windowWidth, windowHeight);

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x555555));

    // this.controls =new THREE.OrbitControls(this.camera,document.querySelector('.three-player'));
    this.scene.add( new THREE.AxisHelper( 20 ) );

    let map = new THREE.TextureLoader().load(img);
    map.wrapT = THREE.RepeatWrapping;
    let skyboxMaterial = new THREE.MeshBasicMaterial({
      map: map,
      side: THREE.BackSide
    });
    let skyBox = new THREE.Mesh(new THREE.SphereGeometry(500, 20, 20), skyboxMaterial);
    this.scene.add(skyBox);

    let cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({
      color: 0xff0000
    }));
    this.scene.add(cube);
    cube.position.x = Math.cos(Math.PI / 180 * -90)*5;
    cube.position.z= Math.sin(Math.PI / 180 * -90)*5;
    cube.name='cube';

    let circle = new THREE.Mesh(new THREE.CircleBufferGeometry(1, 32), new THREE.MeshBasicMaterial({color: 0xffff00}));
    this.scene.add(circle);
    circle.position.x= Math.cos(Math.PI / 180 * 0)*5;
    circle.position.z= Math.sin(Math.PI / 180 * 0)*5;
    circle.name = 'circle';

    let cone = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 32), new THREE.MeshBasicMaterial({color: 0xff0000}));
    this.scene.add(cone);
    cone.position.x= Math.cos(Math.PI / 180 * 180)*5;
    cone.position.z= Math.sin(Math.PI / 180 * 180)*5;
    cone.name = 'cone';

    // ['cube','circle','cone'].forEach((value,index,array)=>{
    //   let mesh=this.meshFactory(value);
    // });

    // let torus = new THREE.Mesh(new THREE.TorusGeometry(1, .4, 8, 50), new THREE.MeshBasicMaterial({color: 0xffff00}));
    // this.scene.add(torus);
    // torus.name = 'torus';
    // torus.visible = false;

    function animate() {
      requestAnimationFrame(animate);
      _this.render();
    }

    animate();
  }

  this.meshFactory=function(type){
    let g;
    let m;
    switch (type){
      case 'cube':

    }
    let mesh=new Mesh(g,m);
    return mesh;
  }

  this.render = function () {
    this.renderer.render(this.scene, this.camera);
    if(this.controls)this.controls.update();
  };

  this.show = function (type) {
    let x=0;
    let y=0;
    let z=0;
    if(type!==''){
      let currentObj = this.scene.getObjectByName(type);
      x=currentObj.position.x;
      y=currentObj.position.y;
      z=currentObj.position.z;
    }

    TweenMax.to(this.lookAtObj, 2.5, {
      x: x,
      y: y,
      z: z,
      onUpdate:()=>{
        this.camera.lookAt(this.lookAtObj);
      }
    });
  }
}

export {Main}
