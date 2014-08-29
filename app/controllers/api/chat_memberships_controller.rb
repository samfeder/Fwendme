class Api::ChatMembershipsController < Api::ApiController

  def create

  end

  def new

  end

  def destroy
    @chat_membership = ChatMembership.find(params[:id])
    @chat_membership.destroy
    render json: {}
  end

end
