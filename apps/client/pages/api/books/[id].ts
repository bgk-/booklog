import { API_URL } from '../../../constants';
import { NextApiRequest, NextApiResponse } from 'next';

const baseUrl = API_URL + '/books/';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      const data = await fetch(baseUrl + req.query.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: req.body,
      });
      return res.status(data.status).json(await data.json());
    }
    case 'DELETE': {
      const data = await fetch(baseUrl + req.query.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return res.status(data.status).json(await data.json());
    }
    default:
      return res.status(400).json({ error: 'Invalid request' });
  }
}
