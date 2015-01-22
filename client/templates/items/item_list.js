Template.itemList.helpers({
  'items' : function () {
     return Items.find({}, {sort: {expDate: 1}});
   }
});