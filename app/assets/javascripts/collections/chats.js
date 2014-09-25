FwendMe.Collections.Chats = Backbone.Collection.extend({

  url: "api/chats",

  model: FwendMe.Models.Chat,

  getOrFetch: function(id){
    var chat = this.get(id);

    if(!chat){
      chat = new FwendMe.Models.Chat({ id: id});
      chat.fetch({
        success: function(){
          this.add(chat);
        }.bind(this)
      })
    } else {
      chat.fetch()
    }


    return chat;
  }
});

