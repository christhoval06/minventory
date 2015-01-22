/**
 * Created by christhoval on 01/20/15.
 */

Meteor.startup(function () {
    Session.set('resetPassword', false);
    Session.set('isSignUp', false);
    Session.set('forgotPassword', false);
});


Template.accountManager.helpers({
    isSignUp: function () {
        return Session.get('isSignUp');
    }
});


Template.signupForm.events({
    'submit #signup-form': function (e, t) {
        e.preventDefault();
        Accounts.createUser({
            username: t.find('#signup-username').value,
            password: t.find('#signup-password').value,
            email: t.find('#signup-email').value,
            profile: {
                fullname: t.find('#signup-name').value
            }
        }, function (err) {
            if (err) {
                alert("Account is not created");
            }
            else {
                Session.set('isSignUp', false);
            }
        });
    },
    'click button#go-signin': function (e, t) {
        e.preventDefault();
        Session.set('isSignUp', false);
    }
});


Template.logoutForm.events({
    'submit #logout-form': function (e, t) {
        e.preventDefault();

        Meteor.logout(function (err) {
            if (err) {
                alert("Unable to logout from the application");
            }
        });
    }
});


Template.loginForm.helpers({
    isSignUp: function () {
        return Session.get('isSignUp');
    },
    forgotPassword: function () {
        return Session.get('forgotPassword');
    }
});

Template.loginForm.events({
    'submit #login-form': function (e, t) {
        e.preventDefault();
        var unam = t.find('#login-username').value,
            password = t.find('#login-password').value;
        Meteor.loginWithPassword(unam, password, function (err) {
            if (err) {
                alert("Wrong Credentials");
            }
        });
    },
    'click button#create-acount': function (e, t) {
        e.preventDefault();
        Session.set('isSignUp', true);
    },
    'click a#forgot-password': function (e, t) {
        e.preventDefault();
        Session.set('forgotPassword', true);
    }
});


Template.recovery.helpers({
    'resetPassword': function (t) {
        if (Accounts._resetPasswordToken) {
            //Session.set('resetPassword', Accounts._resetPasswordToken);
            Session.set('resetPasswordToken', Accounts._resetPasswordToken);
            Session.set('resetPassword', true);
        }
        return Session.get('resetPassword');
    }
});

Template.recovery.events({
    'submit #recovery-form': function (e, t) {
        e.preventDefault();

        var email = t.find('#recovery-email').value;
        Accounts.forgotPassword({email: email}, function (err) {
            if (err) alert("Unable to send reset link");
            else {
                alert("password reset link send");
                Session.set('forgotPassword', false);
            }
        });
    },
    'submit #new-password-form': function (e, t) {
        e.preventDefault();

        var password = t.find('#new-password-password').value;
        Accounts.resetPassword(Session.get('resetPasswordToken'), password, function (err) {
            if (err) alert('password not changed');
            else alert('password changed')
        });
    },
    'click button#go-signin': function (e, t) {
        e.preventDefault();
        Session.set('forgotPassword', false);
    }
});