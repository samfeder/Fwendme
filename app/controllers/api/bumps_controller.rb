module Api
  class BumpsController < ApiController


# CURRENT INVALID
    #
    # def create
    #   bump = Bump.find_by_user_id_and_message_id(
    #                               current_user.id,
    #                               bump_params[:message_id])
    #   if !bump
    #     bump = current_user.bumps.new(bump_params)
    #     bump.save!
    #   end
    #   push_bump(bump)
    #   render json: bump
    # end
    #
    # def destroy
    #   @bump = Bump.find(params[:id])
    #   @bump.destroy
    #   render json: {}
    # end
    #
    # def update
    #   @bump = Bump.find(params[:id])
    #   @bump.update(bump_params)
    #   render 200
    # end
    #
    # def index
    #   @message = Message.find(params[:message_id])
    #   @bumps = @message.bumps
    #   render :index
    # end
    #


    private
    def bump_params
      params.require(:bump).permit(:message_id, :snail)
    end


  end
end