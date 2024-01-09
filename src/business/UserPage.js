import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { actions } from "../reducers/user.actions";
import { ControlledTextField } from "../components/inputs";
import { Button } from "@mui/material";

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
    ...useForm({ values: initialValues }),
    rules,
  };

  const handleSubmit = (values) => {
    dispatch(actions.saveUser.request(values));
  };

  const loadCepData = (value) => {
    if (value != null && value.length === 9) {
      dispatch(actions.loadCepData.request(value));
    }
  }

  if (loading) {
    return <div>Carregando usuário</div>;
  }

  return (
    <>
      <h2>Usuário #{id}</h2>

      <form onSubmit={formProps.handleSubmit(handleSubmit)}>
        <ControlledTextField label="Nome" name={"nome"} value={data.nome} formProps={formProps} />
        <ControlledTextField label="CEP" name={"cep"} value={data.cep} formProps={formProps} format="#####-###" mask="_" onBlur={loadCepData} />
        <ControlledTextField label="Cidade" name={"cidade"} value={data.cidade} formProps={formProps} />
        <ControlledTextField label="UF" name={"uf"} value={data.uf} formProps={formProps} />

        <Button type={"submit"} disabled={formProps.formState.isSubmitting}>
          {formProps.formState.isSubmitting ? "Salvando" : "Salvar"}
        </Button>
      </form>
    </>
  );
};

export default UserPage;
