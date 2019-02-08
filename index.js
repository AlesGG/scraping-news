const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


//const puppeteer = require('puppeteer');



(async () => {

  /* _____CONNECTION____*/
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.meneame.net');
  let bodyHTML = await page.evaluate(() => document.getElementById('newswrap').innerHTML);
  const $ = cheerio.load(bodyHTML);




  //console.log(bodyHTML);
  let newItem = {
    "title": null,
    "description": null,
    "votes": null,
    "url": null,
    "mainCategory": null,
    "subCategory": null,
  }

  let portada = {};
  $('.news-body').each((i, el) => {
   // console.log(i)
    portada[i] = getSingleNewsData(el);
   
  }, bodyHTML);
    console.log(portada);





function getSingleNewsData(el){
 let result={};
 result.title = $(el).find('h2').text().trim();
 result.description = $(el).find('.news-content').text().trim();
 result.votes = $(el).find('.votes a').text().trim();
 return result;
}


  //console.log(newItem);

  /*await page.pdf({
    path: 'hn.pdf',
    format: 'A4'
  });*/
  await page.close();
  await browser.close();


})();
