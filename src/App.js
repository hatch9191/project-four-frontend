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

function App() {

  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())
  const [posts, setPosts] = React.useState(null)

  React.useEffect(() => {
    const getPostsData = async () => {
      try {
        const res = await getAllPosts()
        setPosts(res.data)
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
      <Navigation loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/" >
          <Home setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/profile/:userId/" component={ProfileShow} />
        <Route path="/posts/:postId/" component={PostDetail} />
        <Route exact path="/posts/" >
          <Posts 
            setLoggedIn={setLoggedIn} 
            posts={posts} 
            setPosts={setPosts}
          />
        </Route>
        <Route path="/terms/" component={Terms} />
        <Route path="/contact/" component={Contact} />
        <Route path="/cookies/" component={Cookies} />
        <Route path="/privacy/" component={Privacy} />
      </Switch>
      <Footer loggedIn={loggedIn} />
    </BrowserRouter >
  )
}

export default App
