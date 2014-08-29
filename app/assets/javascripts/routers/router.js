FwendMe.Routers.FwendRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "chats/:id": "show"
    // "chats/new/:id", "new",
    // "chats/:id/edit" "edit"
  },

  index: function(){
    FwendMe.chats.fetch();

    var view = new FwendMe.Views.ChatIndexView({collection: FwendMe.chats})

    this._swapView(view)
  },

  show: function(id){
    var chat = FwendMe.chats.getOrFetch(id);
    var view = new FwendMe.Views.ChatShow({
      model: chat,
      collection: chat.messages
    });

    this._swapView(view)
  },


  _swapView: function(newView){
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $('main').html(this._currentView.render().$el)
  }


});