class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.name ||= params["user"]["email"]
    if @user.save
      sign_in(@user)
      render :show
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = current_user
    render :show
  end

  def edit
    @user = current_user
    render :edit
  end

  def update
    @user = User.find(params[:id])
    if @user.update
      render :show
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  def index
    @users = User.all
    render :index
  end

  private
  def user_params
    params.require(:user).permit(:password, :email)
  end


end
