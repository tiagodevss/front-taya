import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import { actions } from "../reducers/home.actions";
import { DeleteOutline, Edit } from "@mui/icons-material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.home);

  if (loading) {
    return <div>Carregando usuários</div>;
  }

  const deleteUser = (id) => {
    dispatch(actions.deleteUser.request(id));
  }

  return (
    <>
      <h2>Usuários</h2>
      <table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Cidade/UF</td>
            <td>Idade</td>
            <td>Ações</td>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => {
            return (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>
                  {u.cidade}/{u.uf}
                </td>
                <td>{u.idade}</td>
                <td>
                  <Edit
                    onClick={() =>
                      dispatch(
                        routeActions.redirectTo(routes.USER, { id: u.id })
                      )
                    }
                  />
                  <DeleteOutline
                    onClick={() => deleteUser(u.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
