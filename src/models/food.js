'use strict';
const mongoose = require ('mongoose');
const foodSchema = new mongoose.Schema ({
  name  : { type : String , required : true },
  type  : { type : String },
});

const FoodModel = mongoose.model('Food',foodSchema);
module.exports = FoodModel;

/// lab 03 //
// const uuid = require ('uuid').v4;

// class Food {
//   constructor (){
//     this.foodDB = [];
//   }
//   read (id){
//     if (id){
//       return this.foodDB.find (record =>  record.id === id);
//     } else {
//       return this.foodDB;
//     }
//   }

//   create (object){
//     const food = {
//       id :uuid (),
//       data : object,
//     };
//     this.foodDB.push (food);
//     return food;
//   }

//   delete (id){
//     this.foodDB = this.foodDB.filter ((item)=> item.id !== id);
//     return this.foodDB;
//   }

//   update (id , object){
//     for (let i =0; i< this.foodDB.length;i++){
//       let foodItem = this.foodDB[i];
//       if (foodItem.id === id){
//         this.foodDB[i].data = object;
//         return this.foodDB[i];
//       }
//     }
//   }
// }

// module.exports = Food;