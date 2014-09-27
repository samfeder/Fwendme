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

            FwendMe.channels["user-presence"] = FwendMe.Pusher.subscribe('presence-online');

            FwendMe.channels["chat-notifications"] = FwendMe.Pusher.subscribe('chat-notifications');

            FwendMe.chats.forEach(function(chat){
              FwendMe.channels["chat-notifications"].bind(
                              ('add-notification-chat' + chat.id ),
                              function(data) {

                var receivedMessage = {
                  content: data.content,
                  user_id: data.user_id,
                  chat_id: data.chat_id,
                  message_id: data.id,
                  user: data.user
                }

                if((receivedMessage.user_id !== window.current_user.id) &&(receivedMessage.chat_id !== window.currentChat.id)){
                  updatedChat = FwendMe.chats.get(receivedMessage.chat_id);
                  updatedChat.save({"unreads": updatedChat.attributes.unreads + 1});
                  console.log(receivedMessage)

                    $('#push-messages').append(
                      '<div class="push-message group" id="message-' + receivedMessage.message_id + '">' +
                      '<figure class="push-message-avatar"><img class="push-image" src="' + receivedMessage.user.avatar + '">' + '</figure>' +
                      '<div class="pusher-name">' + receivedMessage.user.name + '</div>' +
                      '<div class="pushed-chat">from ' + FwendMe.chats.get(receivedMessage.chat_id).attributes.title + '</div>' +
                      '<div class="push-message-content">' + receivedMessage.content +
                      '</div></div>').slideDown('slow')


                    // setTimeout(function() {
                    //   $("#message-" + receivedMessage.message_id).fadeOut().empty();
                    // }, 5000);

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
