window.FwendMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    $(this).ajaxStart(function(){
        console.log('waiting...')
    });
    console.log('Welcome to Fwend.Me!')
    FwendMe.chats = new FwendMe.Collections.Chats()
    FwendMe.users = new FwendMe.Collections.Users()
    FwendMe.messages = new FwendMe.Collections.Messages()
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
