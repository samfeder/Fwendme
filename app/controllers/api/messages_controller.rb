module Api
  class MessagesController < ApiController
    before_action :require_signed_in!

    def create
      @message = current_user.messages.new(message_params)
      @message.chat_id = params[:format]
      @message.save
      flash.now[:errors] = @message.errors.full_messages
      render json: @message
    end

    def show
      @message = Message.find(params[:id])
      render json: @message
    end

    private
    def message_params
      params.require(:message).permit(:content, :chat_id, :user_id)
    end


  end
end