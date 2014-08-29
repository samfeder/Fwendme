FwendMe.Views.EditShow = Backbone.CompositeView.extend({

  template: JST['chats/edit'],

  render: function(){
    var content = this.template({chat: this.model})
    this.$el.html(content);
    return this
  },

})