// HTML helpers
Template.user.onCreated(function () {

    if (this.data && this.data.userName) {
        Session.set("userName", decodeURIComponent(this.data.userName));
    }

    Session.set("channelName", false);
    Session.set("videoName", false);


});

Template.user.helpers({
    userName: function () {
        return decodeURIComponent(Session.get("userName"));
    },
    userComments: function () {
        var user = Users.find({name: Session.get("userName")}).fetch();
        if (user.length > 0) {
            return user[0].comments;
        }
        return [];
    }
});

Template.usercommentitem.helpers({
    formatDate: function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm a');
    },
    parseHTML: function (text) {
        return new Handlebars.SafeString(text);
    },
    channelImageUrl: function (channelId) {
        //console.log(SavedChannels.find({channelId: Session.get("channelId")}).fetch());
        return SavedChannels.find({channelId: channelId}).fetch()[0].channelImageUrl
    },
    encodeString: function (string) {
        return encodeURIComponent(string);
    }
});