module Api
  class UsersController < ApiController

    before_action :require_signed_in!, except: [:new, :create]
    before_action :require_signed_out!, only: [:new, :create]

    wrap_parameters false

    def new
      @user = User.new
    end

    def create
      @user = User.new(user_params)
      @user.name ||= params["email"]
      if @user.save
        sign_in(@user)
        redirect_to edit_user_url(@user)
      else
        flash.now[:errors] = @user.errors.full_messages
        render json: @user
      end
    end

    def show
      puts params
      @user = User.find(params[:id])
      render :show
    end

    def edit
      @user = current_user
      render json: @user
    end

    def update
      @user = User.find(params[:id])
      if params[:chatAdd]
        ChatMembership.create!(chat_id: chat_add_params[:chatId], user_id: chat_add_params[:memberId])
      end

      @user.update(user_params)
      flash.now[:errors] = @user.errors.full_messages
      render json: @user
    end

    def index
      @users = User.all
      render :index
    end

    private
    def user_params
      params.permit(:password, :email, :name, :avatar)
    end

    def chat_add_params
      params.require(:chatAdd).permit(:memberId, :chatId)
    end


  end
end