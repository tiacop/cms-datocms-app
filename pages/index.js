import { useEffect } from 'react'
import { useRouter } from 'next/router'
import C, * as _rest  from './en/index'

export default function Index(props) {
  const router = useRouter()
  useEffect(() => { router.replace('/en'+location.search) }, [])
  return <C {...props} />
}

Index = Object.assign(Index, { ...C })

export const getStaticProps = ctx => _rest.getStaticProps({ ...ctx, lang: 'en' })





