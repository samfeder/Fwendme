json.(@message, :id, :content, :updated_at, :created_at)
json.partial! 'users', user: @message.user