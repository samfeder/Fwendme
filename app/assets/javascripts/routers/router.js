FwendMe.Routers.FwendRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "chats/:id": "show",
    "users/:id/edit": "editUser"
    // "chats/new/:id": "new"
    //
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

  editUser: function(id){
    var editView = new FwendMe.Views.UserEdit()
    $('#modal').html(editView.render().$el)
    this._addModal(editView)
  },

  _addModal: function(newView){
    this._currentView = newView;
    $('#modal').addClass('modal')
    $('#modal-overlay').addClass('modal-overlay')
  },

  _swapView: function(newView){
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $('.chat-experience').html(this._currentView.render().$el)
  }



});