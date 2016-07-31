var Search = require("bing.search");


module.exports = function(app){
    
    app.get("/latest", latest);
    
    app.get("/:query", queryRequest);
    
}


//
function queryRequest(req, res){
        
        var query = req.params.query;
        var size = req.query.offset || 10;
        var key = process.env.API_KEY;
        var search = new Search(key);
        // res.end(key);
        
        
        
        //search for query 
        search.images(query, {
            top: size
        }, function(err, results){
            if(err) throw err;
            
            // send array to users browser
            res.send(results.map(trim));
            
        });
        
}


  function trim(item) {
    // remove unwanted data from results
    return {
      "url": item.url,
      "snippet": item.title,
      "thumbnail": item.thumbnail.url,
      "context": item.sourceUrl
    };
  }
  
  
// pull latest searches
function latest(){
    
}