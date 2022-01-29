jest.mock('react-native-gesture-handler', () => {
  return {
    getVersion: () => 4,
  };
});
