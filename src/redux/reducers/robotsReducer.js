const robotsReducer = (currentRobots = [], action = {}) => {
  let newRrobots;

  switch (action.type) {
    default:
      newRrobots = [...currentRobots];
  }

  return newRrobots;
};

export default robotsReducer;
