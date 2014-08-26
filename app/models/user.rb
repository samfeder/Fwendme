class User < ActiveRecord::Base

  validate :email, :password_digest, presence: true
  validate :password, length: { minimum: 6, allow_nil: true}

  attr_reader :password

  after_initialize :ensure_session_token
  after_initialize :apply_gravatar #TODO find user's gravatar and link to it.

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

  def apply_gravatar
    self.avatar_link ||= "/fwendme/app/assets/images/avatar.jpg"
  end



end
