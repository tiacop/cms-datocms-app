import Link from 'next-translate/Link'

export default function Header({ title, id, slug, allSlugLocales }) {
const Nav = () => (
  <>
    {Object.keys(allSlugLocales).map(obj => <Link key={allSlugLocales[obj].locale} href={"/stories/"+allSlugLocales[obj].value} lang={allSlugLocales[obj].locale}><a className="mr-3 hover:underline">{allSlugLocales[obj].locale}</a></Link>)}
  </>
);

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mt-6">
        <Link href="/">
          <a className="hover:underline">eurac demo</a>
        </Link>
        .
      </h2>

      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Item Lang: <Nav />
      </h4>
    </section>
  )
}
