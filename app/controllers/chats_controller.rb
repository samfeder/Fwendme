class ChatsController < ApplicationController

  def new
    @chat = Chat.new
  end

  def create
    @chat = current_user.chats.new(chat_params)
    @chat.owner = current_user
    if @chat.save
      redirect_to chat_url(@chat)
    else
      flash.now[:errors] = @chat.errors.full_messages
      fail
      redirect_to :back
    end
  end

  def edit
    @chat = Chat.find(params[:id])
  end

  def update
    @chat = Chat.find(params[:id])
    if @chat.update(chat_params)
      redirect_to chat_url(@chat)
    else
      flash.now[:errors] = @chat.errors.full_messages
      render :edit
    end
  end

  def destroy
    chat = Chat.find(params[:id])
    chat.destroy
    redirect_to user_url(current_user)
  end

  def show
    @chat = Chat.includes(:users, :messages).find(params[:id])
    @messages = @chat.messages.reverse
  end

  def index
    @chats = Chat.all
  end

  private
  def chat_params
    params.require(:chat).permit(:title, :portrait)
  end
end
