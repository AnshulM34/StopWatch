import {div, label, input, hr, h1} from '@cycle/dom';

export const view = (sources) => {
  const input$ = sources.DOM.select('.field').events('input')

  const name$ = input$.map(ev => ev.target.value).startWith('')

  return name$.map(name =>
    div([
      label('Name:'),
      input('.field', {attrs: {type: 'text'}}),
      hr(),
      h1('Hello ' + name),
    ])
  )
}