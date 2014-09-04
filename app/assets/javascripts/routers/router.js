FwendMe.Routers.FwendRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "chats/:id": "show",
    "users/:user_id/chats/new": "newChat",
    "users/:id/edit": "editUser"
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

  newChat: function(user_id){
    var newChatView = new FwendMe.Views.NewChatView()
    $('#modal').html(newChatView.render().$el)
    this._addModal(newChatView)

  },

  editUser: function(id){
    var currentUser = FwendMe.users.getOrFetch(window.current_user.id)
    var editView = new FwendMe.Views.UserEdit({model: currentUser})
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