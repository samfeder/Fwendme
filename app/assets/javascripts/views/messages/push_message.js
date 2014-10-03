FwendMe.Views.PushMessageView = Backbone.CompositeView.extend({

  tagName: "li",

  events:{
	  "click .push-link": "destroyNotification"
  },
  
  initialize: function(){
	  this.chat = FwendMe.chats.getOrFetch(this.model.chat_id);
      this.chat.save({"unreads": this.chat.attributes.unreads + 1});
  },

  template: JST["messages/push_message"],

  render: function(){
	  var content = this.template({
	    message: this.model,
		chat: this.chat
	  })
	  this.$el.html(content);
	  return this;
  },
  
  destroyNotification: function(){
	  this.$el.remove()
  }
});