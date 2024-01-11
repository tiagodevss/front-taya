import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import {
  types as routes,
  actions as routeActions,
} from "../reducers/routes.actions";
import { actions } from "../reducers/user.actions";
import { request } from "../utils/api";
import usersMock from "./users.mock";
import moment from "moment";

function* userRouteWatcher() {
  yield routeWatcher(routes.USER, function* () {
    const id = yield select((state) => state.user.id);
    if (id) {
      yield put(actions.loadUser.request());
    }
  });
}

const loadUser = asyncFlow({
  actionGenerator: actions.loadUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      url: `/usuario/${values.id}`,
      method: "get",
      isMock: false,
      mockResult: usersMock.find((u) => u.id === values.id) ?? null,
    });
  },
  postSuccess: function ({ response }) {
    console.log({ user: response.data });
  },
});

const saveUser = asyncFlow({
  actionGenerator: actions.saveUser,
  transform: function* (payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: (values) => {
    return request({
      url: `/usuario`,
      method: "post",
      body: { ...values, dataNascimento: moment(values.dataNascimento).format("YYYY-MM-DD") },
      isMock: false,
      mockResult: values.id
        ? usersMock.map(user => user.id == values.id ? { user, ...values } : user)
        : usersMock.push({ ...values, id: usersMock.sort()[usersMock.length - 1].id + 1 }),
    });
  },
  postSuccess: function* (data) {
    console.log(data)
    yield put(routeActions.redirectTo(routes.HOME, data.values));
  },
});

const loadCepData = asyncFlow({
  actionGenerator: actions.loadCepData,
  api: ({ cep }) => {
    return request({
      url: `https://viacep.com.br/ws/${cep}/json`,
      method: "get",
      isMock: false,
    });
  }
});

export const sagas = [
  userRouteWatcher(),
  loadUser.watcher(),
  saveUser.watcher(),
  loadCepData.watcher()
];
