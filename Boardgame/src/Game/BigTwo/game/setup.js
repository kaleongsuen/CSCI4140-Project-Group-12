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
    rank_count: 1,
    change_history: false,
    // ctx.numPlayers incorrect in some time
    players: createPlayers(4)
  };
}
