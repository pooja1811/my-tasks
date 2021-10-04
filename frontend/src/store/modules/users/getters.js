export const getters = {
  isLoggedIn: ({ userDetails }) => !!userDetails.$loki,
};
