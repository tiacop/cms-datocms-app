import markdownStyles from './markdown-styles.module.css'
import CoverImage from '@/components/cover-image'

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
    {content.map((block, i) => {
      if (block.__typename === "ImageRecord") {
        return (
          <div key={block.id} className="section mb-8">
          <p className="bg-gray-200	p-2 mb-4 mt-6">id: "{block.id}", type: "{block.__typename}"</p>
          <CoverImage
          title={block.title}
          responsiveImage={block.image.responsiveImage}
          />
          </div>
        )
      } else if (block.__typename === "ParagraphRecord") {
        return (
          <div key={block.id} className="section mb-8">
          <p className="bg-gray-200	p-2 mb-4 mt-6">id: "{block.id}", type: "{block.__typename}"</p>
          <div
          dangerouslySetInnerHTML ={{ __html: block.bodytext }}
          />
          </div>
        )
      } else if (block.__typename === "SectionRecord") {
        return (
          <div key={block.id} className="section mb-8">
          <p className="bg-gray-200	p-2 mb-4 mt-6">id: "{block.id}", type: "{block.__typename}"</p>
          <h2 className="text-3xl">{block.subheadline}</h2>
          <div
          dangerouslySetInnerHTML ={{ __html: block.bodytext }}
          />
          </div>
        )
      } else if (block.__typename === "ImageGalleryRecord") {
        return (
          <div key={block.id} className="section mb-8">
          <p className="bg-gray-200	p-2 mb-4 mt-6">id: "{block.id}", type: "{block.__typename}"</p>
          {block.imageGallery.map((img, i) => {
            return (
              <CoverImage
              key={i}
              title={block.title}
              responsiveImage={img.responsiveImage}
              />
            )
          })}

          </div>
        )
      } else if (block.__typename === "QuoteRecord") {
        return (
          <div key={block.id} className="section mb-8">
          <p className="bg-gray-200	p-2 mb-4 mt-6">id: "{block.id}", type: "{block.__typename}"</p>
          <blockquote className="text-5xl border-l-4 border-gray-600 border-solid pl-6">{block.quoteText}</blockquote>
          <p text-4>{block.quoteAuthor}</p>
          </div>
        )
      } else if (block.__typename === "ParagraphRecord") {
        return (
          <div key={block.id} className="section mb-8">
          <p className="bg-gray-200	p-2 mb-4 mt-6">id: "{block.id}", type: "{block.__typename}"</p>
          <div
          dangerouslySetInnerHTML ={{ __html: block.bodytext }}
          />
          </div>
        )
      }
      return <div><p className="bg-gray-200	p-2 mb-4 mt-6">id: "{block.id}", type: "{block.__typename}"</p></div>;
    })}
    </div>
  )
}
