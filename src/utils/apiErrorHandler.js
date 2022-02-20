const apiErrorHandler = (log) => (error) => {
  log.push(error);
};
export default apiErrorHandler;
