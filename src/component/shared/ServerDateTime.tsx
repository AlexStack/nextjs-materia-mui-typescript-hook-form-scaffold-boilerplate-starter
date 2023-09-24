import { Box } from '@mui/material';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const ServerDateTime = ({
  cityTimezone,
  timeFormat = 'dddd, MMMM D, YYYY h:mm:ss A',
  color,
  date,
}: {
  cityTimezone: string;
  timeFormat?: string;
  color?: string;
  date?: string;
}) => {
  return (
    <Box component='span' className='date-time' style={{ color }}>
      {dayjs(date).tz(cityTimezone).format(timeFormat)}
    </Box>
  );
};

export default ServerDateTime;
