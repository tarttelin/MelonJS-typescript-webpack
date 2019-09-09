import game from '../game';
import me from '../me';

/**
 * a basic HUD item to display score
 */
class ScoreItem extends me.Renderable {
    constructor(x: Number, y: Number) {
        super(x, y, 10, 10);

        // create the font object
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        // font alignment to right, bottom
        this.font.textAlign = 'right';
        this.font.textBaseline = 'bottom';

        // local copy of the global score
        this.score = -1;
    }

    update() {
        // we don't do anything fancy here, so just
        // return true if the score has been updated

        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    }

    draw(renderer: any) {
        this.font.draw(renderer, game.data.score, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
    }

}

class HUD extends me.Container {

    constructor() {
        super();
        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new ScoreItem(-10, -10));
    }
}

export default HUD;