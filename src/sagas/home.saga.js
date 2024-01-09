import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import { types as routes } from "../reducers/routes.actions";
import { actions } from "../reducers/home.actions";
import { request } from "../utils/api";
import usersMock from "./users.mock";

function* homeRouteWatcher() {
  yield routeWatcher(routes.HOME, function* () {
    yield put(actions.loadUsers.request());
  });
}

const loadUsers = asyncFlow({
  actionGenerator: actions.loadUsers,
  api: () => {
    return request({
      url: `/usuarios`,
      method: "get",
      isMock: true,
      mockResult: usersMock.sort((a, b) => a.dataNascimento - b.dataNascimento),
    });
  },
  postSuccess: function ({ response }) {
    console.log({ users: response.data });
  },
});

const removeUser = asyncFlow({
  actionGenerator: actions.deleteUser,
  api: (id) => {
    return request({
      url: `/usuarios/${id}`,
      method: "delete",
      isMock: true,
      mockResult: usersMock.filter(user => user.id !== id),
    });
  },
  postSuccess: function* (response) {
    console.log(response.response.data)
  },
});

export const sagas = [homeRouteWatcher(), loadUsers.watcher(), removeUser.watcher()];
