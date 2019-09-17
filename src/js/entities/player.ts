import me from '../me';
import Laser from './laser';

class PlayerEntity extends me.Entity {

    constructor(x: Number, y: Number, settings: any) {
        let image = me.loader.getImage('player');
        super(
            me.game.viewport.width / 2 - image.width / 2,
            me.game.viewport.height - image.height - 20,
            {
                image : image,
                width : 32,
                height : 32
            }
        );
        this.velx = 450;
        this.maxX = me.game.viewport.width - this.width;
    }

    update(dt: any) {
        super.update(dt);
        if(me.input.isKeyPressed('left')) {
            this.pos.x -= this.velx * dt / 1000;
        }

        if(me.input.isKeyPressed('right')) {
            this.pos.x += this.velx * dt / 1000;
        }

        this.pos.x = me.Math.clamp(this.pos.x, 0, this.maxX);

        if (me.input.isKeyPressed('shoot')) {
            me.game.world.addChild(me.pool.pull('laser', this.pos.x - Laser.width, this.pos.y - Laser.height));
        }
        
        return true;
    }

    onCollision(response: any, other: any) {
        // Make all other objects solid
        return true;
    }
}

export default PlayerEntity;