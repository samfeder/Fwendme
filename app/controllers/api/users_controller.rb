module Api
  class UsersController < ApiController

    before_action :require_signed_in!, except: [:new, :create]
    before_action :require_signed_out!, only: [:new, :create]

    def new
      @user = User.new
    end

    def create
      @user = User.new(user_params)
      @user.name ||= params["user"]["email"]
      if @user.save
        sign_in(@user)
        redirect_to edit_user_url(@user)
      else
        flash.now[:errors] = @user.errors.full_messages
        render json: @user
      end
    end

    def show
      @user = current_user
      render :show
    end

    def edit
      @user = current_user
      render json: @user
    end

    def update
      @user = User.find(params[:id])
      @user.update(user_params)
      flash.now[:errors] = @user.errors.full_messages
      render json: @user
    end

    def index
      @users = User.all
      render json: @users
    end

    private
    def user_params
      params.require(:user).permit(:password, :email, :name, :avatar)
    end


  end
end