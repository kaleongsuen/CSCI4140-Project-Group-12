import setup_KP from '../setup_KP';

export default {

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