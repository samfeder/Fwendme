window.FwendMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    FwendMe.chats = new FwendMe.Collections.Chats()
    FwendMe.users = new FwendMe.Collections.Users()
    FwendMe.messages = new FwendMe.Collections.Messages()
    FwendMe.channels = {}
    FwendMe.chats.fetch({
      success: function(){
        FwendMe.users.fetch({
          success: function(){
            var router = new FwendMe.Routers.FwendRouter();
            var sidenav = new FwendMe.Views.ChatListView({collection: FwendMe.chats})

            FwendMe.Pusher.subscribe('presence-'+ window.current_user.id);

            FwendMe.channels["chat-notifications"] = FwendMe.Pusher.subscribe('chat-notifications');

            FwendMe.chats.forEach(function(chat){
              FwendMe.channels["chat-notifications"].bind(
                              ('add-notification-chat' + chat.id ),
                              function(data) {

                var receivedMessage = {
                  content: data.content,
                  user_id: data.user_id,
                  chat_id: data.chat_id,
                  message_id: data.id
                }

                if(!receivedMessage.chat_id !== window.currentChat.id){
                  updatedChat = FwendMe.chats.get(receivedMessage.chat_id);
                  updatedChat.save({"unreads": updatedChat.attributes.unreads + 1});
                }

              });
            });

            $('#chat-tray').html(sidenav.render().$el)
            Backbone.history.start()
          }
        });
      }
    });
  }
};
