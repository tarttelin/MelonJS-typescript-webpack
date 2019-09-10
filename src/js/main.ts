declare var require: any;
require('../css/main.css');
import me from './me';
import EnemyEntity from './entities/enemy';
import CoinEntity from './entities/coin';
import PlayerEntity from './entities/player';
import PlayScreen from './screens/play';
import TitleScreen from './screens/title';
import resources from './resources';


class Bootstrap {

    constructor() {
        // Initialize the video.
        // Note: force using Canvas for rendering as the tutorials don't work on WebGL
        if (!me.video.init(640, 480, {wrapper : "screen", scale : "flex-width", renderer: me.video.CANVAS })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.addEventListener('load', () => {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    }

    loaded() {
        me.state.set(me.state.MENU, new TitleScreen());
        me.state.set(me.state.PLAY, new PlayScreen());

        // set a global fading transition for hte screen
        me.state.transition('fade', '#FFFFFF', 250);

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", PlayerEntity);
        me.pool.register('CoinEntity', CoinEntity);
        me.pool.register('EnemyEntity', EnemyEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        // map Up Arrow and Space for jump
        me.input.bindKey(me.input.KEY.UP, 'jump', true);
        me.input.bindKey(me.input.KEY.SPACE, 'jump', true);

        // Start the game.
        me.state.change(me.state.MENU);
    }

    static boot() {
        const bootstrap = new Bootstrap();

        // Mobile browser hacks
        if (me.device.isMobile) {
            // Prevent the webview from moving on a swipe
            window.document.addEventListener("touchmove", function (e) {
                e.preventDefault();
                window.scroll(0, 0);
                return false;
            }, false);

            me.event.subscribe(me.event.WINDOW_ONRESIZE, () => {
                window.scrollTo(0, 1);
            });
        }

        return bootstrap;
    }
}

window.onload = () => {
    Bootstrap.boot();
};
