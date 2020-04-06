![éclo logo](/client/public/images/eclo_main_logo.png)


A community-focused, online thrift store built using React, SCSS on the front-end and Ruby on Rails, PSQL on the back-end. You can try on clothes in the virtual dressing room using the Tensorflow API's Posenet model.

We used Figma to create our mockups, Draw.io for our ERDs, and Trello to organize and split up our work.

**Project Contributors:** Frédérique Bordeleau and Gab Richard

## Final Product

Complete walkthrough: https://recordit.co/otHseFCmhk

![Profile and Chat](https://user-images.githubusercontent.com/8763915/78585093-44a52800-7807-11ea-970d-813bdc202272.png)
![Feed and Dressing Room](https://user-images.githubusercontent.com/8763915/78585098-45d65500-7807-11ea-90e6-6be5414ee260.png)


## Dependencies
- React w/ Router
- Ruby on Rails
- ActionCable (web sockets)
- Sass
- Tensorflow API
- Posenet model
- Moment
- Bcrypt
 
## Getting Started
1. Install all dependencies (using `npm install` on the client-side and `bundle install` on the backend-side).
2. Reset the database and seed (rails `db:migrate:reset` followed by `rails db:seed`)
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:3000/>.
4. Start the api server using the `rails s -p 3001` command. The api will be served at <http://localhost:3001/>.
4. Go to <http://localhost:3000/> in your browser.
