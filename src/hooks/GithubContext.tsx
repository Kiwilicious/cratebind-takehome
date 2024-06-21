import {
  createContext,
  useState,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

// Partial typing
export type GithubUserRepo = {
  description: string
  fork: boolean
  language: string
  name: string
  stargazers_count: number
  clone_url: string
}

type GithubProviderType = {
  children: ReactNode
}

export const GithubContext = createContext({
  error: false,
  loading: false,
  userRepos: [] as GithubUserRepo[],
  getGHUserRepos: async (user: string) => {},
  setError: (() => {}) as Dispatch<SetStateAction<boolean>>,
})

const GithubProvider: FC<GithubProviderType> = ({ children }) => {
  const API_BASE_URL = 'https://api.github.com'

  const [userRepos, setUserRepos] = useState<GithubUserRepo[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getGHUserRepos = async (user: string) => {
    setLoading(true)

    const res = await fetch(`${API_BASE_URL}/users/${user}/repos`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'createbind-takehome',
      },
    })

    const data = await res.json()

    if (res.status === 200) {
      setUserRepos(data)
    } else {
      setError(true)
    }

    setLoading(false)
  }

  const store = {
    getGHUserRepos,
    userRepos,
    error,
    setError,
    loading,
  }

  return (
    <GithubContext.Provider value={store}>{children}</GithubContext.Provider>
  )
}

export default GithubProvider
