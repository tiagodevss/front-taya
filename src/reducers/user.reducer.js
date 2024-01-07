import { actions } from "./user.actions";
import { types as routes } from "./routes.actions";

const initialState = {
  id: null,
  data: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case routes.USER:
      return {
        ...initialState,
        id: action.payload.id,
      };
    case actions.loadUser.REQUEST:
    case actions.loadUser.SUCCESS:
    case actions.loadUser.FAILURE:
      return {
        ...state,
        loading: action.type === actions.loadUser.REQUEST,
        data:
          action.type === actions.loadUser.SUCCESS
            ? action.payload.response.data
            : null,
      };

    case actions.loadCepData.REQUEST:
    case actions.loadCepData.SUCCESS:
      return {
        ...state,
        loading: action.type === actions.loadCepData.REQUEST,
        data:
          action.type === actions.loadCepData.SUCCESS
            ? {
              ...state.data,
              cep: action.payload.response.data.cep,
              cidade: action.payload.response.data.localidade,
              uf: action.payload.response.data.uf,
            }
            : null,
      };
    case actions.loadCepData.FAILURE:
      return {...state, loading: false};
    default:
      return state;
  }
};
console.log(reducer);
export default reducer;
