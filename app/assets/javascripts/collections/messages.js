FwendMe.Collections.Messages = Backbone.Collection.extend({

  url: "api/messages",

  model: FwendMe.Models.Message,

  comparator: function(message) {
    return message.get('id');
  }
});