// import our three.js reference
const THREE = require( 'three' )

const app = {
  init() {
    this.debug = true
    this.once = false
    this.gridSize = 20
    
    this.geometries = []
    this.meshes = []
    
    this.currentGrid = []
    this.nextGrid = []
    this.liveNeighborMap = []
    
    // Asssign random values to each cell initially 
    for (let i = 0; i < this.gridSize; i++) {
        this.currentGrid[i] = []
        this.nextGrid[i] = []

        for (let j = 0; j < this.gridSize; j++) {
            this.currentGrid [i][j] = Math.random() > .5 ? 1 : 0
            this.nextGrid[i][j] = 0
        }
    }
    
    
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,  // FOV 
      window.innerWidth / window.innerHeight, // aspect ratio
      .1,  // near plane
      1000 // far plane
    )
    
    this.camera.position.z = 5
    this.camera.position.x = 2.5
    this.camera.position.y = 1
    
	this.createRenderer()
    this.createLights()
    
    const material = new THREE.MeshPhongMaterial({ color:0x009999 })
    const materialDead = new THREE.MeshPhongMaterial({ color:0x404040 })
    
    // Make grid of geometry
    for (let i = 0; i < this.gridSize; i++) {
      this.geometries[i] = []
      this.meshes[i] = []
      
      for ( let j = 0; j < this.gridSize; j++ ){
        this.geometries[i][j] = new THREE.IcosahedronGeometry( .5, 0 )
        if (this.currentGrid[i][j] == 0)
          this.meshes[i][j] = new THREE.Mesh( this.geometries[i][j], materialDead )
        if (this.currentGrid[i][j] == 1)
          this.meshes[i][j] = new THREE.Mesh( this.geometries[i][j], material )
      }
    }
    
    // add all to scene
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++){
        this.scene.add ( this.meshes[i][j] )
      }
    }
    
    
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
    //this.animate();
    
    // change positions
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++){
        this.meshes[i][j].position.y = j
        this.meshes[i][j].rotation.x += .005
        this.meshes[i][j].rotation.y += .005
        
        // change to correct color
        if ( this.currentGrid[i][j] == 0 )  // if alive
          this.meshes[i][j].material.color.setHex( 0x999900 )
        else if ( this.currentGrid[i][j] == 1 ) // if dead
           this.meshes[i][j].material.color.setHex( 0x404040 )
        
        if (i == 0) {
          this.meshes[i][j].position.x = 0
          continue
        }
        this.meshes[i][j].position.x = this.meshes[i - 1][j].position.x + 1
          
      }
    }
    
    
    
    this.renderer.render( this.scene, this.camera )  
  }
}

window.onload = ()=> app.init()