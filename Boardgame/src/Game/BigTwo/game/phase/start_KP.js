import setup_KP from '../setup_KP';

export default {

  next: 'draw_KP',
  allowedMoves: ['playCard', 'pass', 'sort', 'setHand'],
  // turnOrder:{
  // 	first: G => G.last_win,
  // },
  endPhaseIf: (G, ctx) => {
    if (G.rank_count === 4) {
      return true;
    }
  },
  onPhaseEnd: (G, ctx) => {
    return setup_KP(G, ctx);
  }
};