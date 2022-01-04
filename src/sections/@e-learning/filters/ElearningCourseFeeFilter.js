import PropTypes from 'prop-types';
// @mui
import { MenuItem, Checkbox, FormControl, Typography } from '@mui/material';
import Select from '@mui/material/Select';

// ----------------------------------------------------------------------

const FEES = ['Free', 'Paid'];

const inputStyle = {
  '& .MuiFilledInput-input': { py: 2 },
};

const MenuProps = {
  PaperProps: {
    sx: {
      px: 1,
      '& .MuiList-root': {
        py: 0.5,
      },
    },
  },
};

const placeholder = (
  <Typography variant="body2" sx={{ color: 'text.disabled' }}>
    All Fee
  </Typography>
);

// ----------------------------------------------------------------------

ElearningCourseFeeFilter.propTypes = {
  filterFee: PropTypes.arrayOf(PropTypes.string),
  onChangeFee: PropTypes.func,
};

export default function ElearningCourseFeeFilter({ filterFee, onChangeFee }) {
  return (
    <FormControl fullWidth variant="filled" sx={{ ...inputStyle }}>
      <Select
        multiple
        displayEmpty
        value={filterFee}
        onChange={onChangeFee}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return placeholder;
          }
          return (
            <Typography variant="subtitle2" component="span">
              {selected.join(', ')}
            </Typography>
          );
        }}
      >
        {FEES.map((type) => (
          <MenuItem key={type} value={type} sx={{ p: 0, my: 0.5 }}>
            <Checkbox size="small" checked={filterFee.includes(type)} />
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
