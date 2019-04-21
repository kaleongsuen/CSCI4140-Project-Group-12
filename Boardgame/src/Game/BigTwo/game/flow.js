import ready from './phase/ready';
import draw from './phase/draw';
import start from './phase/start';
import draw_KP from "./phase/draw_KP";
import start_KP from "./phase/start_KP";

export default {
  startingPhase: 'ready',

  phases: {
    ready,
    draw,
    start,
    draw_KP,
    start_KP
  }
};