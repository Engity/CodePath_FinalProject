# Web Development Project 7 - Crewmates

Submitted by: Thomas Nguyen

This web app: Create and manage crewmates.
Time spent: 10 hours spent in total


## Required Features

The following **required** functionality is completed:

- [X] **A create form that allows the user to create posts**
- [X] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [X] **A home feed displaying previously created posts**
- [X] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [X] **Clicking on a post shall direct the user to a new page for the selected post**
- [X] **Users can sort posts by either their created time or upvotes count**
- [X] **Users can search for posts by title**
- [X] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [X] **Users can leave comments underneath a post on the post's separate page**
- [X] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [X] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [X] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [ ] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface of the web app
- [X] Users can share and view web videos
- [ ] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [ ] Users can upload images directly from their local machine as an image file
- [ ] Display a loading animation whenever data is being fetched

-Make sure that your form has fields for a title or name and another field for an image URL. 
Your homefeed must display all the posts. Similar to this unit, please make sure that the latest post is on top. 
-The post must have a timestamp, title, and number of upvotes. Make sure that at least these three are in your website.
-Make sure that details of the post can be shown when a post is clicked from the home page. Imagine this being similar to Twitter where you will click a post from the feed and details are shown. The details page must have a unique URL too. Similar with your previous assignments where the details view have a unique url for that particular post. 
-There must be an option to sort the posts by upvotes or by time posted. You can implement this with a button that allows sorting. 
-The details view must be on a separate page where it will allow the user to leave comments underneath the post. 
-The post have an upvote button. And when clicked, the number of votes must increase. 
-Since CRUD operations are part of this course, make sure that you also implemented these. One of the requirements is to make sure that you create, edit and delete a post. 

The following **additional** features are implemented:

The following **additional** features are implemented:

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='./src/assets/walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />
GIF created with ScreenToGif 

## License

    Copyright [2023] [Thomas Nguyen]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.