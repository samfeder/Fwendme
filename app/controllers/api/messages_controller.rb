module Api
  class MessagesController < ApiController
    before_action :require_signed_in!

    def create
      message = current_user.messages.create!(message_params)
      ChatMembership.add_unreads(current_user.id)
      push_message(message)
      head :created
    end

    def index
      @messages = Message.all
      render :index
    end

    def show
      @message = Message.find(params[:id])
      render :show
    end

    private
    def message_params
      params.permit(:content, :chat_id, :user_id)
    end


  end
end