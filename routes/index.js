

module.exports = function(app){
    
    app.get('/', function(req, res){
        
        
        res.render('index', {
            user: "User Stories",
            ex: "Example"
        });
        
    });
    
}