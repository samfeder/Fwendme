FwendMe.Views.NewChatView = Backbone.CompositeView.extend({

  template: JST["chats/new"],

  events: {
    "click .close-modal": "closeModal",
    "click .edit-button": "createChat"
  },

  createChat: function(){
    //Make a collection of chats and plot it in there.
    var chat = new FwendMe.Models.Chat
    chat.set({
      title: $('#new-chat-title').val(),
      owner_id: window.current_user.id
    })
    chat.save({
      success: this.closeModal()
    })
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }

});