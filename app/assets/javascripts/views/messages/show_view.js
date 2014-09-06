FwendMe.Views.MessageShowView = Backbone.CompositeView.extend({

  events:{
    "click .snail-item": "snailBump",
    "click .bump-item": "fistBump",
    "click .unbump-item": "undoFistBump"
  },

  template: JST["messages/show"],

  initialize: function(){
    this.user = this.model.attributes.user;

    this.fistbumps = this.model.fistbumps();
    this.snails = this.model.snails();

    // this.snailable.... boolean to render snail if bumped already

    this.listenTo(this.fistbumps, "sync add change destroy", this.render);
    this.listenTo(this.snails, "sync add change destroy", this.render);
  },

  fistBump: function(){
    console.log("BUMPED!")
    var bump = this.fistbumps.create({
      user_id: window.current_user.id,
      message_id: this.model.id,
    },
    {
      silent: true,
      wait: true,
    });
  },




  // undoFistBump: function(){
  //   console.log("unbumped.");
  //   var unbump =  this.model.fistbumps().findWhere({
  //     user_id: window.current_user.id
  //   })
  //   unbump.destroy();
  //   console.log(this.model.fistbumps().length);
  // },

  snailBump: function(){

    console.log("Snailed :( !")
  },

  render: function(){
    var content = this.template({
      message: this.model,
      user: this.user,
      snails: this.snails,
      fistbumps: this.fistbumps
    })
    this.$el.html(content);

    return this;
  }




})