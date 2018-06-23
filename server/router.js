const Handlers = require("./controller");



module.exports = {
    'router': Routify
};

function Routify(app){
    // app.posts('/tasks', (req,res)=>Handlers.create(req,res));
    app.post('/api/pets', function(req, res){
        Handlers.create(req,res);
    });
    //readall
    app.get('/api/pets', function(req, res){
        Handlers.findAll(req,res);
    });
    //readone
    app.get('/api/pets/:id', function(req, res){
        Handlers.findOne(req,res);
    });
    //update
    app.put('/api/pets/:id', function(req, res){
        Handlers.updateOne(req,res);
    });
    app.put('/api/pets/like/:id', function(req, res){
        Handlers.updateLike(req,res);
    });
    //delete
    app.delete('/api/pets/:id', function(req, res){
        Handlers.deleteOne(req,res);
    });
}