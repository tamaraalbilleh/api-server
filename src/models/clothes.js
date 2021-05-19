'use strict';
const mongoose = require ('mongoose');
const clothesSchema = new mongoose.Schema ({
  name : { type : String , required : true},
  color  : { type : String},
});

const ClothesModal = mongoose.model ('clothes' , clothesSchema);
module.exports = ClothesModal;


// lab 03 
// const uuid = require ('uuid').v4;

// class Clothes {
//   constructor (){
//     this.clothesDB = [];
//   }
//   read (id){
//     if (id){
//       return this.clothesDB.find (record =>  record.id === id);
//     } else {
//       return this.clothesDB;
//     }
//   }

//   create (object){
//     const clothes = {
//       id :uuid (),
//       data : object,
//     };
//     this.clothesDB.push (clothes);
//     return clothes;
//   }

//   delete (id){
//     this.clothesDB = this.clothesDB.filter ((item)=> item.id !== id);
//     return this.clothesDB;
//   }

//   update (id , object){
//     for (let i =0; i< this.clothesDB.length;i++){
//       let clothesItem = this.clothesDB[i];
//       if (clothesItem.id === id){
//         this.clothesDB[i].data = object;
//         return this.clothesDB[i];
//       }
//     }
//   }
// }

// module.exports = Clothes;