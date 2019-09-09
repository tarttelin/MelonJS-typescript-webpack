import me from '../me';

class EnemyEntity extends me.Sprite {

    constructor(x: Number, y: Number, settings: any) {
        // save the area size as defined in Tiled
        let width = settings.width;

        // define this here instead of tiled
        settings.image = "wheelie_right";

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.framewidth = settings.width = 64;
        settings.frameheight = settings.height = 64;

        super(x, y, settings);

        // add a physic body
        this.body = new me.Body(this);
        // add a default collision shape
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        // configure max speed and friction
        this.body.setMaxVelocity(2, 6);
        this.body.setFriction(0.4, 0);
        // enable physic collision (off by default for basic me.Renderable)
        this.isKinematic = false;

        // set start / end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.pos.x = this.endX = x + width - this.width;
        // this.pos.x = x + width - this.width;

        // to remember which side we were walking
        this.walkLeft = false;

        // make it 'alive'
        this.alive = true;
    }

    update(dt: any) {
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
                this.body.force.x = this.body.maxVel.x;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
                this.body.force.x = -this.body.maxVel.x;
            }
            this.flipX(this.walkLeft);
        } else {
            this.body.force.x = 0;
        }
        // check & update movement
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

    onCollision(response: any, other: any) {
        if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
            // res.y > 0 means touched by something on the bottom
            // which mean at top position for this one
            if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
                this.flicker(750);
            }
            return false;
        }
        // Make all other objects solid
        return true;
    }
}

export default EnemyEntity;