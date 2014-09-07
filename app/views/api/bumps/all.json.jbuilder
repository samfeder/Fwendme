snailed =  []
fistbumped =  []

@bumps.each do |bump|
  if bump.snailed
    snailed << bump
  else
    fistbumped << bump
  end
end

json.snailed snailed, :user_id, :message_id
json.fistbumped fistbumped, :user_id, :message_id
