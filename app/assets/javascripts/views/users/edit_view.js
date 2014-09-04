FwendMe.Views.UserEdit = Backbone.CompositeView.extend({

  events: {
    "click .close-modal": "closeModalNav",
    "click .edit-button": "submitEdits"
  },

  closeModalNav: function(){
    //Not my proudest moment... Closing the modal and
    //manually navigating one page back to address the URL
    this.closeModal()
    history.back()
  },

  submitEdits: function(){
    var that = this
    this.model.set({
      name: $('#new-user-name').val(),
      email: $('#new-user-email').val(),
      avatar: $('#new-user-avatar').val(),
    })
    this.model.save({
      success: console.log(that.closeModalNav())
      })
  },

  template: JST['users/edit'],

  render: function(){
    var content = this.template()
    this.$el.html(content);
    return this;
    }
})