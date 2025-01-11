function extractProducts() {
  var urls = [
    { url: "https://east-digital.myshopify.com/collections/factory-recertified", sheetName: "Category - HDD(FR)" },
    { url: "https://east-digital.myshopify.com/collections/hdd", sheetName: "Category - HDD(New)" },
    { url: "https://east-digital.myshopify.com/collections/pulls-hdd", sheetName: "Category - HDD(Pulls)" }
  ];

  var conversionRate = fetchExchangeRate('USD', 'NZD');
  var correctionFactor = 1.021; // Your updated correction factor
  var correctedConversionRate = conversionRate * correctionFactor;

  Logger.log("Fetched Conversion Rate: " + conversionRate);
  Logger.log("Corrected Conversion Rate: " + correctedConversionRate);

  urls.forEach(function(entry) {
    processUrl(entry.url, entry.sheetName, correctedConversionRate);
  });
}

function processUrl(baseUrl, sheetName, correctedConversionRate) {
  var options = {
    'method': 'get',
    'headers': {
      'Accept-Language': 'en-NZ',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Cookie': 'localization=NZ'
    }
  };

  var page = 1;
  var hasMorePages = true;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
    sheet.appendRow(['Product Name', 'Regular Price (NZD)', 'Sale Price (NZD)', 'Date', 'Drive Size (TB)', 'Price per TB (NZD)', 'Stock Status']);
  } else {
    var firstRow = sheet.getRange(1, 1, 1, 7).getValues()[0];
    if (firstRow[0] !== 'Product Name' || firstRow[1] !== 'Regular Price (NZD)' || firstRow[2] !== 'Sale Price (NZD)' || firstRow[3] !== 'Date' || firstRow[4] !== 'Drive Size (TB)' || firstRow[5] !== 'Price per TB (NZD)' || firstRow[6] !== 'Stock Status') {
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, 7).setValues([['Product Name', 'Regular Price (NZD)', 'Sale Price (NZD)', 'Date', 'Drive Size (TB)', 'Price per TB (NZD)', 'Stock Status']]);
    }
  }

  while (hasMorePages) {
    var url = baseUrl + "?page=" + page;
    var response = UrlFetchApp.fetch(url, options);
    var html = response.getContentText();
    var $ = Cheerio.load(html);
    var products = $(".grid__item");

    var noProductsMessage = $("#ProductGridContainer .collection--empty .title.title--primary").length > 0;

    if (products.length === 0 || noProductsMessage) {
      hasMorePages = false;
    } else {
      products.each(function() {
        var productName = $(this).find('.h5').text().trim();
        var productUrl = $(this).find('a').attr('href');
        if (productUrl) {
          productUrl = "https://east-digital.myshopify.com" + productUrl;
        }
        var regularPriceUSD = $(this).find('.price-item--regular').text().trim();
        var salePriceUSD = $(this).find('.price__sale').text().trim();

        var stockStatus = "In Stock";
        var priceWrapper = $(this).find('.price');
        
        if (priceWrapper.find('.badge:contains("Sold out")').length > 0 || 
            priceWrapper.hasClass('price--sold-out')) {
          stockStatus = "Out of Stock";
        }

        if (productName && productUrl && regularPriceUSD) {
          var escapedProductName = productName.replace(/"/g, '""');
          var productNameWithLink = `=HYPERLINK("${productUrl}", "${escapedProductName}")`;
          var regularPriceNZD = convertToNZD(regularPriceUSD, correctedConversionRate);
          var salePriceNZD = salePriceUSD === "$0.00 USD" ? regularPriceNZD : convertToNZD(salePriceUSD, correctedConversionRate);

          Logger.log("Product Name: " + productName);
          Logger.log("Product URL: " + productUrl);
          Logger.log("Regular Price USD: " + regularPriceUSD + " -> NZD: " + regularPriceNZD);
          Logger.log("Sale Price USD: " + salePriceUSD + " -> NZD: " + salePriceNZD);

          var date = new Date().toLocaleDateString();

          // Extract drive size from product name
          var driveSizeMatch = productName.match(/(\d+)\s?TB/i);
          var driveSize = driveSizeMatch ? parseInt(driveSizeMatch[1]) : '';

          sheet.appendRow([productNameWithLink, regularPriceNZD, salePriceNZD, date, driveSize, '', stockStatus]);
        }
      });
      page++;
    }
  }

  // Add the "Price per TB (NZD)" column and fill it with the formula
  var lastRow = sheet.getLastRow();
  for (var i = 2; i <= lastRow; i++) {
    //var formula = `=B${i}/E${i}`;
    var formula = `=IF(C${i}<1, B${i}/E${i}, MIN(B${i}, C${i})/E${i})`;
    sheet.getRange(i, 6).setFormula(formula);
  }
}

function fetchExchangeRate(fromCurrency, toCurrency) {
  var url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText());
  return data.rates[toCurrency];
}

function convertToNZD(priceUSD, conversionRate) {
  var price = parseFloat(priceUSD.replace(/[^0-9.-]+/g, ""));
  var priceNZD = (price * conversionRate).toFixed(2);
  return priceNZD;
}
