const security = [
  {
    cookieAuth: [],
  },
];

const registerUser = {
  tags: ['Users'],
  description: 'Create User Account',
  operationId: 'registerUser',
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              example: 'john',
              required: true,
            },
            email: {
              type: 'string',
              example: 'john@gmail.com',
              required: true,
            },
            password: {
              type: 'string',
              example: 'sample',
              required: true,
            },
            country: {
              type: 'string',
              example: 'usa',
              required: true,
            },
            img: {
              type: 'string',
              example:
                'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg',
              required: false,
            },
            desc: {
              type: 'string',
              example: 'Developer',
              required: false,
            },
            phone: {
              type: 'string',
              example: '+1 234 567 89',
              required: false,
            },
            isSeller: {
              type: 'boolean',
              example: ['true', 'false'],
              required: false,
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Registered',
    },
    '409': {
      description: 'User already exists',
    },
    '500': {
      description: 'Internal server error',
    },
  },
};
const loginUser = {
  tags: ['Users'],
  description: 'Login user in the system',
  operationId: 'loginUser',
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              example: 'john',
            },
            password: {
              type: 'string',
              example: 'sample',
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'User login successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '6374e19dac314421985f43f5',
              },
              firstName: {
                type: 'string',
                example: 'John',
              },
              lastName: {
                type: 'string',
                example: 'Dou',
              },
              email: {
                type: 'string',
                example: 'john@gmail.com',
              },
              role: {
                type: 'string',
                example: 'user',
              },
              token: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiQmh1dmEiLCJsYXN0X25hbWUiOiJCaGF2aW4iLCJmdWxsX25hbWUiOiJCaHV2YSBCaGF2aW4iLCJlbWFpbCI6ImJoYXZpbi5iMkBnbWFpbC5jb20iLCJyb2xlX25hbWUiOiJ1c2VyIiwiaWF0IjoxNjY1NzQxNjE5LCJleHAiOjE2NjU4MjgwMTl9.CCi2PeTODj4hEDavdwbpC5WHxbe9NLRE79n9aQrciKw',
              },
            },
          },
        },
      },
    },
  },
};

const deleteUser = {
  tags: ['Users'],
  description: 'Delete User Account',
  operationId: 'deleteUser',
  security: [
    {
      cookieAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Return OK response on successful delete operation',
    },
    '401': {
      description: 'You are unauthorized',
    },
    '404': {
      description: 'User not found',
    },
    '500': {
      description: 'Internal server error',
    },
  },
};

const logoutUser = {
  tags: ['Users'],
  description: 'Logout User Account',
  operationId: 'logoutUser',
  security: [
    {
      cookieAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Return OK response on successful logged out',
    },
    '401': {
      description: 'You are unauthorized',
    },
    '404': {
      description: 'User not found',
    },
    '500': {
      description: 'Internal server error',
    },
  },
};

const uploadUserAssets = {
  tags: ['Users'],
  description: 'Upload User Assets',
  operationId: 'uploadUserAssets',

  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            assets: {
              type: 'file',
              example: 'profile.png',
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Returns URL of user assets on successful upload.',
    },
    '404': {
      description: 'URL not found.',
    },
    '500': {
      description: 'Internal server error',
    },
  },
};

export { registerUser, loginUser, deleteUser, logoutUser, uploadUserAssets, security };
