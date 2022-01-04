// _data
import { _courses } from '../../../../_data/mock';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  const { id } = req.query;

  const filtered = _courses.find((course) => course.id === id);

  if (filtered) {
    res.status(200).json(filtered);
  } else {
    res.status(404).json({ message: `Course with id: ${id} not found.` });
  }
}
