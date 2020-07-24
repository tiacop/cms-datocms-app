import { CMS_NAME, CMS_URL } from '@/lib/constants'
import Link from 'next-translate/Link'


export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        eurac demo.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">

        <Link href="/" lang="en">
          <a className="hover:underline" className="mr-3">en</a>
        </Link>

        <Link href="/" lang="de">
          <a className="hover:underline" className="mr-3">de</a>
        </Link>

        <Link href="/" lang="it">
          <a className="hover:underline">it</a>
        </Link>

      </h4>
    </section>
  )
}
