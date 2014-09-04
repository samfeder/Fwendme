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

  fwendables: function(){
    console.log("YP")
    if(!this._fwendables){
      this._fwendables = new FwendMe.Collections.Users([], {chat: this});
    }

    return this._fwendable;
  },

  parse: function(response) {
    if(response.messages){
      console.log(response.messages)
      this.messages().set(response.messages, {parse: true});
      delete response.messages;
    }

    if(response.members){
      console.log(response.members)
      this.members().set(response.members, {parse: true});
      delete response.member;
    }

    if(response.fwendables){
      console.log(response.fwendables) //this is breaking :(
      this.fwendables().set(response.fwendables, {parse: true});
      delete response.fwendables;
    }

    return response;

  },

  validate: function(attributes) {
    if (!attributes.title || attributes.title == ""){
      return "cannot have an empty title";
    }
  }

});