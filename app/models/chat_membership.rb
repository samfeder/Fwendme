class ChatMembership < ActiveRecord::Base

  validates :user_id, :unread, :chat_id, presence: true

  belongs_to :chat

  belongs_to :user

  def self.add_unreads(current_user_id, chat_id)
    to_save = []

    ChatMembership.where.not(user_id: current_user_id).where(chat_id: chat_id).each do |membership|
      membership.unread += 1
      to_save << membership
    end

    ChatMembership.transaction do
      to_save.each { |membership| membership.save }
    end

  end

end
