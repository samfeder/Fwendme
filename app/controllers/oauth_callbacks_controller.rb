class OauthCallbacksController < ApplicationController

  def google
    user = User.find_by_google_auth_hash(auth_hash)

    if !(user)
      user = User.create_by_google_auth_hash(auth_hash)
    end
    sign_in(user)
    flash[:success] = "Logged in with google!"
    redirect_to :root
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

end
