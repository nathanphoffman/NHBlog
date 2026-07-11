<!-- date posted: 2017-05-23 -->
# We have spent a lot of time poking around: mLab, Azure’s DocumentDB/CosmosDB support for Mongo, and…

Posted on Medium: 2017-05-23

We have spent a lot of time poking around: mLab, Azure’s DocumentDB/CosmosDB support for Mongo, and dedicated virtual machines where we install Mongo on Windows environments, and I have to say the seemingly cheapest and all around best option appears to be Atlas.

I am using their free tier right now for testing and even the free tier is great with performance. Microsoft’s Cosmos seems great on the surface until you realize they charge per collection, and what is worse is you have to assign arbitrary “RU” per collection, which means your unused RU for another collection can’t contribute. mLab was extremely expensive from what I recall, and the dedicated virtual machines are more expensive, particularly since you need multiple for a replica set. If Atlas works out I am going to make a Medium post of my own on it.

It seems like an absolute no brainier: cheap, fast, high availability, and made by the very guys who made Mongo in the first place, who could do it better?

