FwendMe.Views.EditMembersView = Backbone.CompositeView.extend({

  events: {
    "click .close-modal": "closeModal"
  },

  initialize: function(){
    //this.collection is the current member's fwends.
    // this.fwendables = this.collection.fetch({success: this.fwendables})
  },

  template: JST["chats/edit_members"],

  render: function(){
    console.log(this.model)
    console.log(this.fwendables)
    var content = this.template({
      chat: this.model,
      members: this.model.members
    })
    this.$el.html(content);
    return this
  },

  // fwendables: function(){
  //   currentMemberIds = this.model.members.map(function(member){
  //      return member.attributes.id
  //     }
  //   )
  //
  //   console.log("member id " + currentMemberIds)
  //   console.log(this.collection) //needs to be this.collection.models but apparently needs to be fetched?
  //   soonFwends = this.collection.map(function(fwend){
  //      if(currentMemberIds.indexOf(fwend.attributes.id) === -1 &&
  //         fwend.attributes.id !== window.current_user.id) {
  //           console.log(fwend.attributes.name + " is good")
  //           return fwend
  //         } else {
  //           console.log("parsing out " + fwend.attributes.name)
  //         }
  //      }
  //   )
  //   console.log(soonFwends)
  //   return _.compact(soonFwends)
  // }


})