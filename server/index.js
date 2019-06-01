
const appFactory = require('./lib/app/app-factory');
const Board = require('./lib/models/board');

(async () => {
  const app = await appFactory.newInstanceWithConfig();

  app.listen(3000, () => {
    console.log('Running on port 3000...');
  });

});