// _data
import { _courses } from '../../../../_data/mock';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  res.status(200).json(_courses);
}
