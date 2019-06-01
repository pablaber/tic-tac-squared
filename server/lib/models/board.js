'use strict';

const _ = require('lodash');

const PLAYERS = {
  X: 'X',
  O: 'O',
};
const SIZE = 3;
const DEFAULTS = {
  nextPlayer: PLAYERS.X,
};

/**
 * A class representing a simple tic tac toe board
 */
module.exports = class Board {
  /**
   * Initializes a Board class
   * @param {BoardOptions} optionsArgs - The board options for initialization
   */
  constructor(optionsArgs = {}) {
    // Initialize board
    this.board = [];
    for (let i = 0; i < SIZE; i++) {
      this.board[i] = [];
      for (let j = 0; j < SIZE; j++) {
        this.board[i][j] = '-';
      }
    }
    if (options.board) {
      this.board = options.board;
    }

    // Initialize Options
    const options = _.defaults(optionsArgs, DEFAULTS);
    this.nextPlayer = options.nextPlayer;

    this.winner = '';
  }

  static fromDbObject(dbObject) {

  }

  /**
   * Returns weather or not a move can be made at the specified row and column
   * of the board
   * @param {number} row - the row
   * @param {number} col - the column
   * 
   * @returns {Boolean} - True if the space is elligable for a move
   */
  canMove(row, col) {
    return this.winner === '' && this.board[row][col] === '-';
  }

  /**
   * Switches this.nextPlayer
   */
  switchNextPlayer() {
    if (this.nextPlayer === PLAYERS.X) {
      this.nextPlayer = PLAYERS.O;
    } else {
      this.nextPlayer = PLAYERS.X;
    }
    return this.nextPlayer;
  }

  /**
   * Makes a move at the specified row and column for the specified player if
   * the player is elligable and the space is available.
   * @param {String} player - the player string
   * @param {Number} row - the row
   * @param {Number} col - the column
   */
  makeMove(player, row, col) {
    if (player !== this.nextPlayer) {
      throw new Error(`Trying to move with ${player} on turn for ${this.nextPlayer}`);
    }
    if (!this.canMove(row, col)) {
      throw new Error(`Cannot make move to ${row}, ${col}`);
    }
    this.board[row][col] = player;
    if (this.isWinFor(player)) {
      this.winner = player;
    }
    this.switchNextPlayer();
  }

  /**
   * Checks if the game baord is in a winning state for the specified player
   * @param {String} player - the player to check for a win
   * 
   * @returns {Boolean} - True if the board state is a win for the player
   */
  isWinFor(player) {
    for (let i = 0; i < SIZE; i++) {
      if (this.board[i][0] === player && this.board[i][1] === player && this.board[i][2] === player) {
        return true;
      } else if (this.board[0][i] === player && this.board[1][i] === player && this.board[2][i] === player) {
        return true;
      }
    }
    if (this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) {
      return true;
    } else if (this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player) {
      return true;
    }
    return false;
  }

  toSchemaJson() {
    return {
      playerX: 'some-random-id',
      playerO: 'another-random-id',
      nextPlayer: this.nextPlayer,
      board: _.flatten(this.board).join(''),
    }
  }

  static fromSchemaJson(schemaJson) {
    const boardString = schemaJson.board;
    const board = [
      boardString.substr(0, 3).split(''),
      boardString.substr(3, 3).split(''),
      boardString.substr(6, 3).split(''),
    ];
    const { nextPlayer } = schemaJson;

  }
}
