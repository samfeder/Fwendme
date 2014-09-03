FwendMe.Views.NewChatView = Backbone.CompositeView.extend({

  template: JST["chats/new"],

  events: {
    "click .close-modal": "closeModalNav",
    "click .edit-button": "createChat"
  },

  closeModalNav: function(){
    //Not my proudest moment... Closing the modal and
    //manually navigating one page back to address the URL
    this.closeModal()
    history.back()
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