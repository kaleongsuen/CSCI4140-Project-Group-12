import setup_KP from '../setup_KP';
import { TurnOrder } from 'boardgame.io/core';

export default {

  next: 'draw_KP',
  allowedMoves: ['playCard', 'pass', 'sort', 'setHand'],
  endPhaseIf: (G, ctx) => {
    if (G.rank_count === 4) {
      return true;
    }
  },
  onPhaseEnd: (G, ctx) => {
    return setup_KP(G, ctx);
  }
};