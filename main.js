// import our three.js reference
const THREE = require( 'three' )

const app = {
  init() {
    this.population = 20
    this.height = 2
    this.width = 5
    
    this.geometries = []
    this.meshes = []
    
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,  // FOV 
      window.innerWidth / window.innerHeight, // aspect ratio
      .1,  // near plane
      1000 // far plane
    )
    
    this.camera.position.z = 5
    
	this.createRenderer()
    this.createLights()
    
    const material = new THREE.MeshPhongMaterial({ color:0x009999 })
    const materialDead = new THREE.MeshPhongMaterial({ color:0x000000 })

    
    // MAKE MULTIPLE IN A LOOP
    for (let i = 0; i < this.width; i++) {
      this.geometries[i] = new THREE.SphereGeometry( .5,.5,.5 )
      this.meshes[i] = new THREE.Mesh( this.geometries[i], material )
    }
    
    // add all to scene
    for (let i = 0; i < this.width; i++) {
      this.scene.add ( this.meshes[i] )
    }
    
  //////// 2D doesnt work
//    for (let i = 0; i < this.width; i++) {
//      this.geometries[i] = []
//      this.meshes[i] = []
//      
//      for (let j = 0; i < this.height; j++){
//        this.geometries[i][j] = new THREE.BoxGeometry( .5,.5,.5 )
//        this.meshes[i][j] = new THREE.Mesh( this.geometries[i][j], material )
//      }
//    }
    
    // add all to scene
//    for (let i = 0; i < this.width; i++) {
//      for (let j = 0; j < this.height; j++){
//        this.scene.add ( this.meshes[i][j] )
//      }
//    }
    
    
    this.render()
  },
  
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
	  document.body.appendChild( this.renderer.domElement )
    this.render = this.render.bind( this )
	},
  
  createLights() {
    this.pointLight = new THREE.PointLight( 0xffffff, .5 )
    this.pointLight.position.z = 50
    this.scene.add( this.pointLight )
    
    this.ambLight = new THREE.AmbientLight( 0x404040 )
    this.scene.add( this.ambLight )
    
  },
  
  render() {
    window.requestAnimationFrame( this.render )
    
    // change positions
    for (let i = 0; i < this.width; i++) {
      if (i != 0) {
        this.meshes[i].position.x = this.meshes[i - 1].position.x + 1.1
        //this.meshes[i][j].position.y = j
      }
    }
    
    
//    for (let i = 0; i < this.width; i++) {
//      for (let j = 0; j < this.height; j++){
//        if (i != 0) {
//          this.meshes[i][j].position.x = this.meshes[i - 1][j].position.x + 1
//          //this.meshes[i][j].position.y = j
//        }
//      }
//    }
    
    
    
    this.renderer.render( this.scene, this.camera )  
  }
}

window.onload = ()=> app.init()