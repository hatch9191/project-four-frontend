import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { getAllPosts } from './lib/api'
import ScrollTop from './hooks/ScrollTop'
import Home from './components/common/Home'
import Posts from './components/common/Posts'
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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/posts" component={Posts} />
        <Route path="/profile/:userId" component={ProfileShow} />
      </Switch>
    </BrowserRouter >
  )
}

export default App
