import * as THREE from 'three'
import EventEmitter from './Utils/EventEmitter.js'
import Experience from './Experience.js'

export default class Mouse extends EventEmitter {
    constructor() {
        super()

        // Setup
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.currentIntersect = false

        //temp
        this.model = this.experience.world.fox.model
        this.floor = this.experience.world.floor.mesh

        this.mousePos = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()


        //mousemove event
        window.addEventListener('mousemove', (event) => {
            this.mousePos.x = event.clientX / this.sizes.width * 2 - 1
            this.mousePos.y = - (event.clientY / this.sizes.height) * 2 + 1

            this.trigger('mousemove')
        })

        window.addEventListener('click', () => {
            if (this.currentIntersect) {
                //change the animation
                this.model = this.experience.world.fox.nextAnimation()
            }
        })
    }

    update() {

        this.raycaster.setFromCamera(this.mousePos, this.camera)

        // Test intersect with a model
        if (this.floor) {


            const modelIntersects = this.raycaster.intersectObject(this.floor)

            if (modelIntersects.length) {
                this.currentIntersect = true

            }
            else {
                this.currentIntersect = false
            }
        }
    }
}