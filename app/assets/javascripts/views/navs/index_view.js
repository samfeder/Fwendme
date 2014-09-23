FwendMe.Views.ChatListView = Backbone.CompositeView.extend({

  tagName: "ul",

  template: JST["navs/index"],

  render: function(){
    var content = this.template({
      chats: this.collection
    });
    this.$el.html(content);
    return this;
  }

})