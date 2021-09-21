# insta-feed-clone
On this project, I challenged myseld to code an Instagram Feed Clone with infinite scroll, using only HTML, CSS and Javascript (No Frameworks or libraries).


## Generating users
To create fictional users, I used two different APIs:
Fisrt of them was [FakeFace API](http://fakeface.rest/), wich allowed me to use artificially created profile pictures.
Then I used Random [User Generator API](https://randomuser.me/) to generate random data, like username and gender.


## Generating posts
All of the posts follow the card template available on this [repo](https://github.com/sameoldcarlos/instagram-card-clone).
As long as the user reach the end of the page, new posts are generated, simulating the real behavior of Instagram Feed.

### Posts content
In the same way of users, the pictures showed on posts are generated through the use of an API (https://www.pexels.com);
At this point, project still doesn't support videos (maybe in future updates).
I did myself a function to generate posts descriptions and comments.

## Available functions
On this project the following functions are available:
1. Like posts and comments (You can like a post by double clicking it or just click on the 'heart' button);
2. Comment on posts;
3. 'Save' posts;
4. Access the "Three dots" menu;
5. Slide pictures through arrows and touchscreen;
6. Infinite scroll;