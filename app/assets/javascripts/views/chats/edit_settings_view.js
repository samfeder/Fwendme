FwendMe.Views.EditSettingsView = Backbone.CompositeView.extend({

  events: {
    "click .close-modal": "closeModal",
    "click .edit-settings-button": "submitEdits",
    "change #new-chat-portrait": "portraitSelect"
  },

  template: JST["chats/edit_settings"],

  initialize: function(){
    this.chatImage = ""
  },

  submitEdits: function(event){

    event.preventDefault()

    var that = this

    var formData = $('.edit-chat-form').serializeJSON().chat
    this.model.set("portrait", this.chatImage)
    this.model.save(formData,
    {
      wait: true,
      success: that.closeModal
    })

  },

  portraitSelect: function(event){

    event.preventDefault()

    var that = this
    this.imageFile = event.currentTarget.files[0]
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(this.result)
      that.chatImage = this.result
    }

    if(this.imageFile){
      reader.readAsDataURL(this.imageFile);
    } else {
      this._updatePreview("")
    }
  },

  _updatePreview: function(imageData){
    this.$el.find("#chat-portrait-preview").attr("src", imageData)
  },


  render: function(){
    var content = this.template({
      chat: this.model
    })
    this.$el.html(content);
    return this
  }


})