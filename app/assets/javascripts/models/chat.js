FwendMe.Models.Chat = Backbone.Model.extend({

  urlRoot: "api/chats",

  initialize: function(){
    this.messageList = this.messages()
    this.messageList.url = "api/chats/" + this.id + "/messages";
  },

  messages: function(){
    if(!this._messages){
      this._messages = new FwendMe.Collections.Messages([], {chat: this});
    }

    return this._messages;
  },

  members: function(){
    if(!this._members){
      this._members = new FwendMe.Collections.Users([], {chat: this});
    }

    return this._members;
  },

  parse: function(response) {
    if(response.messages){
      this.messages().set(response.messages, {parse: true});
      delete response.messages;
    }

    if(response.members){

      this.members().set(response.members, {parse: true});
      delete response.member;
    }
    return response;

  },

  validate: function(attributes) {
    if (!attributes.title || attribute.title == ""){
      return "cannot have an empty title";
    }
  }

});