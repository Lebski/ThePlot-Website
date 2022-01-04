import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
import { m } from 'framer-motion';
// netx
import NextLink from 'next/link';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Stack, Container, Box } from '@mui/material';
// _data
import _mock from '../../../../_data/mock';
// components
import { Image, BgOverlay, CarouselArrows } from '../../../components';
import { varHover, varTranHover } from '../../../components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  'Marketing',
  'Community',
  'Tutorials',
  'Business',
  'Management',
  'Sports',
  'Travel',
  'Design',
];

export const TOPICS = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  cover: _mock.image.travel(index + 4),
  totalPost: index + 10,
  category: CATEGORIES[index],
}));

const RootStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

// ----------------------------------------------------------------------

export default function BlogTravelTrendingTopics() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const carouselSettings = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <Container>
        <Stack direction="row" justifyContent={{ md: 'space-between' }} sx={{ mb: 6 }}>
          <Typography variant="h3">Trending Topics</Typography>
          <CarouselArrows
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          />
        </Stack>

        <Slider ref={carouselRef} {...carouselSettings}>
          {TOPICS.map((topic) => (
            <TopicItem key={topic.id} topic={topic} />
          ))}
        </Slider>

        <CarouselArrows
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{
            mt: 6,
            justifyContent: 'center',
            display: { md: 'none' },
          }}
        />
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

TopicItem.propTypes = {
  topic: PropTypes.shape({
    category: PropTypes.string,
    cover: PropTypes.string,
    totalPost: PropTypes.number,
  }),
};

function TopicItem({ topic }) {
  const { totalPost, cover, category } = topic;

  return (
    <NextLink href="#">
      <Box
        component={m.div}
        whileHover="hover"
        variants={varHover(1)}
        transition={varTranHover()}
        sx={{ px: 1.5, cursor: 'pointer' }}
      >
        <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
          <Stack
            spacing={0.5}
            sx={{
              py: 3,
              width: 1,
              zIndex: 9,
              bottom: 0,
              textAlign: 'center',
              position: 'absolute',
              color: 'common.white',
            }}
          >
            <m.div variants={varHover(1.05)} transition={varTranHover()}>
              <Typography variant="h5">{category}</Typography>
            </m.div>

            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              {totalPost} posts
            </Typography>
          </Stack>

          <BgOverlay />

          <m.div variants={varHover(1.25)} transition={varTranHover()}>
            <Image alt={category} src={cover} ratio="4/3" />
          </m.div>
        </Box>
      </Box>
    </NextLink>
  );
}
