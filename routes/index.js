var getData = require('../utils');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function addResult(response, domain, eachKeyword){
  let outputData = {}
  let resultsCount = response[0]['result'][0]['items_count']
  let results = response[0]['result'][0]['items']
  for(each of results){
    if(each['domain']===domain){
      outputData['domain'] = each['domain']
      outputData['found'] = true
      outputData['description'] = each['description']
      outputData['keyword'] = eachKeyword
      outputData['rank'] = each['rank_absolute']
      outputData['title'] = each['title']
      break
    }
  }
  
  if(!outputData['found']){
    outputData['found'] = false
    outputData['keyword'] = eachKeyword
    outputData['message'] = `Not found among ${resultsCount} results`
  }
  return outputData
}

router.post('/', async function(req, res, next) {
  try {
    let {keywords, geography, domain} = req.body
    let output = []
    for(eachKeyword of keywords){
      let response = await getData(eachKeyword, geography)
      let keywordResult = addResult(response, domain, eachKeyword)
      output.push(keywordResult)
    }
    res.status(200).json({message: "success", results: output})
  } catch (error) {
    res.status(500).json({message: "failed", error: "Internal Server error"})
  }
  
});

module.exports = router;
