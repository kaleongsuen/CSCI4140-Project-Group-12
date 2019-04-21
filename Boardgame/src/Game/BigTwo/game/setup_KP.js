import poker from './helper/poker';
import createPlayers from './helper/player';

export default function setup_KP(G, ctx) {
  return {
    secret: {
      poker
    },
    history: {
      hand: null,
      player: ctx.currentPlayer
    },
    rank_count: 4,
    change_history: false,
    // ctx.numPlayers incorrect in some time
    players: G.players
  };
}