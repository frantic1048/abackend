import { Router } from 'express';

import logger from '../../logger';
import Note from '../../models/note';

const notes = new Router();

notes.get('/', (req, res) => {
  const owner = req.decoded.id;
  Note
    .find({
      _owner: owner,
    })
    .select({
      id: 1,
      title: 1,
      date: 1,
      tags: 1,
    })
    .lean()
    .exec((err, docs) => {
      res.status(200).json({
        success: true,
        noteList: docs,
      });
    });
});

notes.post('/:note_id', (req, res) => {
  const owner = req.decoded.id;
  const noteId = req.params.note_id;
  Note.findOne({
    _owner: owner,
    id: noteId,
  }, (err, _note) => {
    if (!_note) {
      // noteid avaialed for user
      const newNote = new Note({
        _owner: owner,
        id: noteId,
        title: req.body.title,
        date: req.body.date,
        tags: req.body.tags,
        body: req.body.body,
      });
      newNote.save(() => {
        res.status(201).json({
          success: true,
        });
      });
    } else {
      // exist note, reject creating
      res.status(409).json({
        success: false,
        message: 'noteid exist!',
      });
    }
  });
});

notes.patch('/:note_id', (req, res) => {
  const owner = req.decoded.id;
  const noteId = req.params.note_id;
  Note.update({
    _owner: owner,
    id: noteId,
  }
  , { $set: req.body}
  , (err) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: 'Update success!',
      });
    }
    // TODO: May need more err handling here
  });
});

notes.get('/:note_id', (req, res) => {
  const owner = req.decoded.id;
  const noteId = req.params.note_id;
  Note.findOne({
    _owner: owner,
    id: noteId,
  }, (err, _note) => {
    if (!_note) {
      // note does not exist
      res.status(404).json({
        success: false,
        message: 'Note does not exist.',
      });
    } else {
      // exist note
      res.status(200).json({
        success: true,
        note: _note,
      });
    }
  });
});

export default notes;
