export const MESSAGES = {
  SUCCESS: {
    CREATED: {
      USER: 'User create successfully'
    }
  },
  ERROR: {
    CONFLICT: {
      EMAIL: 'Email already in use',
      USERNAME: 'Username already in use'
    },
    UNAUTHORIZED: {
      LOGIN: 'Email or password wrong'
    },
    INTERNAL_SERVER_ERROR: {
      CREATE_USER: 'Fail to create user'
    }
  }
}