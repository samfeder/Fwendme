module Api
  class MessagesController < ApiController
    before_action :require_signed_in!

    def create
      @message = current_user.messages.new(message_params)
      if @message.save
        puts Pusher
        Pusher.trigger("chat-#{@message.chat.id}",
                       'postmessage',
                       {
                         user_id: @message.user.id,
                         content: @message.content,
                         id: @message.id
                       }
                       )
        # render json: @message
      else
        render json: @message.errors.full_messages
      end
    end

    def index
      @messages = Message.where(chat_id: params[:chat_id])
      render json: @messages
    end

    def show
      @message = Message.find(params[:id])
      render json: @message
    end

    private
    def message_params
      params.permit(:content, :chat_id, :user_id)
    end


  end
end