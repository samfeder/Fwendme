FwendMe.Views.MessageShowView = Backbone.CompositeView.extend({


  //TODO events:{"click #add-like": "add"}

  template: JST["messages/show"],

  render: function(){
    var content = this.template({ message: this.model })
    this.$el.html(content);
    return this
  }


})