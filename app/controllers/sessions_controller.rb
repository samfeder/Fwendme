class SessionsController < ApplicationController

  def new
    @user = User.new
  end


  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user.nil?
      flash.now[:errors] = ["User/Password combo invalid"]
      render :new
    else
      sign_in(@user)
      redirect_to root_url
    end
  end


  def destroy
    sign_out
    redirect_to new_session_url
  end




end
