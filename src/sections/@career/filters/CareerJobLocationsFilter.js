import PropTypes from 'prop-types';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// icons
import locationIcon from '@iconify/icons-carbon/location';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Autocomplete, InputAdornment, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
// _data
import _mock from '../../../../_data/mock';
// components
import { Image, Iconify, SearchNotFound } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  width: '100%',
  '& .MuiAutocomplete-root': {
    '& .MuiInputAdornment-root': {
      marginTop: '0 !important',
    },
    '& .MuiFilledInput-root': {
      height: 56,
      padding: '0 12px',
    },
  },
}));

// ----------------------------------------------------------------------

CareerJobLocationsFilter.propTypes = {
  filterLocation: PropTypes.object,
  onChangeLocation: PropTypes.func,
};

export default function CareerJobLocationsFilter({ filterLocation, onChangeLocation }) {
  return (
    <RootStyle>
      <Autocomplete
        autoHighlight
        options={_mock.countries}
        getOptionLabel={(option) => option.label}
        filterOptions={createFilterOptions({
          stringify: (option) => option.label + option.code,
        })}
        value={filterLocation}
        onChange={(event, value) => onChangeLocation(value)}
        noOptionsText={<SearchNotFound keyword={filterLocation?.label} />}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            placeholder="Locations"
            InputProps={{
              ...params.InputProps,
              autoComplete: 'search',
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={locationIcon}
                    sx={{ width: 24, height: 24, color: 'text.disabled', flexShrink: 0, mr: 1 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.label, inputValue);
          const parts = parse(option.label, matches);
          return (
            <Box component="li" {...props}>
              <Image
                alt="flag country"
                src={`https://flagcdn.com/${option.code.toLowerCase()}.svg`}
                sx={{
                  mr: 1,
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  borderRadius: '50%',
                }}
              />

              {parts.map((part, index) => (
                <Box
                  key={index}
                  component="span"
                  sx={{
                    ...(part.highlight && {
                      fontWeight: 'fontWeightBold',
                    }),
                  }}
                >
                  {part.text}
                </Box>
              ))}
            </Box>
          );
        }}
      />
    </RootStyle>
  );
}
