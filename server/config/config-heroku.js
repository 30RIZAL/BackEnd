const configHeroku = {
  database: 'ddg2vst9o1v6u3',
  username: 'wwvgmqguqqcwye',
  password: '763baefa75ad319037f977f370af98601a689470ef63def3211cd3087634cc46',
  host: 'ec2-44-199-52-133.compute-1.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  URL_DOMAIN:'/grab',
  URL_API:'/grab/api'
};

export default configHeroku;