FwendMe.Views.UserEdit = Backbone.CompositeView.extend({

  events: {
    "click .close-modal": "closeModalNav",
    "click .approve-modal": "submitEdits",
    "change #avatar-file-input": "avatarSelect"
  },

  template: JST['users/edit'],

  render: function(){
    var content = this.template({chat: this.model})
    this.$el.html(content);
    return this;
    },

  closeModalNav: function(){
    //Not my proudest moment... Closing the modal and
    //manually navigating one page back to address the URL
    this.closeModal()
    history.back()
  },

  submitEdits: function(event){
    event.preventDefault()
    var that = this
    var formData = $('.user-edit-form').serializeJSON().user

    this.model.save(formData,

    {
      wait: true,
      success: that.closeModalNav()
    })
  },

  avatarSelect: function(event){
    event.preventDefault()
    var that = this
    var imageFile = event.currentTarget.files[0]
    var reader = new FileReader();

    reader.onloadend = function(){

      that.model.set("avatar", this.result)
      that._updatePreview(this.result)
    }

    if(imageFile){
      reader.readAsDataURL(imageFile);
    } else {
      this._updatePreview("")
    }

  },

  _updatePreview: function(imageData){
    this.$el.find("#user-avatar-preview").attr("src", imageData)
  }


})