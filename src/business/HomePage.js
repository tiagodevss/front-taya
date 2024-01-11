import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import { actions } from "../reducers/home.actions";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const { loading, data } = useSelector((state) => state.home);

  if (loading) {
    return <div>Carregando usuários</div>;
  }

  const deleteUser = (id) => {
    setOpen(false);
    dispatch(actions.deleteUser.request(id));
  }

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'cidade', headerName: 'Cidade', width: 130 },
    { field: 'uf', headerName: 'UF', width: 70 },
    { field: 'idade', headerName: 'Idade', width: 60 },
  ]

  const renderDeleteDialog = () => (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Excluir usuário"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja realmente excluir este usuário?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Não</Button>
        <Button onClick={() => deleteUser(id)} autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <>
      {renderDeleteDialog()}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: 24 }}>Lista de Usuários</h2>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(
              routeActions.redirectTo(routes.USER)
            )
          }}>
          Novo usuário
        </Button>
      </div>

      <TableContainer component={Paper} style={{ padding: 0, marginLeft: 0, marginRight: 0 }}>
        <Table>
          <TableHead>
            <TableRow classes={{ root: "table-header" }}>
              {columns.map((column, index) => (
                <TableCell style={{ color: "#fff" }} width={column.width} key={index}>{column.headerName}</TableCell>
              ))}
              <TableCell style={{ color: "#fff" }} align="center" width={100} key={columns.length + 1}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                key={index}
              >
                <TableCell component="th" scope="row">
                  {row.nome}
                </TableCell>
                <TableCell>{row.cidade}</TableCell>
                <TableCell>{row.uf}</TableCell>
                <TableCell>{row.idade}</TableCell>
                <TableCell align="center">
                  <IconButton title="Alterar usuário" onClick={() => dispatch(
                    routeActions.redirectTo(routes.USER, { id: row.id }))}>
                    <Edit />
                  </IconButton>
                  <IconButton title="Excluir usuário" onClick={() => {
                    setOpen(true)
                    setId(row.id)
                  }}>
                    <DeleteOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        // rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </>
  );
};

export default HomePage;
