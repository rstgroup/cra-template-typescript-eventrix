import { EventsReceiver } from 'eventrix';
import {
    DECREMENT_COUNTER,
    INCREMENT_COUNTER,
    INCREMENT_COUNTER_BY_AMOUNT,
    FETCH_COUNTER,
} from '../eventsNames/counter';
import { fetchCount } from '../../api/counter';
import { CounterI } from '../../../interfaces/store';

const incrementCounterReceiver = new EventsReceiver<void>(
    INCREMENT_COUNTER,
    (eventName, payload, stateManager) => {
        const counterValue = stateManager.getState<number>('counter.value');
        stateManager.setState<number>('counter.value', counterValue + 1);
    }
);

const decrementCounterReceiver = new EventsReceiver<void>(
    DECREMENT_COUNTER,
    (eventName, payload, stateManager) => {
        const counterValue = stateManager.getState<number>('counter.value');
        stateManager.setState<number>('counter.value', counterValue - 1);
    }
);

const incrementByAmountCounterReceiver = new EventsReceiver<number, void>(
    INCREMENT_COUNTER_BY_AMOUNT,
    (eventName, payload, stateManager) => {
        const counterValue = stateManager.getState<number>('counter.value');
        stateManager.setState<number>('counter.value', counterValue + payload);
    }
);

const incrementByFetchCounterReceiver = new EventsReceiver<number, void>(
    FETCH_COUNTER,
    async (eventName, payload, stateManager) => {
        stateManager.setState<string>('counter.status', 'pending');
        const { data: amount } = await fetchCount(payload);
        const counterValue = stateManager.getState<number>('counter.value');
        stateManager.setState<CounterI>('counter', {
            value: counterValue + amount,
            status: 'idle'
        });
    }
);

export default [
    incrementCounterReceiver,
    decrementCounterReceiver,
    incrementByAmountCounterReceiver,
    incrementByFetchCounterReceiver,
];