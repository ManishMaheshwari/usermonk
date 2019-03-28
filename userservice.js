let IngredientModel = require('./ingredient')
let UserModel = require('./user')


//Usage examples:

//Create a new user
let nonie = new UserModel({
    username: "nonie100",
    email: "nonie100@gmail.com",
    password: "pass_nonie",
    categorypref: [{color: "red"}, {color: "blue"}]
})

nonie.save(function (err, user) {
    if (err) {
        return console.error(err);
    } else {
        console.log("Saved IN: %s", user)
    }
})

//Login and work on logged in user
UserModel.login("nonie100", "pass_nonie",
    function (err, user) {
        console.log("LOGGING IN: %s", user)
    }
)


//Find a user by name, and work on that user
UserModel.findByUsername("nonie100",
    function (err, user) {
        if (err) {
            return console.error(err);
        } else {
            console.log("FOUND IN: %s", user)
        }

    }
)



//Update a User's email
UserModel.findByUsername("nonie100",
    function (err, user) {
        if (err) {
            return console.error(err);
        } else {

            //Fields to update
            user.email = "hoaxy@gmail.com"

            //Save back
            user.save(function (err, user) {

                    //Validate the update
                    console.log("SAVED User IN: %s", user)
                }
            )
        }

    }
)

//Update (overwrite) a User's categoryPref
UserModel.findByUsername("nonie100",
    function (err, user) {
        if (err) {
            return console.error(err);
        } else {

            //Fields to update
            user.categorypref = [{'color': 'red'}, {'color': 'black'}]

            //Save back
            user.save(function (err, user) {

                    //Validate the update
                    console.log("SAVED User IN: %s", user)
                }
            )
        }

    }
)

//Update (Append) a User's categoryPref
UserModel.findByUsername("nonie100",
    function (err, user) {
        if (err) {
            return console.error(err);
        } else {

            //Fields to update
            user.categorypref.push({'color': 'grey'})

            //Save back
            user.save(function (err, user) {

                    //Validate the update
                    console.log("SAVED User IN: %s", user)
                }
            )
        }

    }
)



//Create new Ingredient
let ingre1 = new IngredientModel({
    name: "sugar",
    description: "the sweets",
})

ingre1.save(function (err, ingredient) {
    if (err) {
        return console.error(err);
    } else {
        console.log("Saved ingredient IN: %s", ingredient)
    }
})


//Update (append to) a User's categoryPref
UserModel.appendCategoryPref("nonie100", "white", "sugar",
    function (err, user) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Appended CAT IN: %s", user)
        }
    }
)
