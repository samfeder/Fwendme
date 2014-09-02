FwendMe.Routers.FwendRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "chats/:id": "show",
    "users/:id/edit": "edit"
    // "chats/new/:id": "new"
    //
  },

  initialize: function(){
    this.history = [];
    Backbone.history.on('route', function() { this.routesHit++; }, this);
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
    var view = new FwendMe.Views.UserEdit()
    $('#modal').html(view.render().$el)
    console.log("it is done m'lord")
    $('#modal').addClass('modal')
    $('#modal-overlay').addClass('modal-overlay')
  },

  _swapView: function(newView){
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $('.chat-experience').html(this._currentView.render().$el)
  }



});