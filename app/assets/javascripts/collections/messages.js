FwendMe.Collections.Messages = Backbone.Collection.extend({
  model: FwendMe.Models.Message,

  comparator: function(message) {
    return message.get('id');
  }
});