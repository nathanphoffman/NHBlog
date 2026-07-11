<!-- date posted: 2015-09-27 -->
# Multithreading and Asynchronous Calls in JavaScript

Posted on Wordpress: 2015-09-27

Posted on Medium: 2017-02-10

This was posted to codingastronomer.com on 9/27/2015.

*The archives were created to preserve my writings from various blog sites which I have used over the years. Most come from my wordpress blogs nathanphoffman.com and codingastronomer.com. I hope to make medium.com my new home.*

“Is JavaScript multithreaded?” The quick and easy response is “no.” The longer response is, well, a bit more complicated.

**JavaScript on a page runs as a single thread.** There are several problems this can cause, notably when an enormous amount of synchronous operations run, the events on the page can stop executing, click events may not fire, etc. This is because page events are executed on the same thread as the JavaScript code. This is referred to as “The Concurrency Model” and can be thought of as a stack of events and messages that operate on a first-in first-out (FIFO) basis.

While synchronous calls run in order of execution, asynchronous run based on some external trigger that is not initiated by your code. Contrary to misconception, this does not mean that asynchronous calls in JS run on a different thread, this means that asynchronous calls are waiting on something. This could be a response from an Ajax call, a setInterval event which fires something every x seconds, or a setTimeout event which gets called after some time has elapsed. The result is that the rest of the code does not wait on the asynchronous operation, it instead moves onward. However, any processing done once the async calls are triggered follow the normal behavior of the stack. They have to wait in queue, and then when executed, they hold up the single JavaScript thread.

**JavaScript can “be multithreaded” but only when using web workers.** Fortunately, web workers provide JavaScript with a multithread capability, but it is not as simple as it sounds. Some cons are:
- Out of the box, web workers require a separate piece of code (an external JS file) to be executed.
- Passing parameters and receiving parameters is a bit like making ajax requests to and from an external web service. You have to use special message events to pass parameters and receive data.
- Workers do not inherit functions from any other JS file or piece of code unless you include that code in the webworker itself. (they did add a function which can be used from the web worker code to include external files)
- Because web workers have no definitions for the DOM, (such as window or document) many popular JavaScript plugins simply will not function. You can sometimes get around this by defining your own empty document or window, but it depends on the code.
- Web workers have much higher initialization time, requiring a bit of time to create the thread.

The good news is web workers really do work, and they work fast once initialized. Additionally, there are some user created libraries, like [multithread.js](http://keithwhor.github.io/multithread.js/) which makes web workers easier to use.

You can read more about Web Workers on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

