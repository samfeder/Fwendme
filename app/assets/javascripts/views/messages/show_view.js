FwendMe.Views.MessageShowView = Backbone.CompositeView.extend({

  events:{
    "click .snail-item": "snailBump",
    "click .bump-item": "fistBump",
    "click .unbump-item": "undoFistBump"
  },

  template: JST["messages/show"],

  initialize: function(){
    this.user = this.model.attributes.user;
    this.channel = FwendMe.Pusher.subscribe('message-' + this.model.id);
  },

  render: function(){
    var that = this
      var content = that.template({
        message: that.model,
        user: that.user
      })
      that.$el.html(content);
    return this;
  }




})