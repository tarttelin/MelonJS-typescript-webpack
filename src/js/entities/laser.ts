import me from '../me';
import game from "../game";

class Laser extends me.Entity {
    static height = 28;
    static width = 5;

    constructor(x: number, y: number) {
        super(x, y, { width: Laser.width, height: Laser.height});
        this.z = 5;
        this.body.setVelocity(0, 300);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable = new LaserRenderer();
        this.alwayUpdate = true;
    }

    update(time: number) {
        this.body.vel.y -= this.body.accel.y * time / 1000;
        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }
        this.body.update();
        me.collision.check(this);
        return true;
    }

    onCollision(res: any, other: any) {
        if(other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            console.log('enemy hit');
            me.game.world.removeChild(this);
            game.playScreen.enemyManager.removeChild(other);
            return false;
        }
    }
}

class LaserRenderer extends me.Renderable {
    constructor() {
        super(0, 0, Laser.width, Laser.height);
    }

    destroy() {}

    draw(renderer: any) {
        let color = renderer.getColor();
        renderer.setColor('#5EFF7E');
        renderer.fillRect(0, 0, this.width, this.height);
        renderer.setColor(color);
    }
}

export default Laser;