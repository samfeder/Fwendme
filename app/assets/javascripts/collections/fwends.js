FwendMe.Collections.Fwends = Backbone.Collection.extend({

  model: FwendMe.Models.User,

  getOrFetch: function(id){
    var user = this.get(id);

    if(!user){
      user = new FwendMe.Models.User({ id: id});
      user.fetch({
        success: function(){
          this.add(user);
        }.bind(this)
      })
    } else {
      user.fetch()
    }


    return user;
  }

});