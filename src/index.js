import { run } from '@cycle/most-run';
import {makeDOMDriver} from '@cycle/dom';
import app from './app'
run(app, {
    DOM: makeDOMDriver('#main-container')
  });