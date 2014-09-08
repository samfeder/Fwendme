json.(@message, :id, :content, :updated_at, :created_at)
json.partial! 'users', user: @message.user
# json.fistbumps @message.fistbumps, :user_id, :message_id, :snailed
# json.snails @message.snails, :user_id, :message_id, :snailed