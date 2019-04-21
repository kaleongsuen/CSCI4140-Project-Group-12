export default {
  allowedMoves: [],
  next: 'start',
  onPhaseBegin(G, ctx) {
    const poker = ctx.random.Shuffle(G.secret.poker).slice(0, ctx.numPlayers * 13);

    //Pop all old cards in hand
    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i].cards.pop();
    }

    while (poker.length) {
      for (let i = 0; i < ctx.numPlayers; i++) {
        G.players[i].cards.push(poker.pop());
      }
    }

    return G;
  },
  endPhaseIf: () => true
};