const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
  srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        slug,
      },
    }
  )
  return data?.post
}

export async function getAllPosts() {
  const data = fetchAPI(`
    {
      allStories {
        slug
      }
    }
  `)
  return data?.allPosts
}

export async function getAllPostsForHome(lang, preview) {

  const data = await fetchAPI(
    `
    query GetAll($lang: SiteLocale) {
      allStories(orderBy: date_DESC, first: 20, locale: $lang) {
        title
        slug
        id
        abstract
        date
        coverImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
        author {
          name
          picture {
            url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
          }
        }
      }
    }

    ${responsiveImageFragment}
  `,
    {
      preview: true,
      variables: {
        lang,
      },
    }
  )
  return data?.allStories
}


export async function getPostAndMorePosts(slug, lang, preview) {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String, $lang: SiteLocale) {
    story(filter: {slug: {eq: $slug}}, locale: $lang) {
      title
      id
      slug
      date
      _allSlugLocales {
        locale
        value
      }
      content {
        ... on ParagraphRecord {
          id
          __typename
          bodytext(markdown: false)
        }
        ... on QuoteRecord {
          id
          __typename
          quoteAuthor
          quoteText
        }
        ... on ExternalEmbedRecord {
          id
          __typename
        }
        ... on SectionRecord {
          id
          __typename
          subheadline
          bodytext(markdown: false)
        }
        ... on ImageRecord {
          id
          __typename
          image {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }
        ... on ImageGalleryRecord {
          id
          __typename
          imageGallery {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }
      }
      ogImage: coverImage{
        url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
      }
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
        }
      }
    }

    morePosts: allStories(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}, locale: $lang) {
      title
      slug
      id
      abstract
      date
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
        }
      }
    }
  }

  ${responsiveImageFragment}
  `,
  {
    preview: true,
    variables: {
      slug,
      lang,
    },
  }

  )
  return data
}
