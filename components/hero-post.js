import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
//import Link from 'next/link'
import Link from 'next-translate/Link'

export default function HeroPost({
  title,
  coverImage,
  date,
  abstract,
  author,
  slug,
  id,
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage
          title={title}
          responsiveImage={coverImage.responsiveImage}
          slug={slug}
          id={id}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/stories/${slug}`} href="/stories/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{abstract}</p>
          {author.length > 0 &&
            <Avatar name={author.name} picture={author.picture} />
          }
        </div>
      </div>
    </section>
  )
}
