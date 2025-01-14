This is for all the DataHoarders and "lowest price per TB" HDD hunters. I've made a Google Sheet to parse the 3 main HDD categories on East Digitals website, namely: 

1. [New HDDs](https://east-digital.myshopify.com/collections/hdd)
2. [Factory Recertified HDDs](https://east-digital.myshopify.com/collections/factory-recertified)
3. [Pulled HDDs](https://east-digital.myshopify.com/collections/pulls-hdd)

## Features:

* Tables can be sorted and filtered by Date, Drive Size, Price Per TB, Prices, Stock Status, and Sale Status.
* Pivot Table per category for consolidated stats per unique product, sorted by lowest Price Per TB
* Script is adaptable to any other similar Shopify website
* Added bonus, even though the sale prices are hidden on the website, it is still in the page source code, the script will parse for this info as well, so you can see the last sale price
* Products are hyperlinked with previews (no affiliate links)
* HDD Lookup table - enter your desired size and it will spit out the lowest price, date and link to the relative cell
* Pagination handling - script will go through as many pages of listings as there are in each category automatically
* Sheet is automatically sorted by Date, newest at the top to save scrolling


## Things to Note:

1. Script automatically runs once a day (7pm-8pm NZDT)
2. Price Per TB calculation is always based off the lowest value between Regular and Sale prices
3. Still a WIP

## TODO (i.e if someone smarter than me can help, that would be awesome):

* ~Pull stock status (in or out of stock) | [Github PR](https://github.com/Moodkiller/east-digital-price-monitor/pull/1)~
* ~Column / Cell formatting if a drive is on sale [Github PR](https://github.com/Moodkiller/east-digital-price-monitor/pull/3)~
* ~Obtain NZD from website instead of calculating it (room for error) | [Github PR](https://github.com/Moodkiller/east-digital-price-monitor/pull/2)~

Feedback welcomed, feel free to make a copy and use as you wish. 

## [East Digital Price Monitor Googlesheet](https://docs.google.com/spreadsheets/d/1K3oTze5Y3n_2HeYcEgY4tnceJOb4jhwx_k-vVn1imPA/edit?usp=sharing)
