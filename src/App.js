import React from 'react'
import { getAllPosts } from './lib/api'

function App() {

  React.useEffect(() => {
    const getData = async () => {
      const res = await getAllPosts()
      console.log(res.data)
    }
    getData()
  })

  return <h1>Hello World</h1>
}

export default App
