FwendMe.Collections.Users = Backbone.Collection.extend({

  url: "api/users",

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