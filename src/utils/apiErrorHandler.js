const apiErrorHandler = (log) => (error) => {
  log.push(error);
  console.log(error);
};
export default apiErrorHandler;
