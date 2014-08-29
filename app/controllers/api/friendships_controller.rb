class Api::FriendshipsController < Api::ApplicationController

  def create
    @friendship = current_user.friendships.new(friend_id: params[:user_id])
    if @friendship.save
      redirect_to root_url
    else
      render json: ["#{@friendship}.errors.full_messages"], status: 403
    end
  end

end
