import PropTypes from 'prop-types';
import { serialize } from 'next-mdx-remote/serialize';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Chip, Stack, Divider, Container, Typography } from '@mui/material';
// routes
import Routes from '../../../src/routes';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// utils
import {
  getAllPosts,
  getPostData,
  getAllPostSlugs,
} from '../../../src/utils/get-mardown/travel/posts';
// _data
import _mock from '../../../_data/mock';
// layouts
import Layout from '../../../src/layouts';
// components
import { Breadcrumbs, SocialsButton, Page, Markdown } from '../../../src/components';
// sections
import { NewsletterTravel } from '../../../src/sections/newsletter';
import {
  BlogSidebar,
  BlogAuthorInfo,
  BlogTravelPostHero,
  BlogTravelLatestPosts,
} from '../../../src/sections/blog';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

TravelPostPage.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.object,
    frontmatter: PropTypes.shape({
      author: PropTypes.object,
      description: PropTypes.string,
      shareLinks: PropTypes.objectOf(PropTypes.string),
      tags: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
    }),
  }),
  posts: PropTypes.array,
};

export default function TravelPostPage({ post, posts }) {
  const { frontmatter, content } = post;
  const { title, description, author, shareLinks, tags } = frontmatter;

  return (
    <Page title={`${title} - Post | Travel`}>
      <RootStyle>
        <BlogTravelPostHero post={post} />

        <Container>
          <Breadcrumbs
            sx={{ my: 3 }}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: Routes.travel.posts },
              { name: title },
            ]}
          />
        </Container>

        <Divider
          sx={{
            mb: { xs: 6, md: 10 },
          }}
        />

        <Container>
          <Grid container spacing={{ md: 8 }}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" sx={{ mb: 5 }}>
                {description}
              </Typography>

              <Markdown content={content} firstLetter />

              <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ my: 6 }}>
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  Tags:
                </Typography>
                {tags.map((tag) => (
                  <Chip key={tag} size="small" label={tag} sx={{ m: 0.5 }} onClick={() => {}} />
                ))}
              </Stack>

              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  Share:
                </Typography>
                <SocialsButton initialColor links={shareLinks} simple={false} />
              </Stack>

              <Divider sx={{ mt: 8 }} />

              <BlogAuthorInfo author={author} />
            </Grid>

            <Grid item xs={12} md={4}>
              <BlogSidebar
                author={author}
                recentPosts={{
                  list: posts.slice(-4),
                  path: '/travel/blog',
                }}
                advertisement={{
                  title: 'Advertisement',
                  description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
                  imageUrl: _mock.image.travel(9),
                  path: '#',
                }}
              />
            </Grid>
          </Grid>
        </Container>

        <Divider />

        <BlogTravelLatestPosts posts={posts.slice(0, 4)} />
        <NewsletterTravel />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

TravelPostPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export async function getStaticProps({ params }) {
  const post = getPostData(params.slug);

  return {
    props: {
      posts: getAllPosts(),
      post: {
        ...post,
        content: await serialize(post.content),
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();

  return {
    paths,
    fallback: false,
  };
}
