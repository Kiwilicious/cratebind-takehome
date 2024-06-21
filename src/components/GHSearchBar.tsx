import React, { FormEventHandler, useContext, useState } from 'react'
import { GithubContext } from '../hooks/GithubContext'
import './GHSearchBar.css'

const GHSearchBar = () => {
  const [query, setQuery] = useState('')

  const { getGHUserRepos, setError } = useContext(GithubContext)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    setError(false)
    getGHUserRepos(query)
  }

  return (
    <form onSubmit={handleSubmit} className="gh-search-form">
      <label className="">
        Search User Repositories:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
    </form>
  )
}

export default GHSearchBar
