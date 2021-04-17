require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://alechuang:Tebby123@cluster0.5ci10.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model('Person', personSchema);

function createAndSavePerson(done) {
  var alec = new Person(
    { name: "alec", 
      age: 23, 
      favoriteFoods: ["rice", "fish", "more rice"]});
  alec.save(
    function(err, alec) {
      if (err) return done(err);
      done(null, alec)
  });
};

const arrayOfPeople = 
    [
    { name: "ben",
      age: 29, 
      favoriteFoods:['ramen', 'rice', 'wasabi peas']}, 
    { name: "catherine", 
      age: 31, 
      favoriteFoods:['pasta', 'salad', 'bread']
    }, 
    { name: "mom",
      age:59, 
      favoriteFoods:['cream cheese', 'taiwanese foods', 'pumpkin soup']}, 
    { name: "dad",
      age: 59,
      favoriteFoods:['vegetables', 'fruits', 'cup noodles']}
    ];

function createManyPeople(arrayOfPeople, done){
    Person.create(arrayOfPeople, function(err, arrayOfPeople){
      console.log(data)
      if (err) {
        return console.log(err)
      };
    done(null, arrayOfPeople);
  })
};

function findPeopleByName(personName, done){
  Person.find({name: personName}, function(err, data){
    console.log(data)
    if (err) {
      return console.log(err)
    };
  done(null, data);
  })
};

function findOneByFood(food, done){
  Person.findOne({favoriteFoods: [food]}, function(err, data){
    console.log(data)
    if(err){
      return done(err)
    }
    return done(null , data);
  })
};

function findPersonById(personId, done){
  Person.findById(personId, function(err, data){
    console.log(data)
    if(err){return done(err)}
    return done(null, data)
  })
};

function findEditThenSave(personId, done){
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err,data){
    console.log('first pass: ' + data) 
    //favoriteFoods: [ 'spaghetti' ],
    if(err){return done(err)}
    data.favoriteFoods.push(foodToAdd)
    console.log('second pass: ' + data) 
    //favoriteFoods: [ 'spaghetti', 'hamburger' ],
    data.save(function(err, data){
      if(err){return done(err)}
      return done(null, data)
    })
  })
};

function findAndUpdate(personName, done){
  Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, function(err,data){
    if (err) return console.log(err);
    console.log(data);
    return done(null, data)
  })
};

function removeById(personId, done){
  Person.findByIdAndRemove(personId, function(err,data){
    if(err) return console.log(err)
    console.log(data);
    return done(null, data)
  })
};

function removeManyPeople(done){
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},function(err,data){
    if(err) return console.log(err)
    console.log(data);
    return done(null, data)
  })
};

function queryChain(done){
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
            .sort({name: 1})
            .limit(2)
            .select('-age')
            .exec(function(err, data){
              if(err) return console.log(err)
              console.log(data)
              return done(null, data)
            })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
