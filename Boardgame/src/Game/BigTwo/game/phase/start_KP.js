import setup from '../setup';

export default {

  allowedMoves: ['playCard', 'pass', 'sort', 'setHand'],
  endPhaseIf: (G, ctx) => {
    if (G.rank_count === 4) {
      return true;
    }
  },
  onPhaseEnd: (_, ctx) => {
    return draw_KP;
  }
};