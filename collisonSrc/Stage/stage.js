import { distance, randomIntFromRange, randomColor } from '../utils/index'
import { particles, Particle } from "../Particle/index"

const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

export const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

/*addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})*/

export const init = () => {
    for(let i=0;i<150;i++){
        const radius = 15
        const color = randomColor()
        let x = randomIntFromRange(radius, canvas.width - radius)
        let y= randomIntFromRange(radius, canvas.height - radius)

        if (i !==0 ){
            for(let j = 0; j < particles.length; j++){
                if(distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0)
                {
                    x = randomIntFromRange(radius, canvas.width - radius)
                    y= randomIntFromRange(radius, canvas.height - radius)

                    j = -1;
                }
            }
        }

        particles.push(new Particle(x, y, radius, color))
    }
}

export const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle=>{
        particle.update(particles)
    })

}
