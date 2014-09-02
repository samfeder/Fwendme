FwendMe.Views.UserEdit = Backbone.CompositeView.extend({

  events: {
    "click .close-modal": "closeModal",
    "click .edit-button": "submitEdits"
  },

  submitEdits: function(){
    var user = FwendMe.users.get(window.current_user)
    user.set({
      name: $('#new-user-name').val(),
      email: $('#new-user-email').val(),
      avatar: $('#new-user-avatar').val(),
    })
    user.save({
      success: this.closeModal()
    })
  },

  template: JST['users/edit'],

  render: function(){
    var content = this.template()
    this.$el.html(content);
    return this;
    }
})