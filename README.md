# **Story Web App**

## Available Scripts

In the project directory, you can run:

* Install node mudules: 
`npm install`

* Start local server: 
`npm start`

## Entry point for project
http://localhost:8900/story


## Server setup and deployment steps
* Check if server has nodejs installed: node -v
* Install nodejs if not available on: install nodejs
* Install PM2, a process manager for Node.js applications: npm install pm2 -g
* Deploy code manually or and CICD pipeline
* Run application: pm2 start app.js


## Design approach and implementation details

### **Storage**
* Story data stored in JSON format. 
* Integrated object base design so that each item will be an object and storing reference of all four sub-children (top, right, bottom and left) 
* On creating of any new child, parent will have reference to child with id and message
* Story modal  
  * id: Int
  * parentId: Int
  *  message: String
  *  children: Object
      * left: Object
        * id: Int
        * Message: String
      * right: Object
        * id: Int
        * Message: String
      * top: Object
        * id: Int
        * Message: String
      * bottom: Object
        * id: Int
        * Message: String
    

### **REST APIs**
* Created two endpoints, one for fetching data for specified object and other one to create new object
* When pass object id to GET endpoint, it will return a story object 
  * e.g. http://localhost:8900/story/0
* To create new story object, call POST enpoint
  * http://localhost:8900/story
  * Pass three parameters
    * message: String -> Message to display
    * parentId: Int -> Under which parent new story will be created
    * position: String -> At what position new story will be created (top, right, bottom or left)
* When new story will be added, POST endpoint will return parent story with updated childs


### **Client Side**
* Have used EJS to render story data
* EJS will take story data as argument and render as HTML page
* To apply some styling added .css file in public/css folder
* When access the starting page with http://localhost:8900/story , route will be redirected to fetch default story data with id = 0
* EJS will render data for story id = 0
* Message will be displayed in the center and four inputs will be created to add childs
* EJS will check if data is available for a child it EJS renders child as clickable link. If there is no data then EJS render child as input form
* On click of any child link, GET endpoint will be called to fetch data for respective story and render same
* To navigate to start of story, click on "Back to the start" link at the top left position