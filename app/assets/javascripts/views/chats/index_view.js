FwendMe.Views.ChatIndexView = Backbone.View.extend({


  template: ["chats/index"],

  render: function(){
    var content = his.template({boards: this.collection});
    this.$el.html(content);
    return this;
  }

});