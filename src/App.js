import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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

function App() {

  React.useEffect(() => {
    const getData = async () => {
      const res = await getAllPosts()
      console.log(res.data)
    }
    getData()
  })

  return (
    <BrowserRouter>
      <ScrollTop />
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/posts" component={Posts} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/profile/:userId" component={ProfileShow} />
      </Switch>
      <Footer />
    </BrowserRouter >
  )
}

export default App
