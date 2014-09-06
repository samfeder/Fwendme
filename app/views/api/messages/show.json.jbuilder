json.(@message, :id, :content, :updated_at, :created_at)
json.partial! 'users', user: @message.user
json.bumps @message.bumps, :user_id, :message_id, :snailed