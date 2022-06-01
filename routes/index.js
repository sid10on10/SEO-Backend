var getData = require('../utils');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function addResult(response, domain){
  let resultsCount = response[0]['result'][0]['items_count']
  let results = response[0]['result'][0]['items']
  let outputData = {}
  for(each of results){
    if(each['domain']===domain){
      outputData['found'] = true
      outputData['rank'] = each['rank_absolute']
      outputData['domain'] = each['domain']
      outputData['title'] = each['title']
      outputData['description'] = each['description']
      break
    }
  }
  if(!outputData['found']){
    outputData['message'] = `Not found among ${resultsCount} results`
    outputData['found'] = false
  }
  return outputData
}

router.post('/', async function(req, res, next) {
  let {keywords, geography, domain} = req.body
  let output = []
  for(eachKeyword of keywords){
    let response = await getData(eachKeyword, geography)
    let keywordResult = addResult(response, domain)
    output.push(keywordResult)
  }
  res.json({message: "success", results:output})
});

module.exports = router;
