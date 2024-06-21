import React from 'react'
import './App.css'
import GHSearchBar from './components/GHSearchBar'
import UserRepos from './components/UserRepos'
import GithubProvider from './hooks/GithubContext'

function App() {
  return (
    <div className="App">
      <GithubProvider>
        <GHSearchBar />
        <UserRepos />
      </GithubProvider>
    </div>
  )
}

export default App
