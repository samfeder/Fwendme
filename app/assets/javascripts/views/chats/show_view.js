FwendMe.Views.ChatShow = Backbone.CompositeView.extend({

  events:{
    "click #chat-settings-trigger": "renderEdit",
    "click #modal-trigger": "renderModal",
    "click #submit-message": "addMessage",
    'keyup': 'keyEvents'
  },


  template: JST['chats/show'],

  initialize: function(){
    this.collection = this.model.messages()
    this.listenTo(this.model, 'sync', this.render)
    // this.listenTo(this.collection, 'add', this.render);
  },

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

    var newMessageContent = $('#new-message').val()

    var newMessage = this.collection.create({
      content: newMessageContent,
      user_id: window.current_user.id,
      chat_id: this.id
    }, {
      wait: true
    })

    var newMessageView = new FwendMe.Views.MessageShowView({
      model: newMessage,
      options: window.current_user
    })

    this.addSubview('.messages-list', newMessageView)
  },

  // renderModal: function(){
  //   console.log("one day, my son, you shall have a glorious modal")
  // },

  renderEdit: function(){
    $('section.chat-settings').toggleClass('hidden')
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

//How to make it work on enter!
// createOnEnter: function(e) {
//   if (e.keyCode != 13) return;
//   if (!this.input.val()) return;
//
//   Todos.create({title: this.input.val()});
//   this.input.val('');
// },

