module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'festfeet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
