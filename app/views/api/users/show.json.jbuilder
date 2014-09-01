json.(@user, :email, :name, :avatar)
#TODO: pass up password digest to confirm password change

json.chats @user.chats, :id, :title, :owner_id, :portrait

json.fwends @user.fwends, :id, :email, :name, :avatar

# Can't think of any reason to send messages through this channel,
# tempting though.