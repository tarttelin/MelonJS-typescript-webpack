import me from '../me';

class TitleScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // title screen
        var backgroundImage = new me.Sprite(0, 0, {
            image: me.loader.getImage('title_screen'),
        });

        // position and scale to fit with the viewport size
        backgroundImage.anchorPoint.set(0, 0);
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

        // add to the world container
        me.game.world.addChild(backgroundImage, 1);

        // add a new renderable component with the scrolling text
        me.game.world.addChild(new ScrollText(), 2);

        // change to play state on press Enter or click / tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action: string, keyCode: any, edge: any) {
            if (action === "enter") {
                // play something on tap / enter
                // this will unlock audio on mobile devices
                me.audio.play('cling');
                me.state.change(me.state.PLAY);
            }
        });
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
    }
}

class ScrollText extends me.Renderable {

    constructor() {
        super(0, 0, me.game.viewport.width, me.game.viewport.height);

        // font for the scrolling text
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({scrollerpos: -1000 }, 5000).onComplete(this.scrollover.bind(this)).start();

        this.scroller = "A SMALL STEP BY STEP TUTORIAL FOR A PLATFORMER GAME";
        this.scrollerpos = 1000;
    }

    // some callback for the tween objects
    scrollover() {
        // reset to default value
        this.scrollerpos = 1000;
        this.scrollertween.to({scrollerpos: -1000 }, 5000).onComplete(this.scrollover.bind(this)).start();
    }

    update(dt: any) {
        return true;
    }

    draw(renderer: any) {
        this.font.draw(renderer, "PRESS ENTER TO PLAY", 340, 240);
        this.font.draw(renderer, this.scroller, this.scrollerpos, 440);
    }

    onDestroyEvent() {
        // just in case
        this.scrollertween.stop();
    }
}

export default TitleScreen;