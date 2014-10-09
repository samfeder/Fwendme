# fwend.me

[fwendme](http://www.fwend.me) is the a brand-new group chatting app for you to communicate with any number of your frie... I mean fwends.

##features

fwend.me is based off of the functionality of GroupMe, features include

* Real-time messaging. All group members receive your message the second it's pushed.
* Push notifications for whenever you miss a message in another chat.
* Unread messages notifications.
* Full user page. Ability to edit your alias and avatar.
* Create a new chat! Name it whatever you want!
* Functionality to adjust a chat's members list, portrait, and name.
* Assigns all members of a group as your new fwend the moment you interact with them.

##Stack

I experimented with a few technologies, and while a lot of them helped make fwend.me great, some didn't make the cut. Most notably, I had to scrap my personalized node.js server due to time constraints.

If you want to check out the node portion, I appended a quick client-side on it and heroku'd it without a database. check it out:
Code:  (https://github.com/samfeder/Node.Fwends)
Heroku: (http://node-fwends.herokuapp.com/)

Here are some of the tools that I did use:

**Back-End**: fwend.me is built with a Rails 4 RESTful API.

* JSON is packaged and delivered using jBuilder
* PostgreSQL database


**Front-End**: fwend.me's back-end API is consumed by a Backbone.js front-end with the goal of never making the user fully leave the chat room to perform any CRUD operation.

* AJAX is called on the fly to display and submit data to and from the back-end asynchronously
* Pusher is used to push updates to all chat users in real time.
* Backbone.js is prevelent throughout the entire system, being used to create chats and messages, and to edit chats and users.
* jQuery is used extensively in animations and for appending messages to the DOM.

## ToDos

Still on my list of things to do:

* Paginating old messages
* Image Gallery of all shared images
* Email invites
* liking messages
* moar css'es. The stylin' never ends.

## Feedback

> Wow! Cool app! Why'd ya build it?

Glad you asked. I use group chatting everyday as a way to stay in touch with my friends and family, I found it naturally to dive in face-first and take a look under the hood at how it works.

> How much money do you think this has the potential to make for you? I'd guess somewhere in the billions.

You might be slightly exaggerating. Realisitically, I intend to earn a few cool conversations about my design and development principles, stack choices, and hopefully a compliment or two.

> This app has changed my life. Can I be your girlfriend?

No. But if you have a passion for developing in MVC frameworks with a skinny controller and fat model, despise page-loads, and get giddy at the prospect of real-time data package broadcasts, you should get in touch.
