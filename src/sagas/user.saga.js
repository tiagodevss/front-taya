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

function* userRouteWatcher() {
  yield routeWatcher(routes.USER, function* () {
    yield put(actions.loadUser.request());
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
      isMock: true,
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
  api: ({ id, ...values }) => {
    return request({
      url: `/usuario/${id}`,
      method: "put",
      body: values,
      isMock: true,
      mockResult: usersMock.map(user => user.id == id ? {user, ...values} : user),
    });
  },
  postSuccess: function* (data) {
    console.log(data)
    yield put(routeActions.redirectTo(routes.HOME, data.values));
  },
});

const loadCepData = asyncFlow({
  actionGenerator: actions.loadCepData,
  api: (cep) => {
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
