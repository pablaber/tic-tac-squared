'use strict';

const express = require('express');
const http = require('http');
const uuid = require('uuid/v4');
const mongoose = require('mongoose');

const { SOCKET } = require('../utils/constants');
const Board = require('../models/board');
const { GameSchema, GameModel } = require('../schemas/game');

module.exports.newInstanceWithConfig = async (config) => {
  const app = express();
  const server = http.createServer(app);
  const io = require('socket.io').listen(server);
  mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
  const db = mongoose.connection;

  await connection(db);

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/game/new', (req, res) => {
    const gameId = uuid();
    res.redirect(`/game/${gameId}`);
  });

  app.get('/game/:gameId', async (req, res) => {
    const { gameId } = req.params;
    try {
      const gameModel = await GameModel.findByUuid(gameId)
      debugger;
    } catch (err) {
      debugger;
    }
    let board;
    if (gameModel) {
      board = Board.fromSchemaJson(gameModel.board);
    } else {
      board = new Board();
      const gameModel = new GameModel({
        id: gameId,
        board: board.toSchemaJson()
      });
      try {
        await game.save();
      } catch (err) {
        console.error(err);
      }
    }

    res.sendFile(__dirname + '/game.html');
  });

  io.on(SOCKET.CONNECTION, (socket) => {
    const userId = uuid();
    console.log(`${userId} connected`);
    socket.on(SOCKET.DISCONNECT, () => {
      console.log(`${userId} disconnected`);
    });

    socket.on(SOCKET.BOX_CLICK, (id) => {
      io.emit(SOCKET.BOX_CLICK, id);
      console.log(`${userId} clicked ${id}`);
    })
  });


  return server;
}

const connection = (db) => {
  return new Promise((resolve, reject) => {
    db.on('error', (err) => {
      console.error(err);
      reject(err);
    });
    db.on('open', () => {
      resolve();
    });
  });
}