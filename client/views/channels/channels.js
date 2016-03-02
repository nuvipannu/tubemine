// Fetch from youtube api
var channelSearch = function () {

    Session.set("spin", true);

    Meteor.call("channelSearch", Session.get("query"), function (err, data) {

        // Flush collection
        Channels.remove({});

        var channelsIds = "";

        data.items.forEach(function (item) {
            channelsIds += item.snippet.channelId + ",";
        });

        Meteor.call("channelsDetails", channelsIds, function (err, channelsData) {
            channelsData.items.forEach(function (channelItemDetail, i) {
                var channelItem = data.items[i];
                channelItem.statistics = channelItemDetail.statistics;
                Channels.insert(channelItem);

                // Build the Saved Channels collection (Mongo DB Collection)
                if (SavedChannels.find({"channelId": channelItem.snippet.channelId}).count() === 0) {
                    SavedChannels.insert({
                        channelId: channelItem.snippet.channelId,
                        channelName: channelItem.snippet.title,
                        channelImageUrl: channelItem.snippet.thumbnails.default.url
                    });
                }
            });

            console.log("Saved Channels [MongoDB] ->", SavedChannels.find({}).fetch());

            Session.set("channelsItems", data.items.length);
            Session.set("spin", false);
        });
    });
};

Template.channels.onCreated(function () {
    Session.set("channelsItems", 0);

    // Auto fetch
    if (this.data && this.data.search) {
        Session.set("query", decodeURIComponent(this.data.search));
    }

    Session.set("channelName", false);
    Session.set("videoName", false);
});

// HTML helpers
Template.channels.helpers({
    channelsCollectionItems: function () {
        return Channels.find({});
    },
    channelsItems: function () {
        return Session.get("channelsItems") > 0
    },
    query: function () {
        if (Session.get("query") != "" && Session.get("query") != Session.get("previousQuery")) {
            Session.set("previousQuery", Session.get("query"));
            channelSearch();
            return true;
        }
        if (Session.get("query") == Session.get("previousQuery")) {
            return true;
        }
        return false;
    },
    spin: function () {
        return Session.get("spin");
    }
});

Template.channelitem.onRendered(function () {
    $('.card .header').popup();
});

Template.channelitem.helpers({
    encodeString: function (string) {
        return encodeURIComponent(string);
    }
});