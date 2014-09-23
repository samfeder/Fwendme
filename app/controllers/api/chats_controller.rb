module Api
  class ChatsController < ApiController

    before_action :require_membership!, only: [:edit, :show]
    wrap_parameters false

    def new
      @chat = Chat.new
      render json: @chat
    end

    def create
      @chat = current_user.chats.new(chat_params)
      @chat.owner = current_user
      if @chat.save
        ChatMembership.create!(chat_id: @chat.id, user_id: @chat.owner.id)
        redirect_to chat_url(@chat)
      else
        flash[:errors] = @chat.errors.full_messages
        redirect_to :back
      end
    end

    def edit
      @chat = Chat.find(params[:id])
      @chat_membership = ChatMembership.where(chat_id: @chat.id, user_id: current_user.id).first
      render :show
    end

    def update
      @chat = Chat.find(params[:id])
      updated_params = chat_params

      if updated_params[:user_ids]
        updated_params[:user_ids] += @chat.users.map { |user| user.id.to_s }
      end

      if @chat.update(updated_params)
        @chat.make_fwends
        render json: @chat
      else
        render json: @chat.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      chat = Chat.find(params[:id])
      ChatMembership.where(chat_id: params[:id]).destroy_all
      chat.destroy
      render json: {}
    end

    def show
      @chat = Chat.includes(:users, :messages).find(params[:id])
      @messages = @chat.messages.reverse
      if @chat.is_member?(current_user)
        @chat.clear_unreads(current_user.id)
        render :show
      else
        render json: {errors: "Can't see this chat"}
      end
    end

    def index
      @chats = current_user.chats
      render :index
    end

    private
    def chat_params
      params.permit(:title, :description, :portrait, user_ids: [])
    end

  end
end
