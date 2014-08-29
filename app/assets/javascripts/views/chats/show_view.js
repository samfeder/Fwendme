FwendMe.Views.ChatShow = Backbone.CompositeView.extend({

  initialize: function(){
    this.collection = this.model.messages()
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.collection, 'add', this.addMessages);
  },

  template: JST['chats/show'],

  render: function(){
    var content = this.template({chat: this.model})
    this.$el.html(content);
    this.addMessages();
    console.log(this)
    return this
  },

  addMessages: function(){
    var that = this
    console.log(this.collection)
    this.collection.forEach(function(message){

      var messageView = new FwendMe.Views.MessageShowView({
        model: message
      })
      that.addSubview('.messages-list', messageView)

      this.$('.messages-list').append(messageView)
    })
  }

})