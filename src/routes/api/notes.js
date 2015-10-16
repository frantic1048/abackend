import { Router } from 'express';

import logger from '../../logger';

const notes = new Router();

notes.get('/:note_id?', (req, res) => {
  logger.info(req.params);
  res.status(200).json({
    success: true,
  });
});

export default notes;
