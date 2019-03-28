var Database = require('./database');
let IngredientSchema = require('./ingredient')

let mongoose = require('mongoose')
let validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');

let CategoryPref = new mongoose.Schema({

    color: {
        type: String
    },

    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ingredient'
    }

});


//Schema Definition
let UserSchema = new mongoose.Schema({

    uid: {
        type: mongoose.Schema.Types.ObjectId
    },

    username: {
        type: String,
        required: [true, "can't be blank"],
        //unique: true,
        lowercase: true,
        dropDups: true
    },

    email: {
        type: String,
        required: [true, "can't be blank"],
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },

    password: {
        type: String,
        required: true
    },

    categorypref: [CategoryPref]

}, {timestamps: true})



UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.statics.login = function (username, password, cb) {
    this.findOne({'username': username, 'password': password}, 'uid username email categorypref', cb)
}

UserSchema.statics.findByUsername = function (username, cb) {
    this.findOne({'username': username}, 'uid username email categorypref', cb)
}

UserSchema.statics.appendCategoryPref = function (username, color, ingredientName, cb) {
   this.findByUsername(username, function (err, user) {
            if (err) {
                return console.error(err);
            } else {
                //Find the ingredientName


                IngredientSchema.findByName(ingredientName, function (err, ingr){
                    if (err) {
                        return console.error(err);
                    }else {
                        //Save back
                        user.categorypref.push({'color': color, 'ingredient': ingr._id});
                        user.save(cb)
                    }
                })
            }
        }
    )
}

//Exporting Model
module.exports = mongoose.model('user', UserSchema)
