import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { counterEpic, counterReducer } from './counter';

const rootReducer = combineReducers({ counter: counterReducer });
const rootEpic = combineEpics(counterEpic);
const epicMiddleware = createEpicMiddleware();
const middleware = [epicMiddleware];
const composeEnhancers = composeWithDevTools({
  trace: true,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware), offline(offlineConfig))
);

epicMiddleware.run(rootEpic);

export { store };
