FwendMe.Views.ChatShow = Backbone.CompositeView.extend({

  events:{
    "click #chat-settings-trigger": "renderEdit",
    "click #modal-trigger": "renderModal",
    "click #submit-message": "submitMessage"
  },


  template: JST['chats/show'],

  initialize: function(){
    this.collection = this.model.messages()
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.collection, 'add', this.addMessages);
  },

  render: function(){
    var content = this.template({
      chat: this.model,
      members: this.members
    })
    this.$el.html(content);
    this.addMessages();
    return this
  },

  submitMessage: function(){
    var newMessage = $('#new-message').val()
    this.collection.create({
      content: newMessage,
      user_id: this.model.attributes.current_user.id
    }, {
      wait: true
    })
  },

  addMessages: function(){
    var that = this
    this.collection.forEach(function(message){

      var messageView = new FwendMe.Views.MessageShowView({
        model: message
      })
      that.addSubview('.messages-list', messageView)
      this.$('.messages-list').append(messageView)
    })
  },

  renderEdit: function(){
    $('section.chat-settings').toggleClass('hidden')
  },

  renderModal: function(){
    var
    method = {},
    $overlay,
    $modal,
    $content,
    $close;

    method.center = function () {};
    method.open = function (settings) {};
    method.close = function () {};

    return method;
  }

})

