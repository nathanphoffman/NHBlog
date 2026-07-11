date posted: 2019-06-11
# Playing around with MithrilJS

I have been playing around with a non-transpiled build of Mithril for a non-profit website I am working on. I like how simple the syntax is and the fact it includes a built-in router that has very similar syntax to lightweight routers like: [routie](http://projects.jga.me/routie/)

```
m.route(bodyLocation, “/home”, {
 “/general/:type”: general,
 “/helloworld”: helloworld
 });
```

Components can be built with using their global object m, I am creating a simple cart ordering script, and it is incredibly easy to nest components and tends to not be too verbose.

Here are some possibilities for creating elements/components:

```
// simple:
m('h1','hello world!');
// with the opt. object for events, styles, and other html attrs.
m('h1',{style:'color:#333'},'grey hello world!');
// with a single nested element:
m('h1',m('span','inner hello world'))
// or with an array of components/elements:
m('ul',[
  m('li','list item 1'),
  m('li','list item 2')
])
// using an actual component if component is stored in variable comp
m(comp,{prop:'the prop I am setting'})
```

Overall it seems really lightweight and easy to use. Data storage appears to be up to you to bind the data to the component object you create, there are no hard-set rules with Mithril, but they do have suggested things to avoid, particularly with the usage of their lifecycle methods.[**Lifecycle methods** *Components and virtual DOM nodes can have lifecycle methods, also known as hooks, which are called at various points…*mithril.js.org](https://mithril.js.org/lifecycle-methods.html)

I will continue to update as I find things I enjoy with Mithril.
