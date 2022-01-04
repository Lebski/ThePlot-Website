import PropTypes from 'prop-types';
// icons
import chevronLeft from '@iconify/icons-carbon/chevron-left';
import chevronRight from '@iconify/icons-carbon/chevron-right';
// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Avatar, Grid, CardActionArea } from '@mui/material';
// routes
import Routes from '../../routes';
// components
import { Iconify } from '../../components';

// ----------------------------------------------------------------------

BlogPrevAndNextPost.propTypes = {
  nextPost: PropTypes.shape({
    frontmatter: PropTypes.shape({
      coverImg: PropTypes.string,
      title: PropTypes.string,
    }),
    slug: PropTypes.string,
  }),
  prevPost: PropTypes.shape({
    frontmatter: PropTypes.shape({
      coverImg: PropTypes.string,
      title: PropTypes.string,
    }),
    slug: PropTypes.string,
  }),
};

export default function BlogPrevAndNextPost({ prevPost, nextPost }) {
  const nextSlug = nextPost?.slug || '';
  const prevSlug = prevPost?.slug || '';

  const nextFrontmatter = nextPost?.frontmatter;
  const prevFrontmatter = prevPost?.frontmatter;

  return (
    <Grid container spacing={5} sx={{ py: 8 }}>
      <Grid item xs={12} md={6}>
        {prevPost && (
          <PostItem
            href={Routes.eLearning.post(prevSlug)}
            title={prevFrontmatter?.title}
            coverImg={prevFrontmatter?.coverImg}
            icon={
              <Iconify
                icon={chevronLeft}
                sx={{ width: 24, height: 24, color: 'text.disabled', flexShrink: 0 }}
              />
            }
          />
        )}
      </Grid>

      <Grid item xs={12} md={6}>
        {nextSlug && (
          <PostItem
            href={Routes.eLearning.post(nextSlug)}
            isNext
            title={nextFrontmatter?.title}
            coverImg={nextFrontmatter?.coverImg}
            icon={
              <Iconify
                icon={chevronRight}
                sx={{ width: 24, height: 24, color: 'text.disabled', flexShrink: 0 }}
              />
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

PostItem.propTypes = {
  coverImg: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.any,
  isNext: PropTypes.bool,
  title: PropTypes.string,
};

function PostItem({ coverImg, title, icon, href, isNext }) {
  return (
    <CardActionArea sx={{ borderRadius: 2 }}>
      <NextLink href={href || ''}>
        <Stack
          alignItems="center"
          direction={isNext ? 'row-reverse' : 'row'}
          spacing={2}
          sx={{
            p: 2.5,
            pl: 1,
            ...(isNext && {
              pr: 1,
            }),
          }}
        >
          {icon}
          <Avatar src={coverImg} sx={{ width: 64, height: 64 }} />
          <Stack
            spacing={0.5}
            sx={{
              ...(isNext && {
                textAlign: 'right',
              }),
            }}
          >
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              {isNext ? 'Next Post' : 'Previous Post'}
            </Typography>
            <Typography variant="subtitle1">{title}</Typography>
          </Stack>
        </Stack>
      </NextLink>
    </CardActionArea>
  );
}
