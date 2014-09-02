module Api
  class MessagesController < ApiController
    before_action :require_signed_in!

    def create
      @message = current_user.messages.new(message_params)
      puts "Heard you like params, so #{message_params}"
      @message.save
      render json: @message
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