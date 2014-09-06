FwendMe.Views.MessageShowView = Backbone.CompositeView.extend({

  events:{
    "click #snail-item": "snailBump",
    "click #bump-item": "fistBump"
  },

  template: JST["messages/show"],

  initialize: function(){
    this.user = this.model.attributes.user;
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