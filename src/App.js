import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { isAuthenticated } from './lib/auth'
import { getAllPosts } from './lib/api'
import ScrollTop from './hooks/ScrollTop'
import Home from './components/common/Home'
import Posts from './components/common/Posts'
import Terms from './components/common/Terms'
import Privacy from './components/common/Privacy'
import Footer from './components/common/Footer'
import Cookies from './components/common/Cookies'
import Contact from './components/common/Contact'
import Navigation from './components/common/Navigation'
import ProfileShow from './components/users/ProfileShow'
import PostDetail from './components/posts/PostDetail'
import ChatsIndex from './components/chats/ChatsIndex'
import ChatShow from './components/chats/ChatShow'
import NewPost from './components/posts/NewPost'
import EditPost from './components/posts/EditPost'

function App() {

  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())
  const [posts, setPosts] = React.useState(null)
  const [filteredPosts, setFilteredPosts] = React.useState(null)

  React.useEffect(() => {
    const getPostsData = async () => {
      try {
        const res = await getAllPosts()
        setPosts(res.data)
        setFilteredPosts(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPostsData()
  }, [])


  return (
    <BrowserRouter>
      <ScrollTop />
      <Navigation
        loggedIn={loggedIn}
        posts={posts}
        setPosts={setPosts}
        filteredPosts={filteredPosts}
        setFilteredPosts={setFilteredPosts}
      />
      <Switch>
        <Route exact path="/" >
          <Home setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/posts/new/" >
          <NewPost posts={posts} />
        </Route>
        <Route path="/posts/:postId/edit/" component={EditPost} />
        <Route path="/posts/:postId/" >
          <PostDetail posts={posts} />
        </Route>
        {/* <Route exact path="/posts/search?q=" >
          <FilteredPosts
            filteredPosts={filteredPosts}
          />
        </Route> */}
        <Route path="/posts/" >
          <Posts
            setLoggedIn={setLoggedIn}
            posts={posts}
            setPosts={setPosts}
          />
        </Route>
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/profile/:userId/chats/:chatId" component={ChatShow} />
        <Route path="/profile/:userId/chats" component={ChatsIndex} />
        <Route path="/profile/:userId" component={ProfileShow} />
      </Switch>
      <Footer loggedIn={loggedIn} />
    </BrowserRouter >
  )
}

export default App
