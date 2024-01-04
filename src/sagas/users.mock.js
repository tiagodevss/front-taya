const getAge = (birthDate) => {
  return Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
}

const data = [
  {
    id: "1",
    nome: "José da Silva",
    dataNascimento: new Date(1990, 1, 1),
    idade: getAge(new Date(1990, 1, 1)),
    cep: "05311-000",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: "2",
    nome: "Marco Antonio Alves",
    dataNascimento: new Date(2007, 5, 3),
    idade: getAge(new Date(2007, 5, 3)),
    cep: "05311-000",
    cidade: "Ubutuba",
    uf: "SP",
  },
  {
    id: "3",
    nome: "Maria Joaquina",
    dataNascimento: new Date(2000, 7, 22),
    idade: getAge(new Date(2000, 7, 22)),
    cep: "05311-000",
    cidade: "Brasília",
    uf: "SP",
  },
  {
    id: "4",
    nome: "Mauricio de Souza",
    dataNascimento: new Date(1991, 1, 1),
    idade: getAge(new Date(1991, 1, 1)),
    cep: "05311-000",
    cidade: "Niterói",
    uf: "SP",
  },
  {
    id: "5",
    nome: "André Silvério Pinto",
    dataNascimento: new Date(1990, 11, 30),
    idade: getAge(new Date(1990, 11, 30)),
    cep: "05311-000",
    cidade: "Guarulhos",
    uf: "SP",
  },
  {
    id: "6",
    nome: "Eduardo Urbano",
    dataNascimento: new Date(1977, 5, 8),
    idade: getAge(new Date(1977, 5, 8)),
    cep: "05311-000",
    cidade: "Rio de Janeiro",
    uf: "SP",
  },
  {
    id: "7",
    nome: "Vanessa Alvares Cabral",
    dataNascimento: new Date(1980, 6, 20),
    idade: getAge(new Date(1980, 6, 20)),
    cep: "05311-000",
    cidade: "Barueri",
    uf: "SP",
  },
];

export default data;
