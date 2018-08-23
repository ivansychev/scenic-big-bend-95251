import { distance, resolveCollision } from '../utils/index'
import { c, mouse } from "../Stage/index"

export class Particle{
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.velocity = {x: Math.random() + 1.5, y: Math.random() + 1.5}
        this.radius = radius
        this.color = color
        this.mass = 1
        this.opacity = 0
    }

    update(particles) {
        this.draw()

        for(let i = 0; i < particles.length; i++)
        {
            if(this === particles[i]) continue;

            if(distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0)
            {
                resolveCollision(this, particles[i])
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth){
            this.velocity.x = -this.velocity.x
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight){
            this.velocity.y = -this.velocity.y
        }

        if(distance(mouse.x, mouse.y, this.x, this.y) < 150 && this.opacity < 0.2) {
            this.opacity += 0.02
        }else if(this.opacity > 0){
            this.opacity -= 0.02

            this.opacity = Math.max(0, this.opacity)
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.save()
        c.globalAlpha = this.opacity
        c.fillStyle = this.color
        c.fill()
        c.restore()
        c.strokeStyle = this.color
        c.stroke()
        c.closePath()
    }
}

export const particles = [];