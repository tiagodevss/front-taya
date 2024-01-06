export const mock = (value) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: value,
        }),
      500 //TODO: voltar ao original
    );
  });
};
