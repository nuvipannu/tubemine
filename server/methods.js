var Future = Npm.require('fibers/future');

Meteor.methods({

    // Drop Users from Mongo DB
    dropUsers: function () {
        return Users.remove({});
    },

    dropSavedChannels: function () {
        return SavedChannels.remove({});
    },


    // Channels Search
    channelSearch: function (inputValue) { // <- Javascript Function (when you call it, it returns something)

        var future = new Future(); // 1

        YoutubeApi.search.list({ // 2
            "part": "snippet",
            "q": inputValue,
            "type": "channel",
            "maxResults": 49
        }, function (err, searchData) {

            if (err) {
                return console.log("error", err);
            }

            // Synch return to the client
            future.return(searchData); // <- return the future // 4
        });

        return future.wait(); // <- wait to return until the future is returned // 3
    },

    // Channels Details
    channelsDetails: function (channeldIds) {

        var future = new Future();

        YoutubeApi.channels.list({
            "part": "statistics",
            "id": channeldIds,
            "maxResults": 49
        }, function (err, channelsData) {

            if (err) {
                return console.log("error", err);
            }

            // Synch return to the client
            future.return(channelsData);
        });

        return future.wait();
    },

    // Videos Search (by Channel ID)
    videosSearch: function (channelId) {

        var future = new Future();

        //search for the comments and store them
        YoutubeApi.search.list({
            "part": "snippet",
            "type": "video",
            "channelId": channelId,
            "maxResults": 49
        }, function (err, searchData) {

            if (err) {
                return console.log("error", err);
            }

            // Synch return to the client
            future.return(searchData);
        });

        // return data to the client
        return future.wait();
    },

    videoComments: function (videoId) {

        var future = new Future();

        YoutubeApi.commentThreads.list({
            "part": "snippet",
            "order": "relevance",
            "videoId": videoId,
            "maxResults": 99
        }, function (err, data) {

            if (err) {
                return console.log("error", err);
            }

            // Synch return to the client
            future.return(data);
        });

        return future.wait();
    }

});