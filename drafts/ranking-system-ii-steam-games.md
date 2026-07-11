# Ranking System II: Steam Games

Below is my chicken scratch JS code that runs on scroll events on a [steam store search results](https://store.steampowered.com/search/?term=) (if you launch it in the console) to resort games. (I recommend holding page down for a while to populate a bunch of games since it only sorts and ranks what it can see in HTML).

```
((hide_owned,min_rating,min_percent,min_weight)=>{addEventListener("scrollend", (event) => {
    const results = [...document.getElementsByClassName('search_review_summary positive')].map((elem)=>{
      const parts = elem.outerHTML.split('% of the ');
      const percent = Number(parts[0].split('>')[1]);
      const number = String(parts[1].split(' ')[0]).replaceAll(',','');
      const weight = Math.pow(percent/100,2)*Math.log(number)/Math.LN10;
      const row = elem.closest('.search_result_row');
      const title = row.querySelector('.title');
      if(!String(title.innerHTML).includes('(')) title.innerHTML = `${title.innerHTML} (${weight.toFixed(4)} ${percent}% ${Math.round(number/1000)}k)`;
      if(weight < min_weight || number < min_rating || percent < min_percent) row.style.display = "none";
      else return [weight,row.cloneNode(true)];
    });
    const nonEmpty = results.filter(result=>result);
    if(nonEmpty.length === 0) return;
    nonEmpty.sort((a,b)=>b[0]-a[0]);
    document.querySelector('#search_resultsRows').innerHTML = '';
    nonEmpty.forEach((result)=>{
      if(hide_owned) result[1].className = 'search_result_row';
      document.querySelector('#search_resultsRows').appendChild(result[1]);
    });
    if(hide_owned) document.querySelectorAll('.ds_owned_flag').forEach((e)=>e.style.display = 'none');
    // FIRST = SHOULD I HIDE THE OWNED OVERLAY, FOR TAKING SCREENSHOTS AND BUILDING TOP 100S. (DEFAULT IS FALSE)
    // SECOND = WHAT IS THE MINIMUM NUMBER OF RATINGS TO SHOW (DEFAULT IS ALL)
    // THIRD - WHAT IS THE MINIMUM PERCENT RATING TO SHOW? (DEFAULT IS ALL)
    // FOURTH - WHAT IS THE MINIMUM WEIGHT TO SHOW? (DEFAULT IS ALL)
})})(true);
```

Although my weighting solution is not a traditional weighting system, you can think of this metric as when you would trust a game with a near 100% rating. Obviously at 10 reviews and 100% score (1 on my scale) it is untrustworthy (I could easily get 10 people to give a 100% to my unknown game) by 1000 (3 on my scale) it really becomes impractical even to bot it because so many reviews almost certainly would be found and it becomes more known to the general public who themselves can easily tank the rating with even mediocre reviews (as any loss to the rating is massively detrimental to the result due to the exponential). By 10 all human beings alive would need to have logged in and rated it a 100%. This obviously is completely impractical and really impossible so it gives us a total upper-bound. Here is a breakdown I calculated using various public data like amazon reviews and youtube ratings to give me an idea:

The reasoning for
