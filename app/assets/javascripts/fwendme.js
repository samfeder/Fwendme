window.FwendMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    FwendMe.chats = new FwendMe.Collections.Chats()
    FwendMe.users = new FwendMe.Collections.Users()
    FwendMe.messages = new FwendMe.Collections.Messages()
    FwendMe.chats.fetch({
      success: function(){
        FwendMe.users.fetch({
          success: function(){
            var router = new FwendMe.Routers.FwendRouter();
            var sidenav = new FwendMe.Views.ChatListView({collection: FwendMe.chats})
            $('#chat-tray').html(sidenav.render().$el)
            Backbone.history.start()
          }
        })
      }
    })
  }
};
