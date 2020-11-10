import { view } from './stopWatch'
export default function app(sources) {
  const sinks = view(sources);
  return {
    DOM: sinks
  }
}