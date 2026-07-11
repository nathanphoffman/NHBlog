date posted: 2017-02-03
# 10/24/2015 Archives: The DataTables Plugin for JQuery

This was posted to codingastronomer.com on 10/24/2015.

*The archives were created to preserve my writings from various blog sites which I have used over the years. Most come from my wordpress blogs nathanphoffman.com and codingastronomer.com. I hope to make medium.com my new home.*

Pure HTML tables are boring and static. Thanks to JQuery, there are now numerous ways to bring tables to life with just a few lines of code. The DataTables plugin for JQuery has been around for a while and is the most popular on Google’s search results for “javascript table plugin.”

To see DataTables in action I would suggest checking out [their site here](https://www.datatables.net/).

The following [Jsfiddle snipplet](https://jsfiddle.net/p2mm3ej7/) is only 28 lines, which includes 21 lines of table data. The initialization is:

`$(document).ready(function() { $('#example').DataTable(); } );`

This may look simple, but that does not mean it lacks configuration. DataTables can be configured to a very high degree, [the API](https://www.datatables.net/reference/api/) is impressive allowing for row modifications, ajax, manipulation of the positioning of elements, events, sorting options, and more. This is not mentioning [the dozens of extensions](https://www.datatables.net/extensions/index) which they have that add additional functionality.

If I had to complain about DataTables, I would say the biggest issue is how the extensions play together, as well as some confusion as to where each extension is contained as revisions are made, depreciating some extensions, as well as merging extensions. In previous versions of some of the extensions, I had trouble with ColReorder (a column reorder extension) and Colvis (a column visibility extension). I posted about it on [StackOverflow](http://stackoverflow.com/questions/28698605/colvis-column-grouping-not-working-with-colreorder).

If you are using Bootstrap, make sure to use their [Bootstrap styles for DataTables](https://www.datatables.net/examples/styling/bootstrap.html). It doesn’t get much easier than Bootstrap + DataTables.
