<!-- date posted: 2022-04-26 -->
# Stack overflow surveys, and what they say about language trends

Posted on Medium: 2022-04-26

Since the 2022 Stack Overflow Survey is coming up, I thought it would be nice to look at the trends of past languages.

There are two metrics that are most useful on these surveys for gauging interest / popularity in programming languages, they are:
- Popularity of the language
- Love of the language

For the purposes of doing this article, I took the top 13 languages from the most recent survey (2021) that were not shell languages, database languages, or older/alternative versions of a language (like C).

### **Diagram 1 — Popularity**

This is raw data for popularity provided by Stack Overflow.

![](/images/1-dDaHbTKrmMOw1sAn-9aIhQ.png)

### Diagram 2 — Opinion

This is raw data from the love vs hate data provided by Stack Overflow.

![](/images/1-hWavNbSTUHvL6U36NW3_WA.png)

### Diagram 3 — Average Popularity weighted by Average Opinion

This is effectively a percentage of people who **both** used a language **and** loved that language over the three years: 2019–2021. This is why it is always less than the popularity. Ex: if 50% of respondents used a language and 50% loved it, that would show as 25%. *From here on out we will be dealing with the data from 2019–2021 averaged together (or using it for growth %’s).*

![](/images/1-pqDE8YGPdHcCwJASo0elAA.png)

### Diagram 4 — Popularity & Opinion Change Over Time

![](/images/1-v1Rc7883FumwmDxMl60o6g.png)

### Diagram 5 — Taking Popularity & Opinion weight and applying growth and loss to simulate a future prediction.

If we take the data from diagram 3 and apply the growth and loss seen in diagram 4, we get a somewhat subjective “Outlook” value or a sense of where the language is headed in terms of overall popularity & love.

![](/images/1-k6PGw-Ki3FlUy736CEiNCQ.png)

*The current value is data from 2019–2021 averaged together*

It should be noted that the long term outlook represents a prediction 9 years from now, and should be looked at as more momentum rather than a prediction. The shorter term “Outlook” is likely a better future predictor of where we will be in a few years, however even that can be quite far off. *For example, I ran this same formula using older data (2017–2019) and got Java at close to 24% for 2022, this seems doubtful since it is currently under 20% with trends showing a decline.*

### Diagram 6 — Languages more loved than popular

These are languages that are more loved than they are popular, in some cases this could be considered “under-utilized,” “over-loved/hyped,” or it could be languages that are more specialized, newer, or still growing. To help account for this, the growth factor for both is included, so the following formula is used: (Love % * Love_Growth)/(Popularity % * Popularity_Growth )

Likewise, languages on the far right of this graph are more popular than they are loved.

![](/images/1-JyABdNVA7el9EvXrZLsK3w.png)

### Conclusion

I never loved the “what language is better” debate as every technology, principle, and concept has its place. If we were to attempt to generate a “best languages to learn” list it would make sense to weigh languages that were popular, of high opinion, and growing at the highest value. It is likely Diagram 5 would be the most useful in this measure. Below is the diagram with more data and presented in a different format.

![](/images/1-v1dqvXeIro3A5FbaBS9Ayw.png)

*Notice that languages with higher spreads are more volatile. With orange-dots on the top of the spread representing positive growth and orange dots on bottom indicating growth is trending negative. C++ is a great example of stability with barely any change.*

*The next developer survey is coming up for 2022! Once this data is in, I will do an update to this post.*

>https://nathanhoffman.me/coding/stack-overflow-surveys-and-what-they-say-about-language
