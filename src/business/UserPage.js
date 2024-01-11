import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { actions } from "../reducers/user.actions";
import { ControlledTextField, ZipCodeTextField } from "../components/inputs";
import { Button, Paper } from "@mui/material";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import validators from "../utils/validators";
import DateTextField from "../components/inputs/DateTextField";

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, data, id } = useSelector((state) => state.user);
  const rules = {};

  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
    ...data,
  };

  const formProps = {
    ...useForm({ values: initialValues, mode: "onBlur" }),
    rules,
  };

  const handleSubmit = (values) => {
    dispatch(actions.saveUser.request({...values, dataNascimento: values.dataNascimento.split("/").reverse().join("-")}))
  };

  const loadCepData = (value) => {
    if (value.cep != null && value.cep.length === 9) {
      dispatch(actions.loadCepData.request(value));
    }
  }

  if (loading) {
    return <div>Carregando usuário</div>;
  }

  return (
    <>
      <h2>{id ? "Atualizar Usuário" : "Cadastrar Usuário"}</h2>

      <Paper elevation={0}>
        <form onSubmit={formProps.handleSubmit(handleSubmit)}>
          <div style={{ display: "flex", backgroundColor: "#fff", flexDirection: "row", flexWrap: "wrap", rowGap: 20 }}>
            <ControlledTextField
              label="Nome"
              validationKey={validators.string({ required: true })}
              name={"nome"}
              value={data?.nome}
              formProps={formProps}
            />
            <ControlledTextField
              label="Data de Nascimento"
              validationKey={validators.date({ required: true })}
              name={"dataNascimento"}
              value={data?.dataNascimento}
              formProps={formProps}
              format={DateTextField}
            />
            <ControlledTextField
              label="CEP"
              validationKey={validators.string({ required: true, length: 9 })}
              name={"cep"}
              value={data?.cep}
              formProps={formProps}
              format={ZipCodeTextField} onBlur={loadCepData}
            />
            <ControlledTextField
              label="Cidade"
              validationKey={validators.string({ required: true })}
              name={"cidade"}
              value={data?.cidade}
              formProps={formProps}
            />
            <ControlledTextField
              label="UF"
              validationKey={validators.string({ required: true, length: 2 })}
              name={"uf"}
              value={data?.uf}
              formProps={formProps}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row", columnGap: 10, backgroundColor: "#fff", alignItems: "center", justifyContent: "flex-end" }}>
            <Button variant={"contained"} color={"error"} type={"button"} onClick={() => dispatch(routeActions.redirectTo(routes.HOME))}>
              {"Voltar"}
            </Button>
            <Button variant={"contained"} color={"success"} type={"submit"} disabled={formProps.formState.isSubmitting}>
              {formProps.formState.isSubmitting ? "Salvando" : "Salvar"}
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default UserPage;
