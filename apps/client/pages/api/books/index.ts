import { API_URL } from '../../../constants';
import { NextApiRequest, NextApiResponse } from 'next';

const baseUrl = API_URL + '/books/';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method, baseUrl, req.body, req.url);
  switch (req.method) {
    case 'GET': {
      const data = await fetch(
        `${baseUrl}?${Object.entries(req.query).reduce(
          (acc, [k, v]) => acc + `${k}=${v}&`,
          ''
        )}`
      );
      return res.status(data.status).json(await data.json());
    }
    case 'POST': {
      const data = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: req.body,
      });
      return res.status(data.status).json(await data.json());
    }
    default:
      return res.status(400).json({ error: 'Invalid request' });
  }
}
