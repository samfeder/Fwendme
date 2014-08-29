FwendMe.Routers.FwendRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "chats/:id": "show"
    // "chats/new/:id", "new",
    // "chats/:id/edit" "edit"
  },

  index: function(){
    var view = new FwendMe.Views.ChatIndexView({collection: FwendMe.chats})
    this._swapView(view)
  },

  show: function(id){
    var that = this;
    var board = Fwendme.chats.get(id);
    chat.fetch({
      success: function(){
        var view = new FwendMe.Views.ChatShowView({model: chat});
        that._swapView(view);
      }
    })
  },


  _swapView: function(newView){
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $('#main').html(this._currentView.render().$el)
  }


});