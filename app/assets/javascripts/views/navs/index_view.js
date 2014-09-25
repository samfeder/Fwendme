FwendMe.Views.ChatListView = Backbone.CompositeView.extend({

  tagName: "ul",

  template: JST["navs/index"],

  initialize: function(){
    // window.channel = FwendMe.Pusher.subscribe('chat-' + this.model.id);
    this.listenTo(this.collection, "sync add update delete", this.render);
    // this.startIndexChannels;
  },

  render: function(){

    var content = this.template({
      chats: this.collection
    });
    this.$el.html(content);
    return this;
  },

  // startIndexChannels: function(){
  //
  // }

})