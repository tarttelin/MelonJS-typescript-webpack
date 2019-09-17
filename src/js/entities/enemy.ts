import me from '../me';

class EnemyEntity extends me.Entity {
    constructor(x: Number, y: Number) {
        super(x, y, {
            image: 'ships',
            width: 32,
            height: 32
        });
        this.chooseShipImage();
        this.body.setVelocity(0, 0);
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
    }

    chooseShipImage() {
        let frame = ~~(Math.random() * 3);
        this.renderable.addAnimation('idle', [frame], 1);
        this.renderable.setCurrentAnimation('idle');
    }

    update(time: number) {
        super.update(time);
        this.body.update();
        return true;
    }
}

export default EnemyEntity;