const axios = require('axios');
var {email, apiPassword} = require('./config')

module.exports = async function getData(keyword, location){
    config = {
        method: 'post',
        url: 'https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
        auth: {
            username: email,
            password: apiPassword
        },
        data: [{
            "keyword": encodeURI(keyword),
            "language_code": "en",
            "location_name": location
        }],
        headers: {
            'content-type': 'application/json'
        }
    }
    try {
        let response = await axios(config)
        var result = response['data']['tasks'];
        return result;
    } catch (error) {
        console.log(error)
    }
}