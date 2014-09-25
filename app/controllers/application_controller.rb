class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def push_message(message)
    message_hash = {
      user_id: message.user.id,
      content: message.content,
      id: message.id,
      chat_id: message.chat.id
    }

    Pusher.trigger("chat-#{message_hash[:chat_id]}", "postmessage", message_hash)
    Pusher.trigger("chat-notifications", "add-notification-chat#{message_hash[:chat_id]}", message_hash)
  end
# Move this to ApiController?

  def push_bump(bump)
    bump_hash = {
      user_id: bump.user.id,
      message_id: bump.message.id,
      id: bump.id,
      snailed: bump.snailed
    }

    Pusher.trigger("message-#{bump_hash[:message_id]}", "bumpactions", bump_hash)
  end

  def remove_bump(bump)
    bump_hash = {
      user_id: bump.user.id,
      message_id: bump.message.id,
      id: bump.id,
      snailed: bump.snailed,
      remove_bump: true
    }

    Pusher.trigger("message-#{bump_hash[:message_id]}", "bumpactions", bump_hash)
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
