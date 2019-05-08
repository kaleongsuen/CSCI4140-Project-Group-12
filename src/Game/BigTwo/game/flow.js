import ready from './phase/ready';
import ready_KP from './phase/ready_KP';
import draw from './phase/draw';
import draw_KP from "./phase/draw_KP";
import start from './phase/start';
import start_KP from './phase/start_KP';
import exchange from './phase/exchange';


export default {
  startingPhase: 'ready',

  phases: {
    ready,
    ready_KP,
    draw,
    draw_KP,
    start,
    start_KP,
    exchange
  }
};