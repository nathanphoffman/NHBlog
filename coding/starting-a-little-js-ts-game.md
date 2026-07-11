<!-- date posted: 2026-02-19 -->
# Starting a little JS/TS game

Posted on Medium: 2026-02-19

![](/images/1-lR1rl1iX99N2LlnKGGBdJw.png)

*An image from my game, right now clicking around will move the character and there is some basic collision setup for the trees.*

For the last couple weeks I have been working on a small game project that may become larger depending on how far I get. Before I get too far into it I wanted to comment on my process so this can serve as a design journal and I figure it might help others who are interested in doing the same thing.

For the game concept I am trying to create a very basic fantasy CRPG like game in the spirit of games like Baldurs Gate but MUCH simpler, with retro 8-bit style graphics and a chess-like board for making movement easier. I am also using community assets to help with this.

While I have used web engines in the past like PhaserJS, my goal here is to create the engine from scratch using canvases and JavaScript. The approach I settled on is to use different canvas layers that are overlaid on top of one another so that one canvas being rerendered does not impact any other canvas. The canvases will each have JS logic associated with them and that independent logic will communicate with a basic event system I put together. The events will be fired based on user inputs, but also based on a NEXT_FRAME event that instructs the layers whenever a new frame should render:

```
  const gameLoop = () => {

    selectEvent("NEXT_FRAME").executeEvent({});

    // start the game at approximately 4fps
    requestAnimationFrame(() => setTimeout(gameLoop, 250));
  }

  gameLoop();
```

The event system this refers to is something I threw together:

```
export type Listener<T extends object> = (signature: T) => void;

type EventRegistry = { [key in EventName]?: [Listener<any>] };
let EVENT_REGISTRY: EventRegistry = {};

export function selectEvent<T extends object>(eventName: EventName) {

    const event = Object.keys(EVENT_REGISTRY).find((_eventName) => _eventName === eventName);

    return {
        onEvent(listener: Listener<T>) {

            if (!event) {
                EVENT_REGISTRY[eventName] = [listener];
            }
            else {
                EVENT_REGISTRY[eventName]?.push(listener);
            }
        },

        executeEvent(obj: object) {
            if (!event) throw `Event ${event} is not being listened to`;

            const events = EVENT_REGISTRY[event as EventName];
            setTimeout(() => events?.forEach(event => event(obj)), 1);
        }
    }
```

So far these are the different canvases that are layered on top of one another (in order from top to bottom):
- **Grid Layer** — a chess like grid that having the highest z-index registers click events
- **Player** **Layer** — a layer that renders player sprite(s) mainly in response to events from clicks from the grid layer. This also includes rendering related to movement like a red box that indicates invalid moves.
- **Doodads Layer** — this is a term I stole from other game map editors I used a couple decade ago as a teenager. It is a layer that houses trees, grass, houses, etc. anything that is static that is not a player and it can also contain collidable surfaces that prevent movement by the player. This collision information is outputted by the setup function of the doodads layer.
- **Background Layer** — this is (for now) just a flat background color, but it will likely include tiling in the future and perhaps other features, it is pretty plain as it sits just behind the more interesting doodad layer.

I will post more about future layers but I am thinking I will want an NPC layer, a fog-of-war layer, and perhaps a weather layer between the player and grid layers.

For the UI (beyond the canvases and terminal) I am thinking about playing with SvelteJS and if I get far enough possible using React for the login / account piece.

I am using XTerminal for the terminal piece, which will listen in to events and display information about what is going on, perhaps dispatching them with commands going forward. I am thinking about using Python to handle certain facets of terminal interactions, for now I am using Pyodide in browser for this, though I will likely want to build it in web assembly for production as the interpreter is several MB in size.

All of these details could probably use their own posts, but I will save that for future, I am going to try and keep these updates short. More to come!

