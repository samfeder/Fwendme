window.FwendMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    FwendMe.chats = new FwendMe.Collections.Chats();
    new FwendMe.Routers.Router({
      $rootEl: $("#content")
    });
  }
};
