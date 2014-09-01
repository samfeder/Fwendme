FwendMe.Models.Chat = Backbone.Model.extend({

  urlRoot: "api/chats",

  messages: function(){
    if(!this._messages){
      this._messages = new FwendMe.Collections.Messages([], {chat: this});
    }

    return this._messages;
  },

  users: function(){
    if(!this._users){
      this._users = new FwendMe.Collections.Users([], {chat: this});
    }

    return this._users;
  },

  parse: function(response) {
    if(response.messages){
      this.messages().set(response.messages, {parse: true});
      delete response.messages;
    }
    return response;

    if(response.users){
      this.users().set(response.users, {parse: true});
      delete response.users;
    }
    return response;

  },

  validate: function(attributes) {
    if (!attributes.title || attribute.title == ""){
      return "cannot have an empty title";
    }
  }

});