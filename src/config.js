module.exports = {
  routing: [
    {
      path: '/people',
      name: 'People',
    },
    {
      path: '/channels',
      name: 'Channels',
    },
    {
      path: '/about',
      name: 'About',
    },
  ],
  users: [
    {
      name: 'Remy Sharp',
      isOnline: true,
      avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
    },
    {
      name: 'Alice',
      isOnline: false,
      avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
    },
    {
      name: 'Cindy Baker',
      isOnline: true,
      avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    },
  ],
  // API_BASE: 'https://nestjs-chat-api.herokuapp.com',
  // API_BASE: 'http://localhost:3001',
  // WS_BASE: 'ws://nestjs-chat-api.herokuapp.com',
  // API_BASE: 'https://nestjs-chat-api.herokuapp.com',
  API_BASE: 'http://localhost:8080',
  WS_BASE: 'ws://localhost:8080',
};
