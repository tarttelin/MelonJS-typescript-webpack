import me from '../me';
import game from '../game';
import EnemyManager from '../enemy_manager';
import HUD from '../entities/HUD';

class PlayScreen extends me.Stage {
    enemyManager: EnemyManager;
    onResetEvent() {
        // reset the score
        game.data.score = 0;
        game.playScreen = this;
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
        me.game.world.addChild(me.pool.pull('player'), 1);

        this.enemyManager = new EnemyManager();
        this.enemyManager.createEnemies();
        me.game.world.addChild(this.enemyManager, 2);

        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        me.input.bindKey(me.input.KEY.A, 'left');
        me.input.bindKey(me.input.KEY.D, 'right');
        me.input.bindKey(me.input.KEY.SPACE, 'shoot', true);

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new HUD();
        me.game.world.addChild(this.HUD);
    }

    onDestroyEvent() {
        me.input.unbindKey(me.input.KEY.LEFT, 'left');
        me.input.unbindKey(me.input.KEY.RIGHT, 'right');
        me.input.unbindKey(me.input.KEY.A, 'left');
        me.input.unbindKey(me.input.KEY.D, 'right');
        me.input.unbindKey(me.input.KEY.SPACE);
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
}

export default PlayScreen;