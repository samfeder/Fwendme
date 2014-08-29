json.(@chat, :title, :description, :owner_id, :updated_at, :created_at, :portrait)

json.members @chat.users, :id, :email, :avatar

json.messages @chat.messages do |message|
  json.(message, :id, :content, :updated_at, :created_at)
end