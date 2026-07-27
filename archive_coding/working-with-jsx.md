<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->

<!-- date posted: 2015-11-21 -->
# Working with JSX

Posted on Wordpress: 2015-11-21

Posted on Medium: 2017-01-20

This was posted to codingastronomer.com on 11/21/2015.

*The archives were created to preserve my writings from various blog sites which I have used over the years. Most come from my wordpress blogs nathanphoffman.com and codingastronomer.com. I hope to make medium.com my new home.*

I began working with JSX recently as I am using ReactJS for a personal project. Unfortunately, I have found very little support for JSX auto-formatting.

I wanted to use Visual Studio Code to auto-format my JSX, but found that plugins are still not available, and although syntax-highlighting for JSX has been built-into to VS Code, auto-formatting does not appear to have been added yet. It does sound like there will be more JSX support in the future. See: [this post](https://visualstudio.uservoice.com/forums/293070-visual-studio-code/suggestions/7752528-jsx-support).

Next, I began looking at web-based formatters where I could copy-paste my code into a textarea and have it format it for me, obviously not ideal, but I figured it might hold me over. Unfortunately, the few web-formatters I have found format the tag-portions within the jsx in very odd ways, breaking nearly every space on a new line.

I then figured I would try to mess with my code structure to include most of the tag-elements within the JSX in an XML file, which would be picked up by VS Code for proper formatting. I approached this by adding .xml to my loader for JSX in webpack:

`{`

`test: /\.(jsx|xml)$/,`

`loader: 'jsx-loader?insertPragma=React.DOM&amp;amp;amp;amp;harmony'`

`}`

I then included it as I would an external JSX file with require. Although this meant some of the JavaScript I had to include, like the module.exports line, were not automatically formatted, the xml-like syntax still formatted without issue. I was actually fairly happy with the result, but it was not perfect. Adding properties to the JSX tags caused errors because they were not defined. This became cumbersome and awkward so I abandoned the approach*.

*I also found that the strength of React+JSX is having the inline tags combined with the JS code, it felt weird to separate them.

Next, I decided to ditch VS Code completely in favor of Atom, which I understand has JSX auto-formatting support. To my disappointment, Atom does not support any JSX feature by default, fortunately, there is a plugin called the Atom React Plugin. Which can be installed with apm, the Atom Package Manager.

For first time Atom users (like me), you can install this from a command line by entering:

```
apm install react
```

After I restarted Atom, JSX was properly highlighted and auto-formatted! Unfortunately (yep still problems!) I have noticed a very odd issue, or perhaps an undesirable feature. If you take some JSX that has only one tag within a JS block like this return, it will cause extra new lines. For example, here is some JSX I use for transitions:

`fadeOut: function(innerElement){`

`return(<**ReactCSSTransitionGroup**`

`transitionName="transition-fadeOut"`

`transitionAppear={true}`

`transitionAppearTimeout={4000}`

`transitionEnterTimeout={5000}`

`transitionLeave={false}>`

`{innerElement}`

`</**ReactCSSTransitionGroup**>`

`);`

`}`

*The code blocks in WordPress are a little odd, I had to use HTML as JS was not working (poor JSX, there is no support for you)*

I still haven’t figured out why the extra new lines occur, but I have noticed that if you add additional tags within the return it will not autoformat oddly. This is replicable across many of my react components that return only one element.

In summary, using Atom with the react addon seems is the best way to work with React that I have found, but it still appears to have some problems of its own. If you have suggestions for me (I am still new to React and JSX world) feel free to post them in the comments.

>https://nathanhoffman.me/coding/working-with-jsx
