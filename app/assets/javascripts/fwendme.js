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
            console.log(FwendMe.users)
            console.log(FwendMe.chats)
            var router = new FwendMe.Routers.FwendRouter();
            Backbone.history.start()
          }
        })
      }
    })
  }
};
