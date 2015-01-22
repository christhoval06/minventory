
Template.addItem.events({
  'submit .new_item': function () {
    'use strict';

    var item = new Item();
    item.setName(event.target.itemName.value);
    item.setExpDate(event.target.itemExpDate.value);

    Meteor.call('addItem', item);

/*
Testing the email alert function

    Meteor.call('sendEmail',
            'notification@gosian.com',
            'afonseca.org@gmail.com',
            'Hello from Meteor!',
            item.toString());*/

    // Clear event target
    event.target.itemName.value = "";
    event.target.itemExpDate.value = "";
    return false;
  }
});


