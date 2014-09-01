FwendMe.Views.EditShow = Backbone.CompositeView.extend({

  template: JST['chats/edit'],

  initialize: function(){
    this.collection = this.model.users()
    this.listenTo(this.model, 'sync addt', this.render)
    this.listenTo(this.collection, 'sync add', this.render);
  },

  render: function(){
    var that = this
    var content = that.template({
      chat: that.model,
    })
    that.$el.html(content);
    //Must attach user subview here with checkboxes
    return that;
    },
})