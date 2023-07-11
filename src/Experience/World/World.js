import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
        })

    }

    update() {
        if (this.fox)
            this.fox.update()
        if (this.fox) {
            let speed = 0
            switch (this.fox.animation.actions.current) {
                case this.fox.animation.actions.idle:
                    speed = 0
                    // console.log('idle')
                    break

                case this.fox.animation.actions.walking:
                    speed = 1
                    //console.log('walking')
                    break

                case this.fox.animation.actions.running:
                    speed = 1.7
                    //console.log('running')
                    break
            }
            this.floor.mesh.rotation.x += -Math.PI*0.002*speed
        }


    }


}