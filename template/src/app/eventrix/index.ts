import { Eventrix } from 'eventrix';
import receivers from './receivers';
import { InitialStateI} from '../../interfaces/store';

const initialState = {
  counter: {
    value: 0,
    status: 'idle',
  },
}

const eventrix = new Eventrix<InitialStateI>(initialState, receivers);

export default eventrix;