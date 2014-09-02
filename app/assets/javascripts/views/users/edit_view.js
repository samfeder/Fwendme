FwendMe.Views.UserEdit = Backbone.CompositeView.extend({

  events: {
    "click .edit-button": "test",
    "click .close-modal": "closeModal"
  },

  closeModal: function(){
    $('#modal').removeClass('modal')
    $('#modal-overlay').removeClass('modal-overlay')
    history.back()
  },

  test: function(){
    console.log("YO")
  },

  template: JST['users/edit'],

  render: function(){
    var content = this.template()
    this.$el.html(content);
    return this;
    }
})