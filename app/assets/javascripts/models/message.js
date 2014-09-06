FwendMe.Models.Message = Backbone.Model.extend({

  urlRoot: "api/messages",


  initialize: function(){

    this.bumps = new Backbone.Subset([], {
      parentCollection: FwendMe.bumps
    });
    this.bumps.url = "/api/message" + this.id + "/bumps";

  },

  fistbumps: function(){
    if(!this._fistbumps){
      this._fistbumps = new FwendMe.Collections.Bumps([], {message: this});
    }

    return this._fistbumps;
  },

  snails: function(){
    if(!this._snails){
      this._snails = new FwendMe.Collections.Bumps([], {message: this});
    }

    return this._snails;
  },

  parse: function(response) {
    if(response.fistbumps){
      this.fistbumps().set(response.fistbumps, {parse: true});
      delete response.fistbumps;
    }

    if(response.snails){
      this.snails().set(response.snails, {parse: true});
      delete response.snails;
    }

    return response;

  }



});