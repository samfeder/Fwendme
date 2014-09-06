class Message < ActiveRecord::Base

  validates :user_id, :chat_id, :content, presence: true

  belongs_to :chat
  belongs_to :user

  has_many :bumps, inverse_of: :message
  # has_many :snails <-- Will be a scope of messages with snail == true

end
