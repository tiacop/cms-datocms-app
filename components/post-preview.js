import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
//import Link from 'next/link'
import Link from 'next-translate/Link'


export default function PostPreview({
  title,
  coverImage,
  date,
  abstract,
  author,
  slug,
  id,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          id={id}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/stories/${slug}`} href="/stories/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{abstract}</p>
    </div>
  )
}
