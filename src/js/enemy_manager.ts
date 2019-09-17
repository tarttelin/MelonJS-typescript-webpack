import me from './me';

class EnemyManager extends me.Container {
    private static readonly COLS: number = 9;
    private static readonly ROWS: number = 4;

    constructor() {
        super(0, 32);

        this.vel = 16;
    }

    createEnemies() {
        for(let i = 0; i < EnemyManager.COLS; i++) {
            for(let j = 0; j < EnemyManager.ROWS; j++) {
                this.addChild(me.pool.pull('enemy', i * 64, j * 64));
            }
        }
        this.updateChildBounds();
    }

    onActivateEvent() {
        let _this = this;
        this.timer = me.timer.setInterval(() => {
            let bounds = _this.childBounds;
            console.log(`bounds: ${bounds.right}, viewport ${me.game.viewport.width}`);

            if((_this.vel > 0 && (bounds.right + _this.vel) >= me.game.viewport.width) ||
                (_this.vel < 0 && (bounds.left + _this.vel) <= 0)) {
                _this.vel *= -1;
                _this.pos.y += 16;
                if (_this.vel > 0) {
                    _this.vel += 5;
                } else {
                    _this.vel -= 5;
                }
            } else {
                _this.pos.x += _this.vel;
            }
        }, 1000);
    }

    update(time: number) {
        super.update(time);
        this.updateChildBounds();
    }
    onDeactivateEvent() {
        me.timer.clearInterval(this.timer);
    }

    removeChildNow(child: any) {
        super.removeChildNow(child);
        this.updateChildBounds();
    }
}

export default EnemyManager;