import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import getDaysInMonth from 'date-fns/getDaysInMonth';
// icons
import departureIcon from '@iconify/icons-carbon/departure';
import calendarIcon from '@iconify/icons-carbon/calendar';
// @mui
import PickersDay from '@mui/lab/PickersDay';
import DatePicker from '@mui/lab/DatePicker';
import CalendarPickerSkeleton from '@mui/lab/CalendarPickerSkeleton';
import { Badge, Box, InputAdornment } from '@mui/material';
//
import { Iconify } from '../../../components';
import { InputStyle } from './TravelTourBarFilters';

// ----------------------------------------------------------------------

const INITIAL_DATE = new Date();

TravelTourFilterTime.propTypes = {
  departureDay: PropTypes.instanceOf(Date),
  setDepartureDay: PropTypes.func,
  sx: PropTypes.object,
};

export default function TravelTourFilterTime({ departureDay, setDepartureDay, sx }) {
  const [isLoading, setIsLoading] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const requestAbortController = useRef(null);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(INITIAL_DATE);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleOpenPicker = () => {
    setOpenPicker(true);
  };

  const handleClosePicker = () => {
    setOpenPicker(false);
  };

  return (
    <DatePicker
      open={openPicker}
      onClose={handleClosePicker}
      value={departureDay}
      loading={isLoading}
      onChange={(newValue) => {
        setDepartureDay(newValue);
      }}
      onMonthChange={handleMonthChange}
      shouldDisableDate={(date) => !highlightedDays.includes(date.getDate())}
      shouldDisableYear={(year) => ![2021, 2022].includes(year.getFullYear())}
      disableMaskedInput
      disableHighlightToday
      disableOpenPicker
      inputFormat="dd MMM yyyy"
      renderInput={(params) => {
        const { InputProps, inputProps } = params;
        return (
          <Box onClick={handleOpenPicker} sx={{ width: 1, ...sx }}>
            <InputStyle
              {...params}
              fullWidth
              variant="filled"
              inputProps={{
                ...inputProps,
                placeholder: 'Departure day',
              }}
              InputProps={{
                ...InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon={calendarIcon}
                      sx={{ width: 24, height: 24, color: 'text.disabled', flexShrink: 0, mr: 1 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );
      }}
      renderLoading={() => <CalendarPickerSkeleton />}
      renderDay={(day, _value, DayComponentProps) => {
        const isSelected =
          !DayComponentProps.outsideCurrentMonth && highlightedDays.includes(day.getDate());

        return (
          <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={
              isSelected ? (
                <Iconify icon={departureIcon} sx={{ color: 'info.main', width: 18, height: 18 }} />
              ) : undefined
            }
          >
            <PickersDay {...DayComponentProps} />
          </Badge>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = getDaysInMonth(date);
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}
