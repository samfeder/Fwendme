FwendMe.Views.ChatListView = Backbone.CompositeView.extend({

  tagName: "ul",

  template: JST["navs/index"],

  render: function(){
    console.log("COME ON MAN")
    var content = this.template({
      chats: this.collection
    });
    this.$el.html(content);
    return this;
  }

})