// _data
import { _tours } from '../../../../_data/mock';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  const { id } = req.query;

  const filtered = _tours.find((tour) => tour.id === id);

  if (filtered) {
    res.status(200).json(filtered);
  } else {
    res.status(404).json({ message: `Tour with id: ${id} not found.` });
  }
}
