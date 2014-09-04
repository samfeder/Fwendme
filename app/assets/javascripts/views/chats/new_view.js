FwendMe.Views.NewChatView = Backbone.CompositeView.extend({

  template: JST["chats/new"],

  events: {
    "click .close-modal": "closeModalNav",
    "click .edit-button": "createChat"
  },

  initialize: function(){
    this.collection = FwendMe.chats
    this.listenTo(this.collection, 'save sync add change', this.chatAdded)
  },

  closeModalNav: function(){
    //Not my proudest moment... Closing the modal and
    //manually navigating one page back to address the URL
    this.closeModal()
    history.back()
  },

  createChat: function(){
    var that = this
    console.log(1)
    var chat = new FwendMe.Models.Chat
    chat.save({
      title: $('#new-chat-title').val(),
      owner_id: window.current_user.id
    }, {
        success: that.closeModalNav()
      }
    )
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }

});