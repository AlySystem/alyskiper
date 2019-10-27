import { useState, useEffect } from 'react'

export const useFetch = ({ method, body, url }) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const config = {
          url: url,
          method: method,
          body: JSON.stringify(body)
        }

        const response = await fetch(config)
        const result = await response.json()
        setData(result)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, error, isLoading }
}
