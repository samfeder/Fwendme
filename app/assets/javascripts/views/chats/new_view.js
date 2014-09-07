FwendMe.Views.NewChatView = Backbone.CompositeView.extend({

  template: JST["chats/new"],

  events: {
    "click .close-modal": "closeModalNav",
    "click .approve-modal": "createChat",
	'keypress .click-event': 'keyEvents',
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
  

  keyEvent: function(){
    if (event.which == 13){
      event.preventDefault();
      $("#create-chat").click();
    }
    if (event.which == 27){
      event.preventDefault();
      $(".close-modal").click();
    }
  },
  

  createChat: function(){
    var that = this
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