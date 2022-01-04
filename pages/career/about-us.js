import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
// utils
import { getAllPosts } from '../../src/utils/get-mardown/career/posts';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// _data
import { _testimonials, _members, _brandsColor } from '../../_data/mock';
// layouts
import Layout from '../../src/layouts';
// components
import { Page } from '../../src/components';
// sections
import { NewsletterCareer } from '../../src/sections/newsletter';
import { BlogCareerLatestPosts } from '../../src/sections/blog';
import { TestimonialsCareer } from '../../src/sections/testimonials';
import { TeamCareerAbout } from '../../src/sections/team';
import { OurClientsCareer } from '../../src/sections/our-clients';
import { CareerAbout, CareerAboutOurVision } from '../../src/sections/@career';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

CareerAboutUsPage.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function CareerAboutUsPage({ posts }) {
  return (
    <Page title="About Us - Career">
      <RootStyle>
        <CareerAbout />

        <CareerAboutOurVision />

        <Divider orientation="vertical" sx={{ height: 40, width: 40, mx: 'auto' }} />

        <TeamCareerAbout members={_members} />

        <TestimonialsCareer testimonials={_testimonials} />

        <OurClientsCareer brands={_brandsColor} />

        <BlogCareerLatestPosts posts={posts.slice(0, 5)} />

        <NewsletterCareer />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CareerAboutUsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}
