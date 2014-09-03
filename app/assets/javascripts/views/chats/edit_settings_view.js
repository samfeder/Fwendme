FwendMe.Views.EditSettingsView = Backbone.CompositeView.extend({

  events: {
    "click .close-modal": "closeModal"
  },

  template: JST["chats/edit_settings"],

  render: function(){
    console.log(this.model)
    var content = this.template({
      chat: this.model
    })
    this.$el.html(content);
    return this
  }


})