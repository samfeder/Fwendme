FwendMe.Models.Chat = Backbone.Model.extent({

  urlRoot: "/api/chats",

  validate: function(attributes) {
    if (!attributes.title || attribute.title == ""){
      return "cannot have an empty title";
    }
  }

});