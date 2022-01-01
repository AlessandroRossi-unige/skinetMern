const config = {
  mongo: {
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      socketTimeoutMS: 30000,
      keepAlive: true,
      maxPoolSize: 50,
      autoIndex: false,
      retryWrites: false
    },
    url: `mongodb://root:secret@localhost:27017/`
  },
  server: {
    host: 'localhost',
    port: 1337
  }
}

export default config;  