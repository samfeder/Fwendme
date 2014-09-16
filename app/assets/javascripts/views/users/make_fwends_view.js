FwendMe.Views.MakeFwendsView = Backbone.CompositeView.extend({

  initialize: function(){
    this.fwends = this.model.fwends()
    this.listenTo(this.collection, 'sync add delete remove', this.render);
    this.listenTo(this.fwends, 'sync add delete remove', this.render);
  },

  events: {
    "click .close-modal": "closeModalNav",
    "click .add-fwend": "addFwend"
  },

  template: JST['users/fwends'],

  render: function(){
    //Where in this project am I added the current user to my API index?
    var content = this.template({users: this.collection.slice(0, this.collection.length-1)})
    this.$el.html(content);
    return this;
    },

    addFwend: function(event){
      availFwends = this.collection

      event.preventDefault;
      var $fwendFrame = $(event.currentTarget).parent()
      newFwendId = $fwendFrame.attr('data-id');
      newFwend = FwendMe.users.findWhere({id: parseInt(newFwendId)});

      newFwend.save(
        {
          "fwendAdd": {
            "friend_id": newFwendId
          }
        },
          {
          success: function(model, response){
            availFwends.remove(newFwend)
            $('.status-checker').addClass('successAdd').html(response.name + " fwended!")
          }
        }
      )},

  closeModalNav: function(){
    //Not my proudest moment... Closing the modal and
    //manually navigating one page back to address the URL
    this.closeModal()
    history.back()
  }

})