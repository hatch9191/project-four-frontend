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
- From the client folder, install frontend dependencies: npm i
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


