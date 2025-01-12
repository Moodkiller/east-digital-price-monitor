This is for all the DataHoarders and "lowest price per TB" HDD hunters. I've made a Google Sheet to parse the 3 main HDD categories on East Digitals website, namely: 

1. [New HDDs](https://east-digital.myshopify.com/collections/hdd)
2. [Factory Recertified HDDs](https://east-digital.myshopify.com/collections/factory-recertified)
3. [Pulled HDDs](https://east-digital.myshopify.com/collections/pulls-hdd)

## Features:

* Tables can be sorted and filtered by Date, Drive Size, Price Per TB, Price, and Sale Price
* Pivot Table per category for consolidated stats per unique product
* Script is adaptable to any other similar Shopify website (see source code linked below)
* Added bonus, even though the sale prices are hidden on the website, it is still in the page source code, the script will parse for this info as well, so you can see the last sale price
* Products are hyperlinked with previews (no affiliate links)
* HDD Lookup table - enter your desired size and it will spit out the lowest price, date and link to the relative cell
* Pagination handling - script will go through as many pages of listings as there are in each category


## Things to Note:

1. I was unable to "trick" the website into pulling NZD, so the script uses the current USD -> NZD exchange rate + "a Shopify correction rate" to get the prices as close to what we see when browsing the website. 
2. The aforementioned prices are then rounded up in tables (same as the website)
3. Due to the way the prices are sourced, I'd recommend just using the Sheet solely for comparisons. I.e the actual HDD price may be $1 higher or lower on any given day, but because the the whole sheet uses a correction rate, the prices are all relative. In theory, the cheapest HDD should still be the cheapest. 
3. Script automatically runs once a day (7pm-8pm each day)

## TODO (i.e if someone smarter than me can help, that would be awesome):

* ~Pull stock status (in or out of stock) | [Github PR](https://github.com/Moodkiller/east-digital-price-monitor/pull/1)~
* Column / Cell formatting if a drive is on sale 
* Obtain NZD from website instead of calculating it (room for error) | [Github PR](https://github.com/Moodkiller/east-digital-price-monitor/pull/2)

Feedback welcomed, feel free to make a copy and use as you wish. 

## [East Digital Price Monitor Googlesheet](https://docs.google.com/spreadsheets/d/1K3oTze5Y3n_2HeYcEgY4tnceJOb4jhwx_k-vVn1imPA/edit?usp=sharing)
