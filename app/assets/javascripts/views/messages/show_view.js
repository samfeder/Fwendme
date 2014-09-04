FwendMe.Views.MessageShowView = Backbone.CompositeView.extend({


  //TODO events:{"click #add-like": "add"}

  template: JST["messages/show"],

  initialize: function(options){
    this.user = FwendMe.users.getOrFetch(this.model.user_id)
  },

  render: function(){

    var content = this.template({
      message: this.model,
      user: this.user
    })
    this.$el.html(content);
    return this
  }


})