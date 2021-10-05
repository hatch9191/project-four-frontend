# GA Project Four - Painterest
---

## Table of Contents

- Project Overview
- The Brief
- Technologies Used
- Code Installation
- Project Timeline
- Challenges
- Wins
- Bugs
- Future Improvements
- Key Learnings

## Project Overview

This project was a really exciting one as it gave us the chance to perhaps be a bit more ambitious than we had been in project three. This was our first project after learning Python and a chance to build a server using Django. As Django uses a relational database model, we felt this was a great opportunity to try out user-to-user interactions like messaging and following under the guise of a social-media/sharing platform. Therefore we created Painterest, no prizes for guessing which site it is inspired by. 

Please feel free to create your own account or login using the following credentials:

username - Harry
password - pass

You can view the deployed project [HERE](https://bit.ly/3me6jAg).

### Project Partner

Eoin Barr - [https://github.com/eoin-barr](https://github.com/eoin-barr)

<p align="center">
  <img src="https://res.cloudinary.com/dn11uqgux/image/upload/v1633442247/project-setup-test/Screenshot_2021-10-05_at_14.55.32_aj7oq7.png" />
</p>

## The Brief

- Build a full-stack application by making your own backend and your own frontend.
- Use a Python Django API using Django REST Framework to serve your data from an SQL database.
- Consume your API with a separate front-end built with React.
- Be a complete product with multiple relationships and CRUD functionality for at least a couple of models.
- Implement thoughtful user stories/wireframes.
- Be deployed online so it's publicly accessible.

## Technologies Used

### Backend
- Python
- Django
- Django REST Framework
- Psycopg2
- pyJWT
- PostgreSQL

### Frontend
- React
- JSX
- Axios
- SCSS
- Bootstrap
- React Bootstrap
- React Router Dom
- React Cloudinary Upload Widget
- React Select

### Dev Tools
- Visual Studio Code (with Live Share)
- npm
- Insomnia
- TablePlus
- Git
- Github
- Firefox Developer Edition
- Excalidraw (Wireframing)
- Netlify (Frontend Deployment)
- Heroku (Backend Deployment)
- Zoom
- Slack

## Code Installation:

- From the server folder, install backend dependencies from the CLI using: `pip install pipenv`
- Enter Shell for project: `pipenv shell`
- Make Migrations: `python manage.py makemigrations`
- Migrate: `python manage.py migrate`
- Load Seed data for Users: `python manage.py loaddata jwt_auth/seeds.json`
- Load Seed data for Posts: `python manage.py loaddata posts/seeds.json`
- Load Seed data for Chats: `python manage.py loaddata chats/seeds.json`
- Start backend server: `python manage.py runserver`
- From the client folder, install frontend dependencies: `npm i`
- Start frontend server: `npm run dev`

## Project Timeline

### Day 1-3 - Planning & Backend Build

Eoin and I decided to partner for our second project together as we were both keen to use Django to create a user-touser-messaging service nested within some kind of social-media or sharing site. I particularly liked the idea of Pinterest as inspiration for this. 

As we had a clear concept for the task ahead it didn’t take too long to get going on our initial planning stages, creating a list of core and stretch goals and also building out a fairly detailed wireframe (see image below).

<p align="center">
  <img src="https://res.cloudinary.com/dn11uqgux/image/upload/v1633442735/project-setup-test/p4_wexk13.png" />
</p>

Our concept was clear so planning didn’t take long, which left us plenty of time to try and get our heads around how we would be able to make user-to-user messaging working. Using an ERD diagram to help visualise the relationships, we spent a couple of hours discussing the theory behind it and doing some research. There weren’t many examples of what we were trying to achieve online, but a couple of examples used WebSockets to get the instant messenger feel. This was what we wanted ideally but didn’t feel that bringing in a technology we weren’t familiar with was a good idea with such tight time constraints. 

We settled on creating a ‘chatroom’ for each user-to-user message conversation that would enable us to check if conversations already existed between the two users. The Chats would then lend their primary key to all the messages sent between the users. 

With our theory now clear, we first built out the rest of the backend that we were confident in doing before tackling the messaging views. I had found out that there were some interesting ways to filter in Django. Using the `Q` object we could make more complicated and/or statements (see code below). It was fantastic when we tested this to find it worked as the documentation on this was pretty sparse. 

```python
class ChatListView(APIView):
   # filtered chats to find chat of user and profile the user is on
   permission_classes = (IsAuthenticated, )
 
   def get(self, request, profile_pk):
       sender = request.user.id
       recipient = profile_pk
       chats = Chat.objects.filter(
           (Q(user_a=sender) & Q(user_b=recipient)) |
           (Q(user_b=sender) & Q(user_a=recipient)))
       serialized_chat = CreateChatSerializer(chats, many=True)
       return Response(serialized_chat.data, status=status.HTTP_200_OK)
```

If the Chat relationship between two users existed we could then show their messages with a view using the Chat primary key or if no relationship existed yet we could use the ChatCreateView to make a new chat between them.

We also created a number of other Chat views at the time with similar methods whilst Eoin also found he needed to make a couple of message views whilst he was working on the frontend elements for this. 

Another key aspect of the social media element of the site was a Follow function. We wanted to create a toggle function for ease of use on the frontend. This was similar in theory to the Favourite function used in our Project 3, whereby we checked if the User is already following the target User, if so removing them from that follow list, otherwise adding them to it.

```python
class UserFollowView(APIView):
   # follow user toggle   
   permission_classes = (IsAuthenticated, )
 
   def post(self, request, pk):
       try:
           user_to_follow = User.objects.get(pk=pk)
       except User.DoesNotExist:
           raise NotFound()
       if request.user in user_to_follow.followed_by.all():
           user_to_follow.followed_by.remove(request.user.id)
       else:
           user_to_follow.followed_by.add(request.user.id)
       serialized_followed_user = UserProfileSerializer(user_to_follow)
       return Response(serialized_followed_user.data, status=status.HTTP_202_ACCEPTED)
```

### Day 4-6 Filtering Post Queries in the Backend

Although Eoin and I had worked together on the backend theory and functionality for the messaging requests, he took charge of implementing this on the frontend whilst he also built out some of the profile page elements. I was tasked with building the rest of the site, but I was also keen to try to push myself to learn a few things that we hadn’t covered in the course. 

My main concentration was the search bar. After I had found out about filtering on the backend whilst working on our chatlist view controller I was inspired to try something similar with filtering searches.

I used a slightly different method for this filter. I had picked up from using websites that the URL often changes and you get a pattern similar to `search?key=value`. I thought this would also be cool to try as I could have users use the back arrows on their browser to go back to the same search results (not something that was possible in my Project 3). I found that `window.history.replaceState` would be the right tool here. 

Through reading through the documentation I found out that Django has some powerful search operators that could help me with this task. I used `__icontains` and would take the query from the url request (see code below).

```python
class PostFilterView(ListAPIView):
   # show filtered posts
 
   def get(self, request):
       print(request.GET['q'])
       filteredPosts = Post.objects.filter(title__icontains = request.GET['q'])
       serialized_post = PostSerializer(filteredPosts, many=True)
       return Response(serialized_post.data, status=status.HTTP_200_OK)
```

I was able to test this in Insomnia and came out well therefore I moved onto the search bar itself. I thought that the React Select async bar might be the right tool for this job. I read about how to use it and I checked that I was able to manipulate the styling in the way I wanted. All seemed to be working well. 

One of the cool things about the React Select async bar is it can display load options as you type in a search term. The below function shows how it returned those results in the frontend for React Select to use.

```javascript
 const loadOptions = async () => {
   const res = await filterPosts(query)
   setFilteredPosts(res.data)
   return res.data
 }
```

My original plan was to have a submit function that would push the user via an `if, else if` statement to a matching post (if title was < 1), or a set of matching results if more than one result, or if nothing was typed you could go back to the unfiltered posts page. Unfortunately I was not able to find a way to turn off the React Select auto-select functionality as this prop has not yet been created (see code below).

```javascript
return (  
  <>   
    <Form onSubmit={handleSubmit}>
       <AsyncSelect
         placeholder="Search"
         isClearable
         defaultOptions={posts}
         loadOptions={loadOptions}
         styles={styles}
         onInputChange={(value) => setQuery(value)}
         onChange={(value) => setQuery(value)}
         value={query}
       />
     </Form>
  </>
)
```

I did find that there was some work around with a `useRef`, however I had spent far too long on this issue by now and was looking to move on. Rather annoyingly this meant I wasn’t able to implement all of the functionality I had been working on. In the end we simply have a search bar which gives you a filtered list of post titles you can choose from which was fine as I had learnt lots from the process anyway. 

### Day 7-8 - Custom Footer, Polishing Off Styling, Testing & Seeding

One of the custom styling components I had particular fun making was the Footer. I found the use of state in React a really helpful tool for implementing this quickly to show or hide it depending on various parameters. The styling was also a triumph in my opinion, heavily influenced by the Footer from Pinterest, it is simple but effective. 

Other final touches were needed, for instance the form input fields needed unifying whilst the Comments section on the Posts were very fiddly to deal with and place correctly. A great suggestion from Eoin was to have them order from the bottom of the box and push up the div on each new comment. This was a cool idea and similar to his messaging concept.

After doing numerous run-throughs of the user journey we were confident that the site held up well under scrutiny and we could start creating a seeds file for our posts. As the concept of the site is so visual, we decided to really go for it with our entries and made 120 posts to go on the site. It really helped make the site feel real, but did have the side effect of longer loading times on the Posts index page. 

## Challenges
- I spent far too much time on the search bar functionality once I started having issues with React Select. I tried to fix the issue but was not able to and then thought about finding a new dropdown search bar but felt this might take far too long to implement as well. Instead I chose to reign in the functionality in favour of spending more time elsewhere. 
- We spent a lot of time discussing the messages functionality before writing it up in code. We found the theory behind it very interesting to discuss but difficult to fully get our heads around in the early stages. We were extremely happy that we came up with a system that worked in the end, even if it took a while to get there. 
- As a lot of the site is made with CSS or heavily customised Bootstrap elements, much of the aesthetic we wanted was fiddly to attain and added considerable time to the project. In particular the columns on the Post index page. I had to create media queries to get the right number of columns each viewport size.

## Wins
- We were really happy with the Message-Chats relationship we created in the backend. It worked really well from the outset.
- The styling was a really good clone of Pinterest, and personally I was really happy with my Footer component (even though it was pretty quick to build). 

## Bugs
- We found that the way columns work on Firefox are different from Chrome. Chrome does a really nice job of centring the columns on the page whilst Firefox seems to add some margin to the left.

## Future Improvements
- Create Post would have been in a modal rather than have it’s own page. 
- The search bar would be able to return a filtered posts page. As mentioned earlier, React Select may not have been the right tool here so finding or building my own search bar would be a must.
- A redirect on the homepage is needed inorder to push a logged in user to the posts page on entering the site from the main URL.
- I would like to implement an infinite scroll on the posts page to mitigate loading all the Posts at once.

## Key Learnings

One of the coolest things about this project was working with Python in an applied setting. I had heard so much about what a popular language it is, and getting to use it here was proof enough for me to see why. It was really easy to use, and coming from a primarily JavaScript background  I found much of the syntax made perfect sense (if anything it made more sense). 

It was also really interesting working with my partner on the theory behind the relationships for the messages in particular. We had some long theory based discussions which were really informative for both of us, and challenged us to explain our understanding to each other which can sometimes be a hard thing to do for more complicated models. 

Overall it was a very satisfying and challenging project, as we had worked together on the previous project and were really keen to build upon and improve our knowledge as much as possible to create something even more impressive than before. 
