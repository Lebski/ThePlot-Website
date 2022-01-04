// _data
import { _tours } from '../../../../_data/mock';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  res.status(200).json(_tours);
}
