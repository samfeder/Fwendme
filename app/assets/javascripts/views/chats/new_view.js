FwendMe.Views.NewChatView = Backbone.CompositeView.extend({

  template: JST["chats/new"],

  render: function(){
    var content = this.template({chats: this.collection});
    this.$el.html(content);
    return this;
  }

});