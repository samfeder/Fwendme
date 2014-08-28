class ChatMembershipsController < ApplicationController

  def create

  end

  def new

  end

  def destroy
    @chat_membership = ChatMembership.find(params[:id])
    @chat_membership.destroy
    redirect_to root_url
  end

end
