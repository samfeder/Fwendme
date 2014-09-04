FwendMe.Views.ChatShow = Backbone.CompositeView.extend({

  events:{
    "click #chat-settings-trigger": "renderEdit",
    "click .modal-trigger": "renderModal",
    "click #submit-message": "addMessage",
    "click .close-modal": "closeModal",
    'keypress #new-message': 'keyEvents',
    'click .edit-settings': 'editSettings',
    'click .edit-members': 'editMembers'
  },


  initialize: function(){
    this.channel = FwendMe.Pusher.subscribe('chat-' + this.model.id);
    this.collection = this.model.messages()
    this.listenTo(this.model, 'sync add change', this.render)
    this.startChannel();
  },

  editSettings: function(){
    console.log("YO")
    this.model.set({
      title: $('#new-chat-title').val(),
      description: $('#new-chat-description').val(),
      portrait: $('#new-chat-avatar').val(),
    })
    user.save({
      success: this.closeModal()
    })
  },


  keyEvents: function(){
    if (event.which == 13){
      event.preventDefault();
      this.$("#submit-message").click();
    }
  },

  startChannel: function(){
    var that = this
    this.channel.bind('postmessage', function(data) {
      var receivedMessage = {
        content: data.content,
        user_id: data.user_id,
        chat_id: that.model.id
      }
      that.broadcastMessage(receivedMessage);
    });
  },

  template: JST['chats/show'],

  render: function(){
    var content = this.template({
      chat: this.model,
      members: this.members
    })
    this.$el.html(content);
    this._oldMessages();
    return this
  },

  addMessage: function(){
    event.preventDefault();

    var newMessage = {
      content: this.$('#new-message').val(),
      user_id: window.current_user.id,
      chat_id: this.model.id
    }

    this.collection.create( newMessage, {
        wait: true
    })

    this.$('#new-message').val("")

  },

  broadcastMessage: function(message){
    var newMessageView = new FwendMe.Views.MessageShowView({
      model: message
    })

    this.addSubview('.messages-list', newMessageView)

  },

  renderModal: function(event){

    if (event.currentTarget.name === "modalSettings"){
      var edittingView = new FwendMe.Views.EditSettingsView({
        model: this
      })
    }

    else if (event.currentTarget.name === "modalMembers") {
      var edittingView = new FwendMe.Views.EditMembersView({
        model: this
      })
    }

    $('#modal').addClass('modal')
    $('#modal-overlay').addClass('modal-overlay')
    this.addSubview('#modal', edittingView)
    // $('#modal').append(edittingView.render().$el)
  },

  modalMembers: function(){
    $overlay = $('<div id="modal-overlay"></div>');
    $modal = $('<div class="modal"</div>');
    $('body').append($overlay)
    $('body').append($modal)
  },

  renderEdit: function(){
    this.$('section.chat-settings').toggleClass('hidden')
  },

  _oldMessages: function(){
    var that = this
    this.collection.forEach(function(message){
      var messageView = new FwendMe.Views.MessageShowView({
        model: that.parseMessage(message)
      })
      that.addSubview('.messages-list', messageView)
      that.$('.messages-list').append(messageView)
    });
  }

})

// console.log(message)
// var that = this
// FwendMe.users.fetch({
//
//   success: function(){
//
//     var poster = FwendMe.users.get(message.user_id)
//     console.log(message)
//     var newMessageView = new FwendMe.Views.MessageShowView({
//       model: message,
//       options: poster
//     })
//
//     that.addSubview('.messages-list', newMessageView)
//
//   }
//
// });
//
