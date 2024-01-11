import { getAge, orderUsersByBirthDateDesc } from "../utils/functions";
import { actions } from "./home.actions";
import { types as routes } from "./routes.actions";

const initialState = {
  data: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case routes.HOME:
      if (action.meta.location.prev.type === routes.USER) {
        return state.data.map(data => {
          if (data.id === action.payload.id) {
            data.nome = action.payload.nome;
            data.dataNascimento = action.payload.dataNascimento;
            data.cep = action.payload.cep;
            data.cidade = action.payload.cidade;
            data.uf = action.payload.uf;
            data.idade = action.payload.idade;
            return data;
          } else
            return data;
        })
      } else {
        return state;
      }


    case actions.loadUsers.REQUEST:
    case actions.loadUsers.SUCCESS:
    case actions.loadUsers.FAILURE:
      return {
        ...state,
        loading: action.type === actions.loadUsers.REQUEST,
        data:
          action.type === actions.loadUsers.SUCCESS
            ? action.payload.response.data.map(data => ({
              ...data,
              idade: data.dataNascimento ? getAge(new Date(data.dataNascimento)) : "-"
            })).sort(orderUsersByBirthDateDesc)
            : [],
      };
    case actions.deleteUser.REQUEST:
    case actions.deleteUser.SUCCESS:
    case actions.deleteUser.FAILURE:
      return {
        ...state,
        loading: action.type === actions.deleteUser.REQUEST,
        data:
          action.type === actions.deleteUser.SUCCESS
            ? state.data.filter(user => user.id !== action.payload.original)
            : state.data,
      };
    default:
      return state;
  }
};

export default reducer;
