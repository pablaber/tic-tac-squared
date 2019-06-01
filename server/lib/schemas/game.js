'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const GAME = 'Game';

const boardSchema = new Schema({
  playerX: {
    type: String,
    required: true,
  },
  playerO: {
    type: String,
    required: true,
  },
  nextPlayer: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  }
});

const GameSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  board: {
    type: boardSchema,
    required: true,
  }
});

GameSchema.statics.findByUuid = function(uuid) {
  return new Promise((resolve, reject) => {
    this.findOne({ id: uuid }, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
};

const GameModel = mongoose.model(GAME, GameSchema);

module.exports = {
  GameSchema,
  GameModel,
}