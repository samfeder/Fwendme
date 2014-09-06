class Bump < ActiveRecord::Base

  validates :user_id, :message_id, presence: true

  belongs_to :user, inverse_of: :bumps

  belongs_to :message, inverse_of: :bumps



end
