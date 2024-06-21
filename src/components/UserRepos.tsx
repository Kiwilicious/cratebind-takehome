import React, { useContext, useEffect, useState } from 'react'
import { GithubContext, GithubUserRepo } from '../hooks/GithubContext'
import './UserRepos.css'

const UserRepos = () => {
  const { userRepos, error, loading } = useContext(GithubContext)
  const [cleanedUsers, setCleanedUsers] = useState<GithubUserRepo[]>([])

  useEffect(() => {
    const cleaned = userRepos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)

    setCleanedUsers(cleaned)
  }, [userRepos])

  return (
    // Would extract loading, error, and repo components in an actual project
    <div className="list-container">
      {error && <div className="error">User not found</div>}
      {loading ? (
        <div className="loading">🧐</div>
      ) : (
        cleanedUsers.map(
          ({ name, description, stargazers_count, clone_url, language }) => (
            <div key={clone_url} className="repo">
              <a
                href={clone_url.slice(0, clone_url.length - 4)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <b>Name:</b> {name}
                </div>
                <div>
                  <b>Description:</b> {description ?? 'N/A'}
                </div>
                <div>
                  <b>Stars:</b> {stargazers_count}
                </div>
                <div>
                  <b>Langauge:</b> {language ?? 'N/A'}
                </div>
              </a>
            </div>
          )
        )
      )}
    </div>
  )
}

export default UserRepos
