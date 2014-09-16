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

  has_attached_file :settings,
  :default_url => "chat_settings.png",
  :styles => {
    :big => "45x45",
    :small => "45x45"
  }

  has_attached_file :member_icon,
  :default_url => "Fwendatar_alt.png",
  :styles => {
    :big => "45x45",
    :small => "45x45"
  }


  validates_attachment_content_type(
    :portrait,
    :content_type => /\Aimage\/.*\Z/
  )

  def make_fwends
    self.users.each_with_index do |user, i|
      current_fwends = User.find(user.id).fwends.map{ |friend| friend.id }
      (i+1).upto(self.users.length-1) do |j|
        next if current_fwends.include?(self.users[j].id)
        Friendship.create(user_id: self.users[i].id, friend_id: self.users[j].id)
      end
    end
  end

  def is_member?(user)
    self.users.include?(user)
  end


end

  #   group.each_with_index do |member, i|
  #     (i+1).upto(group.length-1) do |j|
  #       next if current_friends.include?([i,j])
  #       Friendship.create(user_id: group[i].id, friend_id: group[j].id)
  #       current_friends << [group[i].id,group[j].id]
  #     end
  #   end
  # end


