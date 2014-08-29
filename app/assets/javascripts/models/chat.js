FwendMe.Models.Chat = Backbone.Model.extend({

  urlRoot: "api/chats",

  messages: function(){
    if(!this._messages){

      this._messages = new FwendMe.Collections.Messages([], {board: this});
    }

    return this._messages;
  },

  parse: function(response) {
    if(response.messages){
      this.messages().set(response.messages, {parse: true});
      delete response.messages;
    }
    return response;
  },

  validate: function(attributes) {
    if (!attributes.title || attribute.title == ""){
      return "cannot have an empty title";
    }
  }

});