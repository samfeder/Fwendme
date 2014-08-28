class FriendshipsController < ApplicationController

  def create
    @friendship = current_user.friendships.new(friend_id: params[:user_id])
    if @friendship.save
      redirect_to root_url
    else
      flash.new[:errors] = @friendship.errors.full_messages
      redirect_to :back
    end
  end


end
