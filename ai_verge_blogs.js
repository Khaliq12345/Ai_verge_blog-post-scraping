
const cheerio = require('cheerio');
const axios = require('axios');
const url = 'https://www.theverge.com/ai-artificial-intelligence';
const fs = require('fs');
const json2csv = require('json2csv');


axios(url).then(res => {
    const response = res.data;

    const $ = cheerio.load(response);

    const result = [];

    post = $('.c-entry-box--compact.c-entry-box--compact--article').first().text();
    $('.c-entry-box--compact.c-entry-box--compact--article').each((index, e) =>{
        const title = $(e).find('.c-entry-box--compact__title').text();
        const author = $(e).find('.c-byline__author-name').text();
        const date = $(e).find('time.c-byline__item').text();
        const post_link = $(e).find('.c-entry-box--compact__title a').attr('href');

        result.push({
            title,
            author,
            date,
            post_link
        })

        const csv = json2csv.parse(result);
        fs.writeFileSync('ai_blogs_data.csv', csv);
    })
    
})



