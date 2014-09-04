json.(@chat, :title, :description, :owner_id, :updated_at, :created_at, :portrait)

json.current_user current_user, :id, :email, :avatar

members =  @chat.users.map {|member| member.id}
fwends = current_user.fwends.map { |fwend| fwend.id }

json.fwendable_ids fwends - members

json.members @chat.users, :id, :email, :avatar, :name

json.messages @chat.messages do |message|
  json.(message, :id, :content, :updated_at, :created_at)
  json.partial! 'users', user: message.user
end