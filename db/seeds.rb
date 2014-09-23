User.create([{email: "frodo@shire.com", name: "Frodo", password: "password", avatar: File.new("#{Rails.root}/seeds/images/frodo.jpg")},
{email: "pippen@shire.com", name: "Pippen", password: "password", avatar: File.new("#{Rails.root}/seeds/images/pippin.jpg")},
{email: "sam@shire.com", name: "Sam", password: "password", avatar: File.new("#{Rails.root}/seeds/images/sam.jpg")},
{email: "merry@shire.com", name: "Merry", password: "password", avatar: File.new("#{Rails.root}/seeds/images/merry.jpg")},
{email: "bilbo@shire.com", name: "Bilbo", password: "password", avatar: File.new("#{Rails.root}/seeds/images/bilbo.jpg")},

{email: "gandalf@fellowship.com", name: "Gandalf", password: "password", avatar: File.new("#{Rails.root}/seeds/images/gandalf.jpg")},
{email: "boromir@fellowship.com", name: "Boromir", password: "password", avatar: File.new("#{Rails.root}/seeds/images/boromir.jpg")},
{email: "aragorn@fellowship.com", name: "Aragorn", password: "password", avatar: File.new("#{Rails.root}/seeds/images/aragorn.jpg")},
{email: "gimli@fellowship.com", name: "Gimli", password: "password", avatar: File.new("#{Rails.root}/seeds/images/gimli.jpg")},
{email: "legolas@fellowship.com", name: "Legolas", password: "password", avatar: File.new("#{Rails.root}/seeds/images/legolas.jpg")},

{email: "sauron@mordor.com", name: "Sauron", password: "password", avatar: File.new("#{Rails.root}/seeds/images/sauron.jpg")},
{email: "headorc@mordor.com", name: "Orc", password: "password", avatar: File.new("#{Rails.root}/seeds/images/orc.jpg")},
{email: "troll@mordor.com", name: "Troll", password: "password", avatar: File.new("#{Rails.root}/seeds/images/troll.jpg")},
{email: "gollum@precious.com", name: "Gollum", password: "password", avatar: File.new("#{Rails.root}/seeds/images/gollum.jpg")}])


frodo = User.find_by_name("Frodo")
pippen = User.find_by_name("Pippen")
sam = User.find_by_name("Sam")
merry = User.find_by_name("Merry")
bilbo = User.find_by_name("Bilbo")
gandalf = User.find_by_name("Gandalf")
boromir = User.find_by_name("Boromir")
aragorn = User.find_by_name("Aragorn")
gimli = User.find_by_name("Gimli")
legolas = User.find_by_name("Legolas")
sauron = User.find_by_name("Sauron")
orc = User.find_by_name("Orc")
troll = User.find_by_name("Troll")
gollum = User.find_by_name("Gollum")

hobbits = [frodo, pippen, sam, merry, bilbo]
fellowship = [frodo, pippen, sam, merry, gandalf, boromir, aragorn, gimli, legolas]
bad_guys = [sauron, orc, troll]
mount_doom_crew = [frodo, sam, gollum]
middle_earth = [hobbits, fellowship, bad_guys, mount_doom_crew]

Chat.create(title: "Mordor Budz", description: "FIND THOSE HOBBITS", owner_id: sauron.id, portrait: File.new("#{Rails.root}/seeds/images/mordor.jpg"))
Chat.create(title: "Fellowship", description: "For the sanctity of the realm", owner_id: gandalf.id, portrait: File.new("#{Rails.root}/seeds/images/fellowship.jpg"))
Chat.create(title: "Shire", description: "It'll be spring soon, and the orchards will be in blossom...", owner_id: frodo.id, portrait: File.new("#{Rails.root}/seeds/images/theshire.jpg"))
Chat.create(title: "Mount Doom Crew", description: "Hope there's no giant spiders", owner_id: frodo.id, portrait: File.new("#{Rails.root}/seeds/images/mtdoom.jpg"))

mordor_chat = Chat.find_by_title("Mordor Budz")
fellowship_chat = Chat.find_by_title("Fellowship")
shire_chat = Chat.find_by_title("Shire")
mount_doom_chat = Chat.find_by_title("Mount Doom Crew")

Message.create(user_id: boromir.id, chat_id: fellowship_chat.id, content: "One does not simply 'walk' into Mordor.")
Message.create(user_id: gandalf.id, chat_id: fellowship_chat.id, content: "You shall not pass!.")
Message.create(user_id: gimli.id, chat_id: fellowship_chat.id, content: "Never thought I'd die fighting side by side with an elf")
Message.create(user_id: legolas.id, chat_id: fellowship_chat.id, content: "What about a friend?")
Message.create(user_id: gimli.id, chat_id: fellowship_chat.id, content: "Aye, that I can do.")
Message.create(user_id: aragorn.id, chat_id: fellowship_chat.id, content: "Behold! The sword of Elendil!")
Message.create(user_id: frodo.id, chat_id: fellowship_chat.id, content: "LOL you guys are funny!")

Message.create(user_id: frodo.id, chat_id: mount_doom_chat.id, content: "It... It's so heavy Sam.")
Message.create(user_id: sam.id, chat_id: mount_doom_chat.id, content: "Share the load Mr. Frodo!.")
Message.create(user_id: gollum.id, chat_id: mount_doom_chat.id, content: "See? See! He wants it for himselfs")
Message.create(user_id: sam.id, chat_id: mount_doom_chat.id, content: "Shut up you! Go away! Get out of here!")
Message.create(user_id: frodo.id, chat_id: mount_doom_chat.id, content: "No Sam, it's you...")
Message.create(user_id: sam.id, chat_id: mount_doom_chat.id, content: "but... Mr. Frodo...")


ChatMembership.create(user_id: frodo.id, chat_id: fellowship_chat.id)
ChatMembership.create(user_id: merry.id, chat_id: fellowship_chat.id)
ChatMembership.create(user_id: pippen.id, chat_id: fellowship_chat.id)
ChatMembership.create(user_id: sam.id, chat_id: fellowship_chat.id)
ChatMembership.create(user_id: gandalf.id, chat_id: fellowship_chat.id)
ChatMembership.create(user_id: boromir.id, chat_id: fellowship_chat.id)
ChatMembership.create(user_id: aragorn.id, chat_id: fellowship_chat.id)
ChatMembership.create(user_id: gimli.id, chat_id: fellowship_chat.id)
ChatMembership.create(user_id: legolas.id, chat_id: fellowship_chat.id)

ChatMembership.create(user_id: sauron.id, chat_id: mordor_chat.id)
ChatMembership.create(user_id: orc.id, chat_id: mordor_chat.id)
ChatMembership.create(user_id: troll.id, chat_id: mordor_chat.id)

ChatMembership.create(user_id: frodo.id, chat_id: shire_chat.id)
ChatMembership.create(user_id: pippen.id, chat_id: shire_chat.id)
ChatMembership.create(user_id: sam.id, chat_id: shire_chat.id)
ChatMembership.create(user_id: merry.id, chat_id: shire_chat.id)
ChatMembership.create(user_id: bilbo.id, chat_id: shire_chat.id)

ChatMembership.create(user_id: frodo.id, chat_id: mount_doom_chat.id)
ChatMembership.create(user_id: sam.id, chat_id: mount_doom_chat.id)
ChatMembership.create(user_id: gollum.id, chat_id: mount_doom_chat.id)

mount_doom_chat.make_fwends
shire_chat.make_fwends
mordor_chat.make_fwends
fellowship_chat.make_fwends
