FwendMe.Models.Chat = Backbone.Model.extend({

  urlRoot: "api/chats",

  initialize: function(){
    this.messageList = this.messages()
    this.messageList.url = "api/chats/" + this.id + "/messages";
    this.fwendable_ids
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

    if(response.fwendable_ids){
      this.fwendable_ids = response.fwendable_ids
      console.log(this.fwendable_ids)
      delete response.fwendable_ids
    }

    if(response.members){

      this.members().set(response.members, {parse: true});
      delete response.member;
    }
    return response;

  },

  validate: function(attributes) {
    if (!attributes.title || attributes.title == ""){
      return "cannot have an empty title";
    }
  }

});