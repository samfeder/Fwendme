class Message < ActiveRecord::Base

  validates :user_id, :chat_id, :content, presence: true

  belongs_to :chat
  belongs_to :user

  has_many :fistbumps, -> { where snailed: false },
                                class_name: "Bump"
  has_many :snails, -> { where snailed: true },
                                class_name: "Bump"


  has_many :bumps, inverse_of: :message

end
