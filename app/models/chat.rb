class Chat < ActiveRecord::Base

  belongs_to :owner,
  class_name: "User",
  foreign_key: :owner_id,
  primary_key: :id

  attr_reader :portrait

  has_many :chat_memberships
  has_many :messages

  has_many :users, through: :chat_memberships, source: :user

  validates :title, :owner_id, presence: true

  has_attached_file :portrait,
  :default_url => "Fwendatar.png",
  :styles => {
    :big => "45x45",
    :small => "45x45"
  }
  validates_attachment_content_type(
    :portrait,
    :content_type => /\Aimage\/.*\Z/
  )
end