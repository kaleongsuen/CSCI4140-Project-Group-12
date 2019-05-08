import { TurnOrder } from 'boardgame.io/core';

export default {
  next: 'start_KP',
  allowedMoves: ['giveCard', 'sort', 'setHand'],
  // turnOrder: TurnOrder.CUSTOM_FROM('exchangeOrder'),
  endPhaseIf: (G, ctx) => {
    if (G.exchanged === 4) {
      return true;
    }
  },
};