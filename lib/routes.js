// No data
Router.route("/", function () {
    this.render("nodata");
}, {
    name: "nodata"
});

// Channels
// /Coca%20Cola
Router.route("/:search", function () {
    this.render("channels", {
        data: {
            search: this.params.search
        }
    });
}, {
    name: "channels.search"
});

// Videos
Router.route("/videos/:channelId/:channelName", function () {
    this.render("videos", {
        data: {
            channelId: this.params.channelId,
            channelName: this.params.channelName
        }
    });
}, {
    name: "videos.channel"
});

// Comments
Router.route("/comments/:videoId/:channelName/:videoName", function () {
    this.render("comments", {
        data: {
            videoId: this.params.videoId,
            channelName: this.params.channelName,
            videoName: this.params.videoName
        }
    });
}, {
    name: "comments.video"
});

// Users
Router.route("/users/list", function () {
    this.render("users");
}, {
    name: "users.list"
});

// User Comments
Router.route("/users/:userName", function () {
    this.render("user", {
        data: {
            userName: this.params.userName
        }
    });
}, {
    name: "users.user"
});

// ALERT !!!! Drop Mongo DB
Router.route("/mongodb/drop/users", function () {
    Meteor.call("dropUsers");
    Router.go("nodata");
});

Router.route("/mongodb/drop/channels", function () {
    Meteor.call("dropSavedChannels");
    Router.go("nodata");
});
