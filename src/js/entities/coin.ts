import me from '../me';
import game from '../game';

class CoinEntity extends me.CollectableEntity {

    constructor(x: Number, y: Number, settings: any) {
        super(x, y, settings);
    }

    onCollision(response: any, other: any) {
        // do something when collected

        // play coin collected sound
        me.audio.play('cling');
        // give some score
        game.data.score += 250;
        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        // remove it
        me.game.world.removeChild(this);

        return false;
    }
}

export default CoinEntity;