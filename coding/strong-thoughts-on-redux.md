<!-- date posted: 2026-06-27 -->
# Strong Thoughts on Redux

Posted on Medium: 2026-06-27

When I first started using React it was quite an underground tech, and Redux was in its infancy having just been presented as Flux with some third party efforts at work to better handle state.

But ever since then I feel like for every step forward Redux makes it makes two steps backwards, having now used it at a couple of companies and a bit for fun personally I think I can honestly say that most codebases are simply better off without it.

As a thought experiment I asked Claude about why Redux is so great and then provided my counter arguments, here is my AI-human debate ;)

> **1. Prop Drilling** *Passing data through many layers of components is tedious and brittle. Redux provides a global store any component can access directly, no matter how deeply nested.*

This is true, but passing data through many layers of components enforces strong considerations about component structure, emphasizing encapsulation and limits cross-component noise. If for some reason you really needed to circumvent prop drilling, React also provides Context Providers which I would prefer over Redux as it is already built into native React.

> **2. Shared State Between Unrelated Components** *When two components that don’t share a parent need the same data (e.g., a navbar and a sidebar), lifting state up becomes impractical. Redux gives them a common source of truth.*

This for me is the only really good reason to use Redux. There are many times I have had to communicate up (mostly to communicate nav information) and been annoyed. That being said you can use a custom (or library based) event system to easily circumvent this. I find the number of times you actually need something like this is small and should be the exception not the rule — and it is hardly a reason in and of itself to add in Redux and change globally how state works.

> **3. Predictable State Mutations** Redux enforces a strict unidirectional data flow — state only changes via dispatched actions and pure reducer functions, making behavior predictable.

There are two things to state: its data/how it is changed, and how that data is used. While the data and how it is changed is very well organized and predictable in Redux, how the data is used is no where to be seen, which is why I think this is a moot point. It is akin to having the front desk at a restaurant handle all bills because it is a single predictable source of billing. While it may be advantageous to organize the responsibility, the person ringing up the bill still has no idea about what actually happened at the table if it isn’t the server ringing it up. So for all the upsides that a front desk gives, it comes with the downsides of not knowing what actually happened (maybe the wrong beer was charged, the seats weren’t properly recorded to split the bill, there was a service issue, etc.). To me this is one of those “its a problem either way” kind of things, I don’t see how Redux is stronger.

> **4. Debugging & Time-Travel** Because every state change is logged as an explicit action, Redux DevTools lets you inspect the full history of state changes, replay them, or even “time-travel” backward to a previous state.

This is definitely a strength I can’t deny, but I would argue similarly to point 3 that since I often need to drill down to the offending component logic when I am debugging it isn’t always as useful to deal with the entire app state in its entirety.

> **5. State Persistence & Hydration** Serializing and rehydrating state (e.g., for SSR or localStorage persistence) is straightforward since the entire app state lives in one plain JS object.

This I find an odd strength, on a cursory read it feels like a good take, but I am not sure how many people would need local storage persistence for this kind of thing, sounds more like an offline functionality which in our constantly connected world is unlikely to be that useful, additionally I am confused by the SSR comment here since most people server side rendering React are using Next which handles the SSR and hydration for you.

> **6. Consistency at Scale** In large teams, having a single, well-defined pattern for state management reduces bikeshedding and makes codebases easier to reason about across many contributors.

Ever since programming began: large scale codebases have never been a good thing. The larger codebases are the harder they are to debug, maintain, understand, etc. Additionally, AI now will consume far more tokens if codebases and modules are large than if they are small as they add more to context and thereby token cost. So both for humans an AI keeping things smaller is better, so for me having a system to help with large scales is actually in and of itself a downside as it encourages those very large scales.

Anyway, I am not saying Redux is horrible for everyone, it is just not my preferred way of using React if there is any chance of avoiding it.

