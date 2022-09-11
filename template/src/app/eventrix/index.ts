import { Eventrix } from 'eventrix';
import receivers from './receivers';

export interface CounterI {
    value: number,
    status: string,
}

export interface InitialStateI {
  counter: CounterI,
}

const initialState = {
  counter: {
    value: 0,
    status: 'idle',
  },
}

const eventrix = new Eventrix<InitialStateI>(initialState, receivers);

export default eventrix;