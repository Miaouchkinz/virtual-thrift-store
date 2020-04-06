![éclo logo](/client/public/images/eclo_main_logo.png)

# Éclo

A community-focused, online thrift store built using React, SCSS on the front-end and Ruby on Rails, PSQL on the back-end. You can try on clothes in the virtual dressing room using the Tensorflow API's Posenet model.

We used Figma to create our mockups, Draw.io for our ERDs, and Trello to organize and split up our work.

**Project Contributors:**
- [Frédérique Bordeleau](https://github.com/fredbordel)
- [Gab Richard](https://github.com/Miaouchkinz)

## Final Product

Complete walkthrough: https://recordit.co/otHseFCmhk

Profile Convos and Chat Window

![Profile and Chat](https://user-images.githubusercontent.com/8763915/78585285-9352c200-7807-11ea-819b-75e5118dd0c6.png)

Available Clothing Feed and Virtual Dressing Room

![Feed and Dressing Room](https://user-images.githubusercontent.com/8763915/78585098-45d65500-7807-11ea-90e6-6be5414ee260.png)


## Dependencies
- React w/ Router
- Ruby on Rails
- ActionCable (web sockets)
- Sass
- Tensorflow API
- Posenet model
- Bcrypt
 
## Getting Started

### Front-End Setup
Install dependencies and start server on <http://localhost:3000/>

Run these commands from the root directory:
```
cd client
npm i
npm run start
```

### Back-End Setup
Install dependencies, reset and seed database, and start API server on <http://localhost:3001/>

Run these commands from the root directory:
```
cd backend
bundle i

rails db:migrate:reset
rails db:seed

rails s -p 3001
```
