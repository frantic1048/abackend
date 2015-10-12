import { Router } from 'express';
import logger from '../../logger';
import User from '../../models/user';

const registration = new Router();

registration.post('/', (req, res) => {
  // TODO: create new user
  logger.info('Incomming Request:');
  logger.info(req.body);

  User.findOne({
    name: req.body.name,
  }, (err, user) => {
    if (!user) {
      // this username is available
      const newbie = new User({
        name: req.body.name,
        password: req.body.password,
        admin: true,
      });
      newbie.save(() => {
        logger.info(`User ${req.body.name} saved successfully!`);
        res.status(201).json({ args: { success: true }});
      });
    } else {
      // duplicated username, reject.
      logger.error(`User ${req.body.name} duplicated ! Reject.`);
      res.status(409).json({ args: { success: false }});
    }
  });
});

export default registration;
