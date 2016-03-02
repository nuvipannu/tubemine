Meteor.startup(function () {
    initializeYoutube();
});

var initializeYoutube = function () {
    YoutubeApi.authenticate({
        type: "key",
        key: "AIzaSyCMpviFC2AZrekJ7mTq5QHX287fwMn4wJE"
    });
};
