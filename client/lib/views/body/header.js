Template.header.helpers({});
Template.header.events({
    'click a.navbar-brand': function (e, t) {
        e.preventDefault();
        Session.set("page", "dashboard");
    }
});
