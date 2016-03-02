Template.toolbar.onCreated(function () {

});

Template.toolbar.events({
    "click #searchButton": function (event, template) {
        // encodeURIComponent -> encode a string to an encoded url
        var queryValue = template.find("#channelName").value;
        if (queryValue != "") {
            Router.go("channels.search", {search: encodeURIComponent(queryValue)});
            Session.set("query", queryValue);
        }
        event.preventDefault();
        return false;
    },
    "keypress #channelName": function (event, template) {
        if (event.which === 13) {
            var queryValue = template.find("#channelName").value;
            if (queryValue != "") {
                Router.go("channels.search", {search: encodeURIComponent(queryValue)});
                Session.set("query", queryValue);
            }
            event.preventDefault();
            return false;
        }
    }
});

Template.toolbar.helpers({

    queryValue: function () {
        return Session.get("query");
    },
    channelName: function () {
        if (Session.get("channelName")) {
            return Session.get("channelName");
        }
    },
    videoName: function () {
        if (Session.get("videoName")) {
            return Session.get("videoName")
        }
    }
});