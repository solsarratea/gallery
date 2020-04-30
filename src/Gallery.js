import React, { Component } from 'react'
import * as THREE from 'three'
const OrbitControls = require('three-orbit-controls')(THREE)

// to do:
// 1. set up position distributon for individual galleries
// 2. animate each piece within an individual gallery (customizing rooms)
// 3. click to enter inside room
// 4. (?) refactor into react hooks

class Gallery extends Component {
  constructor (props) {
    super(props)
    this.animate = this.animate.bind(this)
    this.addCube = this.addCube.bind(this)
    this.initializeCamera = this.initializeCamera.bind(this)
    this.initializeOrbits = this.initializeOrbits.bind(this)
    this.rooms = []
  }

  componentDidMount () {
    const width = window.innerWidth
    const height = window.innerHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1469)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    this.initializeOrbits()
    this.initializeCamera()

    this.camera.position.set(10, 50, 514)
    this.newZoom = 0

    for (let i = 0; i < 10; i++) {
      this.addCube(i)
      this.rooms[i].position.set(0, i * 10, 10)
      console.log('i', i)
    }

    this.scene.add(this.cube)
    this.animate()
  }
  componentWillUnmount () {
    cancelAnimationFrame(this.frameId)
    this.mount.removeChild(this.renderer.domElement)
  }
  initializeOrbits () {
    this.controls.rotateSpeed = 1.0
    this.controls.zoomSpeed = 1.2
    this.controls.panSpeed = 0.8
  }
  initializeCamera () {
    this.camera.position.x = 0
    this.camera.position.y = 150
    this.camera.position.z = 400
  }
  animate () {
    var zoom = this.controls.target.distanceTo(this.controls.object.position)
    // if (this.newZoom != zoom) {
    //   // console.log(zoom)
    //   this.newZoom = zoom
    // }
    this.frameId = window.requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
  }

  addCube (index) {
    var geometry = new THREE.CubeGeometry(500, 500, 500)
    var texture = new THREE.TextureLoader().load('images/ten_largest_no3.jpg')

    var materialArray = []
    for (var i = 0; i < 6; i++)
      materialArray.push(
        new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide
        })
      )
    var galleryMaterial = new THREE.MeshFaceMaterial(materialArray)

    this.rooms[index] = new THREE.Mesh(geometry, galleryMaterial)
    this.scene.add(this.rooms[index])
  }

  render () {
    return (
      <div>
        <div
          id='boardCanvas'
          style={{ width: '80vw', height: '40vw' }}
          ref={mount => {
            this.mount = mount
          }}
        />
      </div>
    )
  }
}
export default Gallery

// export default function Gallery () {
//   return (
//     <div>
//       <h1>I work</h1>
//       <Gallery />
//     </div>
//   )
// }
