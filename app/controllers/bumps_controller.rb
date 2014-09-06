module Api
  class BumpsController < ApiController

    def create
      @bump = current_user.bump.new(params[:message_id])

      @bump.save!

      render 200
    end


    def update
      @bump = Bump.find(params[:id])
      @bump.update(bump_params)
      render 200
    end


    private
    def bump_params
      params.require(:bump).permit(:message_id, :snail)
    end


  end
end