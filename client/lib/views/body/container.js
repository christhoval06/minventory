Template.container.helpers({
    isCurrentPage: function (page) {
        return Session.get("page") === page;
    },
    getCurrentPage: function () {
        return Session.get("page");
    }
});
Template.container.events({});


