const Pet = require('./schemas');


module.exports = {
    create: create,
    findAll: findAll,
    findOne: findOne,
    deleteOne: deleteOne,
    updateOne: updateOne,
    updateLike: updateLike
};
function create(req, res){
    Pet.create(req.body)
        .then(data=>res.json(data))
        .catch(errs=>{
            console.log(errs)
            res.json(errs)}); 
}
function findAll(req, res){
    Pet.find({})
        .sort({type: 1})
        .then((data)=>res.json(data))
        .catch(errs=>res.json(errs));
}
//readone
function findOne(req, res){
    Pet.findById(req.params.id)
        .then(data=>res.json(data))
        .catch(errs=>res.json(errs));
};
//update
function updateOne(req, res){
    console.log(req.body)
    Pet.findByIdAndUpdate({_id:req.params.id}, req.body, {new: true, runValidators: true})
        
        .then(data=>{
            data.save()
            res.json(data)})
        .catch(errs=>{
            console.log(errs)
            res.json(errs)});
};
//delete
function deleteOne(req, res){
    Pet.findByIdAndRemove(req.params.id)
        .then(data=>res.json(data))
        .catch(errs=>res.json(errs));
};
function updateLike(req, res){
    console.log(req.body)
    Pet.findByIdAndUpdate({_id:req.params.id}, { $inc: { likes: 1}}, {new: true, runValidators: true})
        .then(data=>res.json(data))
        .catch(errs=>{
            console.log(errs)
            res.json(errs)});
};
// app.put('/authors/newQuote/:id', function(req, res){
//     Author.update({_id: req.params.id}, {$push: {quotes: req.body}},
//     function(err, quote){
//         res.json(quote)
//     })
// })