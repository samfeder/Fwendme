FwendMe.Views.EditMembersView = Backbone.CompositeView.extend({

  events: {
    "click .close-modal": "closeModal",
    "click .add-member": "addMember"
  },


  initialize: function(){
    this.fwendables = this.model.fwendables()
    this.listenTo(this.collection, "sync add change", this.render)
    this.listenTo(this.fwendables, "sync add change", this.render)
  },

  template: JST["chats/edit_members"],

  addMember: function(event){
    var that = this
    event.preventDefault()
    var addedId = $(event.currentTarget).parent().attr("data-id")
    var addedUser = this.fwendables.findWhere({id: parseInt(addedId)})
    addedUser.save(
      {"chatAdd":
        {"memberId": addedId,
         "chatId": this.model.id}
       }, {
         success: function(){
           addedUser.chats().add(that.model)
         }
       }
     )
     that.collection.add(addedUser)
     that.fwendables.remove(addedUser)
  },

  render: function(){
    var content = this.template({
      chat: this.model,
      members: this.collection,
      fwendables: this.fwendables
    })
    this.$el.html(content);
    $('.modal').addClass("edit-members-modal")
    return this
  },
})