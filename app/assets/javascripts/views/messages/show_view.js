FwendMe.Views.MessageShowView = Backbone.CompositeView.extend({


  //TODO events:{"click #add-like": "add"}

  template: JST["messages/show"],

  initialize: function(){
    this.user = this.model.attributes.user
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