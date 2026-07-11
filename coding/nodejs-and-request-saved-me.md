date posted: 2017-03-25
# NodeJS and Request Saved Me

![](https://cdn-images-1.medium.com/max/800/1*jIvt68aHWSFeysbb7pNdqQ.png)

***Unrelated:** We need to make the rocket turtle the official [Node mascot](https://github.com/node-forward/discussions/issues/33)*

I had a troubling experience with REST support in C# .NET 4.6. At my company I was tasked to integrate our C# Web API service to a Multipart Form Request that sent along CSV content as if it were a file upload from a web page, but in actuality it was pulled from a database by a C# service.

This all might sound odd, why from service to service was I simulating a Multipart Form POST when we had the data in memory?

Well the main reason is because our vendor uses the same endpoint for file uploads, and did not feel the need to expose a second method. On its own, a multipart file transmission doesn’t seem too difficult with libraries like [RestSharp](http://restsharp.org/), but our issue is that we were hooked into OAuth 1.0 using the [DevDefined.OAuth library](https://github.com/bittercoder/DevDefined.OAuth). Since we could not do multipart page requests using devdefined, we now had to look for something else.

I must admit that I was very new to both multipart files and the intricacies of OAuth 1.0, but it seemed to me that if I used something with good REST support like RestSharp I would be unable to have the authentication strengths of the DevDefined OAuth library, without ripping it apart. So instead I either had to use RestSharp and manually compose OAuth or use DevDefined.Oauth and manually compose a multipart form request. Clearly, neither of these situations were ideal. And the one OAuth 1.0 example I could find with RestSharp was [100s of lines long](https://github.com/restsharp/RestSharp/blob/master/RestSharp.IntegrationTests/oAuth1Tests.cs).

After banging my head on [Stack Overflow articles](http://stackoverflow.com/questions/6193460/how-to-use-restsharp-with-oauth), that were not helpful and pointed to a lack of C# community support, I turned to NodeJS. Since this integration was running short on time, we needed to get something up and running. After only 5 minutes of searching, I found a JS library (Request), an example of OAuth, and a multipart file composition using that library.

The whole setup was extremely simple, simpler than anything we were doing already with OAuth 1.0 and I plugged in our key/secret and their multipart structure and immediately had success. Furthermore, I hooked up the entire service on Microsoft Azure App Services *(yes I know, I prefer AWS too for Node)* and had the whole service up and running within an hour. This is all of the code needed for the request portion:

I know many people hate the JS Community, and honestly I sometimes join in. The number of libraries can be stupid, the amount of dependencies baffling, and the disagreement over what bests what aggravating. But when push comes to shove, the strength of JS’s community is that niche scenarios like this can be resolved instantly, whereas C# ends up having you fumbling with docs, & outdated libraries, and it often times leaves you nowhere to turn.

I think the most important thing when coding is simplicity. While it is possible I may have found an easier C# solution than those I came across, this NodeJS/ExpressJS/Request setup was perhaps the simplest web app I have ever setup, and took me less time to setup than it took me Googling my first steps with C#.
