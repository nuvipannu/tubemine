// Fetch from youtube api
var videoComments = function (videoId) {

    Session.set("spin", true);

    Meteor.call("videoComments", videoId, function (err, data) {

        var self = this;

        // Flush collection
        Comments.remove({});

        data.items.forEach(function (item) {
            Comments.insert(item);
        });

        var commentsData = Comments.find({}).fetch();
        commentsData.forEach(function (comment) {
            var snippet = comment.snippet.topLevelComment.snippet;

            var userComment = {
                commentId: comment.snippet.topLevelComment.id,
                textDisplay: snippet.textDisplay,
                updatedAt: snippet.updatedAt,
                likeCount: snippet.likeCount,
                videoId: videoId,
                videoName: Session.get("videoName"),
                channelId: comment.snippet.channelId,
                channelName: Session.get("channelName")
            };

            var userItem = {
                "name": snippet.authorDisplayName,
                "channelId": snippet.authorChannelId,
                "channelUrl": snippet.authorChannelUrl,
                "image": snippet.authorProfileImageUrl.split("?")[0],
                "googlePlusUrl": snippet.authorGoogleplusProfileUrl,
                "comments": []
            };


            // Push Comments
            userItem.comments.push(userComment);

            var user = Users.find({"name": userItem.name});

            // Build the Users collection (Mongo DB Collection)
            if (user.count() === 0) {
                Users.insert(userItem);
            }
            else {
                // check for comments duplicates
                var canPushComment = true;

                var comments = user.fetch()[0].comments;

                comments.forEach(function (c) {
                    if (canPushComment) {
                        if (c.commentId === comment.snippet.topLevelComment.id) {
                            canPushComment = false;
                        }
                    }
                });

                if (canPushComment) {
                    var userID = user.fetch()[0]._id;
                    Users.update(
                        userID,
                        {
                            $push: {
                                comments: userComment
                            }
                        }
                    );
                }
            }

        });

        console.log(Users.find().fetch());

        // Reactive Rendering
        Session.set("spin", false);
        Session.set("videoComments", data.items.length);
    });
};

// On load
Template.comments.onRendered(function () {
    videoComments(this.data.videoId);

    Session.set("previousQuery", "");
    Session.set("videoComments", 0);

    if (this.data && this.data.channelName) {
        Session.set("channelName", decodeURIComponent(this.data.channelName));
    }

    if (this.data && this.data.videoName) {
        Session.set("videoName", decodeURIComponent(this.data.videoName));
    }

});

// HTML helpers
Template.comments.helpers({
    videoComments: function () {
        return Comments.find({});
    },
    commentsItems: function () {
        return Session.get("videoComments") > 0
    },
    spin: function () {
        return Session.get("spin");
    }
});


Template.commentitem.helpers({
    formatDate: function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm a');
    },
    parseHTML: function (text) {
        return new Handlebars.SafeString(text);
    }
});
