FwendMe.Views.ChatIndexView = Backbone.CompositeView.extend({

  template: JST["chats/index"],

  render: function(){
    var content = this.template({chats: this.collection});
    this.$el.html(content);
    return this;
  }

});