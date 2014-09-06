class ChatMembership < ActiveRecord::Base

  validates :user_id, :chat_id, presence: true

  belongs_to :chat

  belongs_to :user

end
