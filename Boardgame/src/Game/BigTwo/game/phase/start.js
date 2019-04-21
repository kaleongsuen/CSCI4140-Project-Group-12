import setup_KP from '../setup_KP';

export default {
  next: 'draw_KP',
  allowedMoves: ['playCard', 'pass', 'sort', 'setHand'],
  endPhaseIf: (G, ctx) => {
    if (G.rank_count === 4) {
      return true;
    }
  },
  onPhaseEnd: (G, ctx) => {
    // G.players[ctx.currentPlayer].rank = G.rank_count;
    return setup_KP(G,ctx);
    // return false;
  }
};