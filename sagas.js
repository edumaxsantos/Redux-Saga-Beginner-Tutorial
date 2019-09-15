import { put, takeEvery, all, call } from "redux-saga/effects";

export const delay = ms => new Promise(res => setTimeout(res, ms));

function* helloSaga() {
  console.log("Hello Sagas!");
}

function* decrementAsnyc() {
  yield call(delay, 2000);
  yield put({ type: "DECREMENT" });
}

function* watchDecrementAsync() {
  yield takeEvery("DECREMENT_ASYNC", decrementAsnyc);
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// notice how we now only export the rootSage
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchDecrementAsync()]);
}
