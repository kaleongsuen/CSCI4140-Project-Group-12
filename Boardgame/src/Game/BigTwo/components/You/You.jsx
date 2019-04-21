import React, { useState, useEffect } from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";
import { points, suit } from "../../game/helper/poker";

import CardFront from "../Card/CardFront";

import king from "../icon/king.png";
import noble from "../icon/noble.png";
import pee from "../icon/pee.png";
import poo from "../icon/poo.png";
import nullIcon from "../icon/null.png";

export default function You(props) {
  const [combination, setCombination] = useState([]);
  const [hand, setHand] = useState(props.cards);

  function sort(type) {
    const cards = hand.slice();
    const priority = [[points, 0], [suit, 1]];

    if (type === "suit") {
      priority.reverse();
    }

    cards.sort((a, b) => {
      let r = compare(a, b, priority[0]);
      if (r === 0) {
        return compare(a, b, priority[1]);
      }

      return r;
    });

    setHand(cards);
  }

  function playCard() {
    props.moves.playCard(hand, combination);
    setCombination([]);
  }

  function onClick(card) {
    const idx = combination.indexOf(card);
    const selected = idx === -1;
    let combination_ = [];

    if (selected) {
      combination_ = [...combination, card];
    } else {
      combination_ = [
        ...combination.slice(0, idx),
        ...combination.slice(idx + 1),
      ];
    }

    setCombination(combination_);
  }

  const SortableItem = SortableElement(({ card }) => (
    <CardFront
      key={card}
      card={card}
      onClick={onClick}
      selected={combination.indexOf(card) !== -1}
    />
  ));

  const SortableList = SortableContainer(({ hand }) => {
    return (
      <div
        className={"cards grid-container " + (props.isActive ? "inturn" : "")}
      >
        {hand.map((card, index) => (
          <SortableItem key={`item-${index}`} index={index} card={card} />
        ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setHand(arrayMove(hand, oldIndex, newIndex));
  };

  useEffect(() => {
    setHand(props.cards);
  }, [props.cards]);

  return (
    <div className="you">
      <div className="controls">
        <span className="icon">
          {yourRank(props.G.players[props.playerID].rank)} Player{" "}
          {props.playerID}
        </span>

        <button onClick={() => sort("points")}>Sort by Points</button>
        <button onClick={() => sort("suit")}>Sort by Suit</button>
        <button onClick={() => props.moves.pass()} disabled={!props.isActive}>
          Pass
        </button>
        <button onClick={() => playCard()} disabled={!props.isActive}>
          Play Cards
        </button>
      </div>

      <SortableList hand={hand} onSortEnd={onSortEnd} axis="x" distance={5} />
    </div>
  );
}

function compare(a, b, [arr, idx]) {
  if (arr.indexOf(a[idx]) > arr.indexOf(b[idx])) return 1;
  if (arr.indexOf(a[idx]) < arr.indexOf(b[idx])) return -1;

  return 0;
}

function yourRank(rank) {
  console.log("ID: " + rank);
  switch (rank) {
    case null:
      return "No Rank";
    case 0:
      return (
        <img style={{ width: 30, height: 30 }} src={nullIcon} alt="Logo" />
      );
    case 1:
      return <img style={{ width: 30, height: 30 }} src={king} alt="Logo" />;
    case 2:
      return <img style={{ width: 30, height: 30 }} src={noble} alt="Logo" />;
    case 3:
      return <img style={{ width: 30, height: 30 }} src={pee} alt="Logo" />;
    case 4:
      return <img style={{ width: 30, height: 30 }} src={poo} alt="Logo" />;
  }
}
