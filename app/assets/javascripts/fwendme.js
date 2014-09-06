window.FwendMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Welcome to Fwend.Me!')
    FwendMe.chats = new FwendMe.Collections.Chats()
    FwendMe.users = new FwendMe.Collections.Users()
    FwendMe.messages = new FwendMe.Collections.Messages()
    FwendMe.bumps = new FwendMe.Collections.Bumps()
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
