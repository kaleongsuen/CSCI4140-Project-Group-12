import React from "react";
import { Client } from "boardgame.io/react";
import { AI } from "boardgame.io/ai";
import { render } from "react-dom";
import { TicTacToe } from "./game";
import { Board } from "./board";
import "./App.css";

const TicTacToeClient = Client({
  game: TicTacToe,
  board: Board,
  // ai: AI({
  //   enumerate: (G, ctx) => {
  //     let moves = [];
  //     for (let i = 0; i < 9; i++) {
  //       if (G.cells[i] === null) {
  //         moves.push({ move: "clickCell", args: [i] });
  //       }
  //     }
  //     return moves;
  //   },
  // }),
  multiplayer: { server: "localhost:8000" },
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <TicTacToeClient playerID={this.state.playerID} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
