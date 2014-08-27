class Message < ActiveRecord::Base

  validates :user_id, :chat_id, :content, presence: true

  belongs_to :chat
  belongs_to :user

end
