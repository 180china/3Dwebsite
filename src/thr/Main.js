import background from '../texture/background.jpg';
import xpos from '../texture/nebula-xpos.jpg';
import xneg from '../texture/nebula-xneg.jpg';
import ypos from '../texture/nebula-ypos.jpg';
import yneg from '../texture/nebula-yneg.jpg';
import zpos from '../texture/nebula-zpos.jpg';
import zneg from '../texture/nebula-zneg.jpg';

import {Particles} from './Particles.js';
import {Boid} from './Boid.js';
import {Bird} from './obj/Bird.js';

function Main() {

  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  const SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2;
  const SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

  let _this = this;

  let boids=[];
  let boid;

  let birds=[];
  let bird;

  this.init = function () {

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let aspect = windowWidth / windowHeight;

    this.camera = new THREE.PerspectiveCamera(75, aspect, 1, 2000);
    this.camera.position.set(0, 0, 200);

    this.lookAtObj=new THREE.Vector3(0,0,0);
    this.camera.lookAt(this.lookAtObj);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('.three-player canvas'),
      alpha: true
    });
    this.renderer.setSize(windowWidth, windowHeight);

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x555555));

    // this.controls =new THREE.OrbitControls(this.camera,document.querySelector('.three-player'));
    // this.scene.add( new THREE.AxisHelper( 20 ) );

    let map = new THREE.TextureLoader().load(background);
    map.wrapT = THREE.RepeatWrapping;
    let skyboxMaterial = new THREE.MeshBasicMaterial({
      map: map,
      side: THREE.BackSide
    });
    let skyBox = new THREE.Mesh(new THREE.SphereGeometry(1000, 20, 20), skyboxMaterial);
    this.scene.add(skyBox);
    //

    //添加背景效果
    /*let imageURLs = [xpos,xneg,ypos,yneg,zpos,zneg];
    let materials = [];
    for (var i = 0; i < 6; ++i) {
      materials.push(new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(imageURLs[i]),
        side:THREE.BackSide,
        overdraw: true
      }));
    }
    let skyBox = new THREE.Mesh(new THREE.CubeGeometry(500, 500, 500),new THREE.MeshFaceMaterial(materials));
    this.scene.add(skyBox);*/
    TweenMax.to(skyBox.rotation,300,{y:THREE.Math.degToRad(360),repeat:-1,ease:Power0.easeNone});

    this.particles = new Particles();
    this.particles.init();
    this.scene.add(this.particles);

    // let circle = new THREE.Mesh(new THREE.CircleBufferGeometry(1, 32), new THREE.MeshBasicMaterial({color: 0xffff00}));
    // this.scene.add(circle);
    // circle.position.x= Math.cos(Math.PI / 180 * 0)*5;
    // circle.position.z= Math.sin(Math.PI / 180 * 0)*5;
    // circle.position.x= 0;
    // circle.position.z= 0;
    // circle.name = 'circle';

    for ( var i = 0; i < 200; i ++ ) {

      boid = boids[ i ] = new Boid();
      boid.position.x = Math.random() * 400 - 200;
      boid.position.y = Math.random() * 400 - 200;
      boid.position.z = Math.random() * 400 - 200;
      boid.velocity.x = Math.random() * 2 - 1;
      boid.velocity.y = Math.random() * 2 - 1;
      boid.velocity.z = Math.random() * 2 - 1;
      boid.setAvoidWalls( true );
      boid.setWorldSize( 500, 500, 400 );

      bird = birds[ i ] = new THREE.Mesh( new Bird(), new THREE.MeshBasicMaterial( { color:Math.random() * 0xffffff, side: THREE.DoubleSide } ) );
      bird.phase = Math.floor( Math.random() * 62.83 );
      this.scene.add( bird );
    }

    document.addEventListener( 'mousemove', (event)=>{

      let vector = new THREE.Vector3( event.clientX - SCREEN_WIDTH_HALF, - event.clientY + SCREEN_HEIGHT_HALF, 0 );

      for ( var i = 0, il = boids.length; i < il; i++ ) {

        boid = boids[ i ];

        vector.z = boid.position.z;

        boid.repulse( vector );

      }

    }, false );

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

    //*****注意！如果使用了THREE.OrbitControls插件，会冲突。
    this.camera.lookAt(this.lookAtObj);

    if(this.controls)this.controls.update();
    if(this.particles)this.particles.update();

    for ( var i = 0, il = birds.length; i < il; i++ ) {

      boid = boids[ i ];
      boid.run( boids );

      bird = birds[ i ];
      bird.position.copy( boids[ i ].position );

      let color = bird.material.color;
      color.r = color.g = color.b = ( 500 - bird.position.z ) / 1000;

      bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
      bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );

      bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
      bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;

    }
  };

  this.show = function (type) {
    TweenMax.killTweensOf(this.lookAtObj);
    TweenMax.to(this.lookAtObj, 3, {
      x: Math.cos(THREE.Math.degToRad(360*Math.random()))*1000,
      y: 0,
      z: Math.sin(THREE.Math.degToRad(360*Math.random()))*1000,
      onUpdate:()=>{
        //this.camera.lookAt(this.lookAtObj);
      },
      onComplete:()=>{
        //console.log(TweenMax.getTweensOf(this.lookAtObj));
        //console.log(this.lookAtObj);
        //this.camera.lookAt(new THREE.Vector3(8,0,8));
      }
    });
  }
}

export {Main}
