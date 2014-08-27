class MessagesController < ApplicationController
  before_action :require_signed_in!

  def new
    @message = Message.new(chat_id: params[:chat_id])
  end

  def create
    @message = current_user.messages.new(message_params)
    @message.chat_id = params[:format]
    @message.save
    flash.now[:errors] = @message.errors.full_messages
    redirect_to :back
  end

  def show
    @message = Message.find(params[:id])
  end

  private
  def message_params
    params.require(:message).permit(:content, :chat_id, :user_id)
  end


end
