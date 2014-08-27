class User < ActiveRecord::Base

  has_many :owned_chats,
  class_name: "Chat",
  foreign_key: :owner_id,
  primary_key: :id

  has_many :chat_memberships

  has_many :messages

  has_many :chats, through: :chat_memberships, source: :chat

  attr_reader :password

  has_attached_file :avatar,
  :default_url => "Fwendatar.png",
  :styles => {
    :big => "40x40>",
    :small => "40x40#"
  }
  validates_attachment_content_type(
    :avatar,
    :content_type => /\Aimage\/.*\Z/
  )

  validates :email, presence: true
  validates :password_digest, presence: {message: "Password can't be blank"}
  validates :email, uniqueness: { message: "you're already signed up! Sign in instead."}
  validates :password, length: { minimum: 6, allow_nil: true}
  validates :email, length: { minimum: 5 }
  validates :session_token, presence: true


  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return (user && user.valid_password?(password) ? user : nil)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end



