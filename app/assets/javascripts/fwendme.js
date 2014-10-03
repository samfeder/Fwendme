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
			
            var sidenav = new FwendMe.Views.ChatListView({collection: FwendMe.chats});
            $('#chat-tray').html(sidenav.render().$el);
			
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
                };

                if( (receivedMessage.user_id !== window.current_user.id) 
				&& 
				(receivedMessage.chat_id !== window.currentChat.id)  ){
				
					var pushMessage = new FwendMe.Views.PushMessageView({model: receivedMessage});
					$('#push-messages').append(pushMessage.render().$el)
					$("#message-" + receivedMessage.message_id).slideToggle('slow')
				
							//                     setTimeout(function() {
							//                         $("#message-" + receivedMessage.message_id).fadeOut('slow', function(){
							// $(this).parent().remove()
							//                         });
							//                     }, 5000);
				};
              });
            });
            Backbone.history.start()
          }
        });
      }
    });
  }
};
