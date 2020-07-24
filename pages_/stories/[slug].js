import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import Header from '@/components/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPosts, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'


export default function Post({ story, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !story?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <Header
              title={story.title}
              id={story.id}
              slug={story.slug}
              allSlugLocales={story._allSlugLocales}
            />
            <article>
              <Head>
                <title>
                  {story.slug}-{story.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={story.ogImage.url} />
              </Head>
              <PostHeader
                title={story.title}
                coverImage={story.coverImage}
                date={story.date}
                author={story.author}
              />
              <PostBody content={story.content} />
            </article>
            <SectionSeparator />

          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ lang, params, preview = false }) {

  const data = await getPostAndMorePosts(params.slug, lang, preview)
  const content = await markdownToHtml(data?.story?.content || '')

  return {
    props: {
      preview,
      story: {
        ...data?.story,
      },
    },
    unstable_revalidate: 1
  }
}

export async function getStaticPaths(lang) {

  const allPosts = await getAllPosts(lang)
  return {
    paths: allPosts?.map((story) => `${lang}/pages/${story.slug}`) || [],
    fallback: true,
  }
}
