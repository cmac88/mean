const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pets')

const PetSchema = new mongoose.Schema({
    name: {
        type: String, 
        minlength: [3,'Pet name must be at least three characters long'], 
        required: [true, 'Pet name must be filled in']},
    type: {
        type: String, 
        minlength: [3,'Pet type must be at least three characters long'], 
        required: [true, 'Pet type must be filled in']},
    description: {
        type: String, 
        minlength: [3,'Description must be at least three characters long'], 
        required: [true, 'Description must be filled in']},
    skill1: {
        type: String
    },
    skill2: {
        type: String
    },
    skill3: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    } 
});
PetSchema.path('name').validate({
    validator: (name, respond)=>{
        // if(create){
            console.log(respond)
        mongoose.model('pets').findOne({name:name}, (err, pet)=>{
            console.log("please")
            
                respond(!pet)
            
        }) 
    // }  
    },
    isAsync: true,
    message: "This pet name already exists"

})

// PetSchema.pre('save', function(next) {
//     if (this.isNew) {
        
//         mongoose.model('pets').findOne({name: this.name}, (err, pet)=>{
//             if(pet){
//                 console.log('true')
//                 next(new Error("Pet already exisits"))
//             }
//             else{
//                 next();
//             }
//         })
//     }    
// });
// PetSchema.pre("validate", function(next) {
//     var self = this;
//     // if (this.isNew) {
//         mongoose.model('pets').findOne({name : this.name}, 'name', function(err, results) {
//         if(err) {
//             next(err);
//         } else if(results) {
//             console.warn('results', results);
//             self.invalidate("name", "Name must be unique");
//             next(new Error("name must be unique"));
//         } else {
//             next();
//         }
    
//     });

// });
PetSchema.pre('save', function(next) {
    var self = this;
    
    // console.log(this._update._id)
    mongoose.model('pets').findOne({name : this._update.name}, 'name', function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
            console.log('printthis', self._update._id)
            // console.log("printing ", results._id, 'and', this._update._id)
            if(results._id == self._update._id){
                next()
            }
            else{
                console.log('here')
                var err = new Error('Name must be unique')
                this.invalidate("name", "Name must be unique");
                  return next(err);
            }    
        } else {
            console.log("ughhhh")
            next();
        }
    
    });
    next();
});




module.exports =
mongoose.model('pets', PetSchema)
