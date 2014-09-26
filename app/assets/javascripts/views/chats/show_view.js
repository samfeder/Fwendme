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
    var that = this
    window.currentChat = this.model
    FwendMe.channels["current-chat"] = FwendMe.Pusher.subscribe('presence-chat-' + this.model.id);

    this.collection = this.model.messages();
    this.members = this.model.members();

    // Don't listen on the model or else we'll
    // overwrite all new messages with each other.

    this.listenTo(this.collection, 'update sync add change', this.render);
    this.addMembers()
    this.startChannels()
  },

  addMembers: function(){
    var that = this;
    this.model.fetch({
      success: function(){
        that.render();
      }
    });
  },

  keyEvents: function(){
    if (event.which == 13){
      event.preventDefault();
      this.$("#submit-message").click();
    }
  },

  startChannels: function(){
    console.log("listening on chat-" + this.model.id)
    var that = this

    FwendMe.channels["current-chat"].bind('postmessage', function(data) {
      console.log(data)
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
          that.model.save({"unreads": 0});
        }
      })

    });

    //online functionality, late fetching is kinda messing with this.

    // FwendMe.channels["user-presence"].bind("pusher:subscription_succeeded", function(member_list){
    //   _.each(_.keys(member_list.members), function(member){
    //     onlineMember = FwendMe.users.getOrFetch(member)
    //     console.log(onlineMember.attributes)
        // $('#status-' + member).addClass('online')
    //   });
    // });

    // FwendMe.channels["user-presence"].bind("pusher:member_added", function(member){
    //   console.log(member)
    //   $('#status-' + member).addClass('online')
    // });
    //
    // FwendMe.channels["user-presence"].bind("pusher:member_removed", function(member){
    //   console.log(member)
    //   $('#status-' + member).removeClass('online')
    // });

  },

  template: JST['chats/show'],

  render: function(){
    var content = this.template({
      chat: this.model,
      members: this.members,
    })

    this.$el.html(content);

    this.collection.forEach(function(oldMessage){
      var oldMessageView = new FwendMe.Views.MessageShowView({
        model: oldMessage,
        collection: oldMessage.bumps
      })
      this.$('.messages-list').append(oldMessageView.render().$el)
    })
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
      model: message,
    })

    this.addSubview('.messages-list', newMessageView)
  $(".chat-messages").animate({ scrollTop: $(".chat-messages")[0].scrollHeight}, 500);
  },

  renderModal: function(event){

    if (event.currentTarget.name === "modalSettings"){
      var edittingView = new FwendMe.Views.EditSettingsView({
        model: this.model
      })
    }

    else if (event.currentTarget.name === "modalMembers") {
      var currentUser = FwendMe.users.getOrFetch(window.current_user.id)
      var edittingView = new FwendMe.Views.EditMembersView({
        model: this.model,
        collection: this.model.members()
      })
    }

    $('#modal').addClass('modal')
    $('#modal-overlay').addClass('modal-overlay')
    this.addSubview('#modal', edittingView)
  },

  modalMembers: function(){
    $overlay = $('<div id="modal-overlay"></div>');
    $modal = $('<div class="modal"</div>');
    $('body').append($overlay)
    $('body').append($modal)
  },

  renderEdit: function(){
    this.$('section.chat-settings').toggleClass('hidden')
  }
})