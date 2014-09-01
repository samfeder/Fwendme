FwendMe.Models.User = Backbone.Model.extend({

  urlRoot: "api/users",

  chats: function(){
    if(!this._chats){

      this._chats = new FwendMe.Collections.Chats([], {user: this});
    }

    return this._chats;
  },

  fwends: function(){
    if(!this._fwends){

      this._fwends = new FwendMe.Collections.Fwends([], {user: this});
    }

    return this._fwends;
  },

  parse: function(response) {
    if(response.chats){
      this.chats().set(response.chats, {parse: true});
      delete response.chats;
    }

    if(response.fwends){
      this.fwends().set(response.fwends, {parse: true});
      delete response.fwends;
    }
    return response;
  }

});