// HTML helpers
Template.users.onCreated(function () {
    Session.set("previousQuery", "");
    Session.set("channelName", false);
    Session.set("videoName", false);
});

Template.users.helpers({
    usersCollectionItems: function () {
        console.log("Users [MongoDB] ->", Users.find({}).fetch());
        return Users.find({});
    }
});

Template.useritem.helpers({
    encodeString: function (string) {
        return encodeURIComponent(string);
    }
});