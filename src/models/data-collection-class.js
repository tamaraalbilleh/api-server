'use strict';

class DataManager {
  constructor (modal){
    this.modal = modal;
  }
  read (id){
    if (id){
      return this.modal.find ({_id : id});
    } else {
      return this.modal.find ({});
    }
  }

  create (object){
    const doc = new this.modal (object);
    return doc.save();
  }

  delete (id){
    return this.modal.findByIdAndDelete (id);
 
  }

  update (id , object){
    return this.modal.findByIdAndUpdate (id,object,{new : true});
    
  }
}

module.exports = DataManager;