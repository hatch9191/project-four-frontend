import React from 'react'
// import { getAllPosts } from './lib/api'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Posts from './components/common/Posts'

function App() {


  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await getAllPosts()
  //     console.log(res.data)
  //   }
  //   getData()
  // })

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/posts" component={Posts} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
