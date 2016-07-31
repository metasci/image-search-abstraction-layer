
module.exports = function(app, db){
    
    app.get("/latest", latest);
    
 
    // pull latest searches
    function latest(req, res){
        
        var cursor = db.collection('history').find();
        var array = [];
        
        
        
        cursor.each(function(err, doc){
            if(err) throw err;
            
            // fill array with all saved docs, then send to browser
            if (doc != null) {
                array.push(clean(doc));
            } else {
                res.render('latest', {
                    result: array
                });
            }
        });
    }    
};

function clean(item) {
    return{
        term: item.term,
        when: item.when
    };
}

