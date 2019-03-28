var Database = require('./database');

let mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

//Schema Definition
let IngredientSchema = new mongoose.Schema({

    uid: {
        type: mongoose.Schema.Types.ObjectId
    },

    name: {
        type: String,
        required: [true, "can't be blank"],
        //unique: true,
        dropDups: true
    },

    synonym: {
        type: String
    },

    description: {
        type: String
    },

    wikilink: {
        type: String
    },

    tally: {
        type: Number
    }

}, {timestamps: true})


IngredientSchema.statics.findByName = function (name, cb) {
    this.findOne({'name': name}, 'uid name synonym description wikilink tally', cb)
}


//Exporting Model
module.exports = mongoose.model('ingredient', IngredientSchema)