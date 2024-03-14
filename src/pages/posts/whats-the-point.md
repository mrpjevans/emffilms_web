---
layout: blog.liquid
title: What's The (Decimal) Point?
permalink: whats-the-point/
image: whats-the-point.jpg
imageAlt: A very big reel
tags:
  - dev
---

_A cautionary tale of a bug that wasn’t (yet was)_

I’m currently working with a team helping an industrial textile manufacturer based in Lyon, France. Part of the job is working with a CSV file (isn’t it always) and translating the data into JSON so it’s usable by Elasticsearch. All has been going well until the other day when our P.O. found something weird.

The CSV in question is a list of material rolls material that are currently in the warehouse. We convert the data so it is rendered on a rather lovely website (you can tell I didn’t design it) so it can be easily searched. Common to every roll are attributes like type, colour, width and length. Today it was the width that had us scratching our heads.

Up to now we had been happily displaying the width in meters, yet a latest export from their systems, a roll had turned up that was 900 meters wide. Now, I can’t say I know much about the textile industry but even I was struggling with the fact that somewhere in the warehouse was lurking a roll of material NEARLY ONE KILOMETER WIDE. That surely would cause issues, or collapse into a black hole of some kind.

"Of course", I said, "it’s a data error. I’ll have a look at import file."

Sure enough, I found the roll in question and it stated 900 meters. "Ha! Someone’s goofed" I thought, not quite realising at this point that someone had indeed goofed, and that person was me.

I looked at the other rolls in the file. All were the normal one to three meters in width. Some were 1.200, other 2.300 and so on. So, I reasoned, it was more likely that this roll was maybe 900 millimetres rather than the distance of a recommended daily walk. If that’s the case why on earth are the others in meters?

Of course, they were not.

This particular *rosbif* had completely forgotten that is perfectly normal in France and other countries to use ‘.’ as the thousands separator and ‘,’ as the decimal point. All the widths were in millimetres. However, and here’s the kicker, as most were one to three meters, the data had been correct all this time by accident, as we took the period to be the decimal point, which is right if you want to divide by one thousand. Only when something less than a thousand showed up did the bug manifest. A quick line of sanitising code to remove the period and treat everything as millimetres and our 900 meter frankenroll was shrunk down to size.

The moral of this story is, when working with ‘punctuated’ numbers, be always sure to ask someone “What’s the (decimal) point?”.
