import { Image } from 'react-datocms'
import cn from 'classnames'
//import Link from 'next/link'
import Link from 'next-translate/Link'


export default function CoverImage({
  title,
  responsiveImage,
  slug,
  id
}) {
  const image = (
    <Image
      data={{
        ...responsiveImage,
        alt: `Cover Image for ${title}`,
      }}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className="-mx-5 sm:mx-0">
      {id ? (
        <Link as={`/stories/${slug}`} href="/stories/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
