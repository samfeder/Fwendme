window.FwendMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Welcome to Fwend.Me!')
    FwendMe.chats = new FwendMe.Collections.Chats()
    FwendMe.users = new FwendMe.Collections.Users()
    FwendMe.chats.fetch({
      success: function(){
        FwendMe.users.fetch({
          success: function(){
            var router = new FwendMe.Routers.FwendRouter();
            Backbone.history.start()
          }
        })
      }
    })
  }
};
