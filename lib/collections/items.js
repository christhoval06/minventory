Items = new Mongo.Collection("items");

Meteor.methods({
  'addItem': function(item){
    "use strict";
     // TODO: should there a server validation of item?

    console.log("item name on methods:" + item);

    Items.insert({
      name: item.getName(),
      expDate: item.getExpDate(),
      createdAt: new Date() // current time
    });
  }
});
