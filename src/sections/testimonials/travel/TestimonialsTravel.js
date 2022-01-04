import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// icons
import quotesIcon from '@iconify/icons-carbon/quotes';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Grid, Container, Stack, Box } from '@mui/material';
// components
import { Image, Iconify, CarouselArrows } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

TestimonialsTravel.propTypes = {
  testimonials: PropTypes.array.isRequired,
};

export default function TestimonialsTravel({ testimonials }) {
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
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{
                mb: 5,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              What Our Customer Say
            </Typography>

            <Slider ref={carouselRef} {...carouselSettings}>
              {testimonials.map((testimonial) => (
                <TestimonialItem key={testimonial.id} testimonial={testimonial} />
              ))}
            </Slider>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Image
              alt="travel testimonial"
              src="https://zone-assets-api.vercel.app/assets/images/travel/travel_testimonial.png"
              sx={{ maxWidth: 296, ml: 'auto' }}
            />
          </Grid>
        </Grid>

        <CarouselArrows
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{
            mt: 10,
            justifyContent: { xs: 'center', md: 'unset' },
          }}
        />
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

TestimonialItem.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string,
    review: PropTypes.string,
  }),
};

function TestimonialItem({ testimonial }) {
  const { name, review } = testimonial;

  return (
    <Stack
      alignItems={{ xs: 'center', md: 'flex-start' }}
      sx={{ textAlign: { xs: 'center', md: 'left' } }}
    >
      <Iconify
        icon={quotesIcon}
        sx={{ width: 48, height: 48, opacity: 0.48, color: 'primary.main' }}
      />
      <Typography
        sx={{
          mt: 2,
          mb: 5,
          lineHeight: 1.75,
          fontSize: { md: 20 },
        }}
      >
        {review}
      </Typography>

      <Stack spacing={1.5} alignItems="center" direction="row">
        <Box sx={{ width: 8, height: 9, bgcolor: 'primary.main', borderRadius: '50%' }} />
        <Typography variant="h6">{name}</Typography>
      </Stack>
    </Stack>
  );
}
