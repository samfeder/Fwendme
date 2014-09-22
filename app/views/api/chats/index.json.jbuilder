json.array! @chats do |chat|
  json.(chat, :title, :description, :owner_id, :updated_at, :created_at, :portrait, :settings, :member_icon)
  json.unreads chat.unread(current_user.id)
end