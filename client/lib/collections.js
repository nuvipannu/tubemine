// Search(null) -> Client-side only collections [server ignored]

// Clients Collections
Channels = new Meteor.Collection(null);
Videos = new Meteor.Collection(null);
Comments = new Meteor.Collection(null);

// Server Collections
Users = new Mongo.Collection("users");
SavedChannels = new Mongo.Collection("savedchannels");