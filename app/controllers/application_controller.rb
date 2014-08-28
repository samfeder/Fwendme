class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    session[:session_token] = user.session_token
    @current_user = user
  end

  def sign_out
    session[:session_token] = nil
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end

  def require_signed_out!
    redirect_to new_session_url if signed_in?
  end

  def require_membership!
    redirect_to :root unless
    !ChatMembership.where(user_id: current_user.id,
                         chat_id: params[:id]).empty?
  end

end
