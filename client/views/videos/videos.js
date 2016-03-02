// Fetch from youtube api
var videosSearch = function (channelId) {

    Session.set("spin", true);

    Meteor.call("videosSearch", channelId, function (err, data) {

        // Flush collection
        Videos.remove({});

        data.items.forEach(function (item) {
            Videos.insert(item);
        });

        // Reactive Rendering
        Session.set("videosItems", data.items.length);
        Session.set("spin", false);
    });
};

// On load
Template.videos.onCreated(function () {
    videosSearch(this.data.channelId);

    Session.set("previousQuery", "");
    Session.set("videosItems", 0);

    if (this.data && this.data.channelName) {
        Session.set("channelName", decodeURIComponent(this.data.channelName));
    }

    Session.set("videoName", false);
});

// HTML helpers
Template.videos.helpers({
    searchVideosItems: function () {
        return Videos.find({});
    },
    videosItems: function () {
        return Session.get("videosItems") > 0
    },
    spin: function () {
        return Session.get("spin");
    }
});

// HTLM microtemplate helpers
Template.videoitem.helpers({
    formatDate: function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm a');
    },
    channelName: function () {
        return encodeURIComponent(Session.get("channelName"))
    },
    encodeString: function (string) {
        return encodeURIComponent(string);
    }
});