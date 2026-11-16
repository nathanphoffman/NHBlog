# Domain Driven Design
Several years ago I worked for a company that was obsessed with Domain Driven Design, which left me feeling mixed about the model.

Traditionally, DDD is the idea that your divisions in services, data, terminology, and even code (to some extent) should mirror the business. 

One of the reasons people love DDD is because it supposedly makes naming easier -- something I am a bit skeptical of. I am convinced naming things is never easy. George RR Martin seems to agree (at least about his fantasy characters).

> “Names are really hard. And I need to know the name of the character before I can begin to write about them.”

For me this really encompasses the problem. You cant code if you can't agree on the names or even structures for the format of that code because you are so caught up on semantics. It also means a new developer not only has to learn the tech stack but also the business before they can meaningfully contribute anything. 

The upside to this is easy to argue it seems to prove DDD's point: "shouldn't a new dev learn the business?" but if I hand it that win it doesn't change the fact that when that application was created I bet quite a few new devs were in meetings where semantic questions were raised about which departments phrasing took precedent like terms or legalities that differ between US states.

I think the best way I would champion DDD is it forces you to ask questions, which in my opinion is what is great about it -- it enforces validation and makes programmers ask about business rules, but the naming can force pedandricry and paralysis. It also can serve as a carte blanche to question all terminology programmers are using not just those that are specific to the business.

Do I hate DDD? No. Absolutely not, but I would be skeptical of anyone who focuses more on naming and structure than on the business logic itself. For me if you find yourself asking "Why?" because someone points out that x line of code does not satisfy DDD for reason y, that is a good thing -- because you are learning about the business, and DDD is facilitating that conversation. But if DDD is entirely used as the guiding wind on "How" to do something it can be catastophic, a bit like builders of a skyscraper building a giant unsafe arch for the entry doorway because the advertisers of the business wanted it that way. Sure, if the arch can be structurally sound than it is the builders job to make it happen, but the builders need the flexibility to pushback and ask "Why?" and say "No" when it could cause serious problems or delays with the project. Likewise if some minor flaw is found on a window like a small scratch (or in this case a single field named slightly differently than a business term) it really isn't worth delaying the project over.




