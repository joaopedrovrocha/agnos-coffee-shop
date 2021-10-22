require('./database')

const app = require('./server')
const routes = require('./routes')

app.use(routes)