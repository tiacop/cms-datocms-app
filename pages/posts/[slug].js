import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Story({ story, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !story?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <div>bla</div>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {story.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={story.ogImage.url} />
              </Head>
              <PostHeader
                title={story.title}
                coverImage={story.coverImage}
                date={story._firstPublishedAt}
                author={story.author}
              />
              <p>Abstract:<br/> {story.abstract}</p>
              <PostBody content={story.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)

  return {
    props: {
      preview,
      story: {
        ...data?.story,
      },
      unstable_revalidate: 1
    },
  }
}

export async function getStaticPaths() {
  const allStories = await getAllPostsWithSlug()
  return {
    paths: allStories?.map(story => `/posts/${story.slug}`) || [],
    fallback: true,
  }
}
