class ChatsController < ApplicationController

  def new
    @chat = Chat.new
    render :new
  end

  def create
    @chat = current_user.owned_chat.new(chat_params)
    if @chat.save
      redirect_to chat_url(@chat)
    else
      flash.now[:errors] = @chat.errors.full_messages
      render :new
    end
  end

  def edit
    @chat = Chat.find(params[:id])
    render :edit
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
    @chat = Chat.find(params[:id])
    render :show
  end

  def index
    @chats = Chat.all
    render :index
  end

  private
  def chat_params
    params.require([:chat]).permit(:title)
  end
end
