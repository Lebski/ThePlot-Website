import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Grid, Container, Stack, Rating } from '@mui/material';
// components
import { CarouselArrows } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

TestimonialsCareer.propTypes = {
  testimonials: PropTypes.array.isRequired,
};

export default function TestimonialsCareer({ testimonials }) {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const carouselSettings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
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
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ mb: 5, textAlign: 'center' }}>
              What Our Customer Say
            </Typography>

            <Slider ref={carouselRef} {...carouselSettings}>
              {testimonials.map((testimonial) => (
                <TestimonialsItem key={testimonial.id} testimonial={testimonial} />
              ))}
            </Slider>
          </Grid>
        </Grid>

        <CarouselArrows
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{
            mt: 10,
            justifyContent: 'center',
          }}
        />
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

TestimonialsItem.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
    review: PropTypes.string,
    role: PropTypes.string,
  }),
};

function TestimonialsItem({ testimonial }) {
  const { name, review, role, rating } = testimonial;

  return (
    <Stack alignItems="center" sx={{ textAlign: 'center' }}>
      <Rating value={rating} readOnly />
      <Typography
        sx={{
          my: 3,
          lineHeight: 1.75,
          fontSize: { md: 20 },
        }}
      >
        {review}
      </Typography>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body3" sx={{ color: 'text.secondary' }}>
        {role}
      </Typography>
    </Stack>
  );
}
