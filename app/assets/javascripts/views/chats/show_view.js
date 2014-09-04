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
    this.listenTo(this.model, 'update sync add change', this.render)

    this.startChannel();
  },

  keyEvents: function(){
    if (event.which == 13){
      event.preventDefault();
      this.$("#submit-message").click();
    }
  },

  startChannel: function(){
    console.log("listening on channel 'chat-" + this.model.id + "'")
    var that = this
    this.channel.bind('postmessage', function(data) {
      var receivedMessage = {
        content: data.content,
        user_id: data.user_id,
        chat_id: that.model.id,
        message_id: data.id
      }
      FwendMe.messages.fetch({
        success: function(){
          var broadcasted = FwendMe.messages.get(receivedMessage.message_id)
          console.log(broadcasted)
          that.broadcastMessage(broadcasted)
        }
      })

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
    console.log(message)
    var newMessageView = new FwendMe.Views.MessageShowView({
      model: message
    })

    this.addSubview('.messages-list', newMessageView)

  },

  renderModal: function(event){

    if (event.currentTarget.name === "modalSettings"){
      var edittingView = new FwendMe.Views.EditSettingsView({
        model: this.model
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
        model: message
      })
      that.addSubview('.messages-list', messageView)
      that.$('.messages-list').append(messageView)
    });
  }

})