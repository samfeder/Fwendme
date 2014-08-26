class SessionsController < ApplicationController

  def new

  end


  def create
    user = User.find_by_credentials(
      params[:user][:email]
      params[:user][:password]
    )

    if user
      sign_in(user)
      render :json "signed in"
    else
      flash.now[:errors] = ["User not found"]
      render :new
  end


  def destroy
    sign_out
    redirect_to new_session_url
  end




end
