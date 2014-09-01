FwendMe.Routers.FwendRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "chats/:id": "show",
    "chats/:id/edit": "edit"
    // "chats/new/:id": "new"
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

  edit: function(id){
    var chat = FwendMe.chats.getOrFetch(id);
    var editView = new FwendMe.Views.EditShow({
      model: chat,
      collection: chat.fwends
    });
    console.log(editView)
    this._swapView(editView)
  },


  _swapView: function(newView){
    console.log(newView.$el[0])
    console.log("YO!")
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $('main').html(this._currentView.render().$el)
  }


});