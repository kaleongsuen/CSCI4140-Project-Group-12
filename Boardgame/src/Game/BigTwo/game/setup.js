import poker from './helper/poker';
import createPlayers from './helper/player.js';

export default function setup(ctx) {
  return {
    secret: {
      poker
    },
    history: {
      hand: null,
      player: ctx.currentPlayer
    },
    reverse: false,
    last_win: "-1",
    win_order: [],
    exchanged: 0,
    exchangeOrder: [],
    rank_count: 1,
    change_history: false,
    // ctx.numPlayers incorrect in some time
    players: createPlayers(4)
  };
}
