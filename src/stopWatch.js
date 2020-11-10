import { div, h1, p, button } from '@cycle/dom';
import { periodic, combine } from 'most';

let totalSeconds = 0, totalMinutes = 0;
export const view = (sources) => {
  sources.DOM.select('.resetWatch').events('click').subscribe({
    next: () => {
      totalSeconds = 0;
      totalMinutes = 0;
    }
  })

  const seconds$ = periodic(1000)
    .map(() => {
      totalSeconds = totalSeconds === 60 ? 1 : totalSeconds + 1
      return totalSeconds;
    }).startWith(0);

  const minute$ = periodic(1000)
    .map(() => {
      totalMinutes = totalSeconds === 60 ? totalMinutes + 1 : totalMinutes
      return totalMinutes;
    }).startWith(0);

  const secondContainerStyle = { display: 'flex', flexDirection: 'row' }
  const watchContainerStyle = { display: 'flex', flexDirection: 'column' }
  const secondValueStyle = { marginLeft: '12px', marginTop: '23px', fontSize: '32px' }

  return combine((seconds, minutes) =>
    div('', { style: watchContainerStyle },
      [
        div('', { style: secondContainerStyle }, [
          h1('STOP WATCH'),
          button('.resetWatch', { style: { marginLeft: '24px', marginTop: '24px', width: '100px', height: '32px' } }, 'reset')
        ]),
        div('', { style: secondContainerStyle }, [
          h1('Seconds:'),
          p('.seconds', { style: secondValueStyle }, seconds)]),
        div('', { style: secondContainerStyle }, [
          h1('Minutes:'),
          p('.seconds', { style: secondValueStyle }, minutes)])
      ]), seconds$, minute$)
}