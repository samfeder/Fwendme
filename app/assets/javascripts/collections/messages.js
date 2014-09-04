FwendMe.Collections.Messages = Backbone.Collection.extend({

  url: "api/messages",

  model: FwendMe.Models.Message,

  comparator: function(message) {
    return message.get('id');
  },

  getOrFetch: function(id){
    var message = this.get(id);

    if(!message){
      message = new FwendMe.Models.Message({ id: id});
      message.fetch({
        success: function(){
          this.add(message);
        }.bind(this)
      })
    } else {
      message.fetch()
    }


    return message;
  }


});