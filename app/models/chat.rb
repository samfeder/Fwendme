class Chat < ActiveRecord::Base

  belongs_to :owner,
  class_name: "User",
  foreign_key: :owner_id,
  primary_key: :id

  has_many :chat_memberships

  has_many :users, through: :chat_memberships, source: :user

  validates :title, :owner_id, presence: true

  after_initialize :apply_gravatar

  def apply_gravatar
    self.avatar ||= "chat.jpg"
  end


end
