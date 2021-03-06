import {
  INVALID_MOVE
} from 'boardgame.io/core';
import {
  Hand
} from 'pokersolver';
import pullAll from 'lodash/pullAll';

export default function (G, ctx, playerCards, combination) {
  if (Array.isArray(combination) && combination.length && G.secret) {
    const newHand = Hand.solve(combination, 'bigtwo');
    const cards = newHand.toArray(true);
    const playerCardsRemain = pullAll(playerCards.slice(), cards);
    
    console.log("combination: "+ combination);
    console.log("cards: "+ cards);
    console.log("playerCardsRemain: "+ playerCardsRemain);
    
    const playerRank = G.players[ctx.currentPlayer].rank;

    let validExchange = true;

    if(playerRank === 1){
      if(cards.length !== 2){
        console.log('King need to give two cards to Poo', cards);
        validExchange = false;
      }else{
        G.players[G.win_order[3]].cards.push(...combination);
      }

    }else if(playerRank === 2){
      if(cards.length !== 1){
        console.log('Noble need to give one card to Pee', cards);
        validExchange = false;
      }else{
        G.players[G.win_order[2]].cards.push(...combination);
      }
      
    }else if(playerRank === 3){
      if(cards.length !== 1){
        console.log('Pee need to give one card to Noble', cards);
        validExchange = false;
      }else{
        for(let card in playerCardsRemain){
          let solved_card = Hand.solve([playerCardsRemain[card]], 'bigtwo');
          let win = Hand.winners([newHand, solved_card])[0];
          if(newHand !== win){
            console.log('Pee need to give largest card to Noble');
            console.log(newHand + ' vs ' + solved_card + ', winner: ' + win)
            validExchange = false;
            break;
          }
        }
      }
      if(validExchange){
        G.players[G.win_order[1]].cards.push(...combination);
      }

    }else if(playerRank === 4){
      if(cards.length !== 2){
        console.log('Poo need to give two cards to King', cards);
        validExchange = false;
      }else{
        let card0 = Hand.solve([combination[0]], 'bigtwo');
        let card1 = Hand.solve([combination[1]], 'bigtwo');
        // console.log("playerCardsRemain: "+playerCardsRemain);
        for(let card in playerCardsRemain){
          let solved_card = Hand.solve([playerCardsRemain[card]], 'bigtwo');
          // console.log("solved_card: "+ solved_card);

          let win0 = Hand.winners([card0, solved_card])[0];
          let win1 = Hand.winners([card1, solved_card])[0];
          if(card0 !== win0){
            console.log('Poo need to give two largest cards to King - 0');
            console.log(card0 + ' vs ' + solved_card + ', winner: ' + win0)
            validExchange = false;
            break;
          }
          if(card1 !== win1){
            console.log('Poo need to give two largest cards to King - 1');
            console.log(card1 + ' vs ' + solved_card + ', winner: ' + win1)
            validExchange = false;
            break;
          }
        }
      }
      if(validExchange){
        G.players[G.win_order[0]].cards.push(...combination);
      }

    }

    if(validExchange){
      G.players[ctx.currentPlayer].cards = playerCardsRemain;
      G.exchanged = G.exchanged + 1;
      if(G.exchanged === 4){
        G.history.player = G.last_win;
        console.log("(exchange) - set history.player = "+G.history.player);
        console.log("end exchange, next: "+G.last_win);
        ctx.events.endTurn({next: G.last_win});
      }else{
        console.log("exchanging, next: "+G.exchangeOrder[G.exchanged]);
        ctx.events.endTurn({next: G.exchangeOrder[G.exchanged]});
      }
      return G;
    }

    // const newHand = Hand.solve(combination, 'bigtwo');
    // const NeedToCheck = G.history.player !== ctx.currentPlayer;

    // let win = true;
    // let sameLength = true;

    // let iWinTheGame = false;

    // const cards = newHand.toArray(true);
    // const playerCardsRemain = pullAll(playerCards.slice(), cards);

    // if (newHand.isPossible) {
    //   if (NeedToCheck) {
    //     const lastHand = Hand.solve(G.history.hand, 'bigtwo');
    //     if(G.reverse){
    //       win = newHand !== Hand.winners([newHand, lastHand])[0];
    //     }else{
    //       win = newHand === Hand.winners([newHand, lastHand])[0];
    //     }
    //     sameLength = cards.length === lastHand.cards.length;
    //   }

    //   if (win && sameLength) {
    //     G.players[ctx.currentPlayer].cards = playerCardsRemain;
    //     G.history.hand = cards;
    //     G.history.player = ctx.currentPlayer;

    //     if (G.players[ctx.currentPlayer].cards.length === 0) {
    //       console.log("(playCard) - no cards left");
    //       if(G.players[ctx.currentPlayer].end_game == false){
    //         if(G.rank_count === 1){
    //           if(G.last_win !== ctx.currentPlayer && G.last_win !== "-1"){
    //             G.reverse = true;
    //           }
    //           G.last_win = ctx.currentPlayer;
    //           console.log("(playCard) - set last_win = "+G.last_win);
    //         }
    //         G.players[ctx.currentPlayer].end_game = true;
    //         console.log("(playCard) - set end_game = true");
    //         G.players[ctx.currentPlayer].rank = G.rank_count;
    //         console.log("(playCard) - set rank = "+G.rank_count);
    //         G.rank_count=G.rank_count+1;
    //         console.log("(playCard) - set rank_count = "+G.rank_count);
    //         G.change_history = true;
    //         console.log("(playCard) - set change_history = "+G.change_history);
    //         iWinTheGame = true;
    //       }
    //     }
    //     let tmp = ctx.currentPlayer;
    //     let ret_tmp = tmp;
    //     if(tmp == 0){
    //       if(!G.players[1].end_game){
    //         ret_tmp = '1';
    //       }else if(!G.players[2].end_game){
    //         ret_tmp = '2';
    //       }else if(!G.players[3].end_game){
    //         ret_tmp = '3';
    //       }else ret_tmp = '0';
    //     }else if(tmp == 1){
    //       if(!G.players[2].end_game){
    //         ret_tmp = '2';
    //       }else if(!G.players[3].end_game){
    //         ret_tmp = '3';
    //       }else if(!G.players[0].end_game){
    //         ret_tmp = '0';
    //       }else ret_tmp = '1';
    //     }else if(tmp == 2){
    //       if(!G.players[3].end_game){
    //         ret_tmp = '3';
    //       }else if(!G.players[0].end_game){
    //         ret_tmp = '0';
    //       }else if(!G.players[1].end_game){
    //         ret_tmp = '1';
    //       }else ret_tmp = '2';
    //     }else if(tmp == 3){
    //       if(!G.players[0].end_game){
    //         ret_tmp = '0';
    //       }else if(!G.players[1].end_game){
    //         ret_tmp = '1';
    //       }else if(!G.players[2].end_game){
    //         ret_tmp = '2';
    //       }else ret_tmp = '3';
    //     }
    //     console.log("current: "+tmp);
    //     console.log("return: "+ret_tmp);

    //     if(!iWinTheGame){
    //       if(G.change_history){
    //         G.history.player = ctx.currentPlayer;
    //         console.log("(playCard) - set history.player = "+G.history.player);
    //         G.change_history = false;
    //         console.log("(playCard) - set change_history = "+G.change_history);
    //       } 
    //     }
    //     if (G.rank_count === 4) {
    //       ctx.events.endTurn({next:G.last_win});
    //     }else{
    //       ctx.events.endTurn({next:ret_tmp});
    //     }
        

    //     return G;
    //   }

    //   switch (false) {
    //     case win:
    //       console.log('This hand lose to then last hand');
    //       break;
    //     case sameLength:
    //       console.log('Length of hand is not same');
    //       break;
    //     default:
    //   }
    // } else {
    //   console.log('Tthis hand cannot be solved', cards);
    // }
  }

  return INVALID_MOVE;
}