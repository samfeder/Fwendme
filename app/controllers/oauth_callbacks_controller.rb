class OauthCallbacksController < ApplicationController

  def google
    user = User.find_or_create_by_auth_hash
    sign_in(user)

    flash[:success] = "Logged in with google!"
    redirect_to user
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

end
