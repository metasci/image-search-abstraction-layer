var Search = require("bing.search");


module.exports = function(app, db){
    
    
    app.get("/:query", queryRequest);


    // handle user request
    function queryRequest(req, res){
            
            var query = req.params.query;
            var size = req.query.offset || 10;
            var key = process.env.API_KEY;
            var search = new Search(key);
            
            var history = {
                term: query,
                when: new Date().toLocaleDateString()
            }
            
            if(query !== "favicon.ico"){
                save(history);
            }
            
            //search for query 
            search.images(query, {
                top: size
            }, function(err, results){
                if(err) throw err;
                
                // send array to users browser
                res.render('api', {
                    result: results.map(trim)
                });
                
            });
            
    }
    
    
    
    function save(history){
        db.collection('history').save(history, function(err, result){
            if(err) throw err;
            
            console.log('Saved new entry!');
        });
    }
        
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


  
 