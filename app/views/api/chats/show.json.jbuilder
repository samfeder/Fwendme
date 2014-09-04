json.(@chat, :title, :description, :owner_id, :updated_at, :created_at, :portrait)

json.current_user current_user, :id, :email, :avatar

json.fwendables (current_user.fwends - @chat.users).each do |fwendable|
json.(fwendable, :id, :email, :avatar, :name)
end

json.members @chat.users, :id, :email, :avatar, :name

json.messages @chat.messages do |message|
  json.(message, :id, :content, :updated_at, :created_at)
  json.partial! 'users', user: message.user
end