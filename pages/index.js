import { useEffect } from 'react'
import { useRouter } from 'next/router'
import C from './en/index'

export default function Index(props) {
  const router = useRouter()
  useEffect(() => { router.replace('/en') }, [])
  return <C {...props} />
}

Index = Object.assign(Index, { ...C })
export * from './en/index'
