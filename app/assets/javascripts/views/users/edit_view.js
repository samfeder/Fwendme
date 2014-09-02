FwendMe.Views.UserEdit = Backbone.CompositeView.extend({

  template: JST['users/edit'],

  render: function(){
    var content = this.template()
    this.$el.html(content);
    return this;
    }
})