FwendMe.Views.ChatListView = Backbone.CompositeView.extend({

  tagName: "ul",

  template: JST["navs/index"],

  initialize: function(){
    this.listenTo(this.collection, "sync add update delete", this.render);
  },

  render: function(){

    var content = this.template({
      chats: this.collection
    });
    this.$el.html(content);
    return this;

  },

})