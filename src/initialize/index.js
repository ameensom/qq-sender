/**
 *
 * @param {import('express').Application} app
 */

export default async function (app) {
  await import('./init.env.js');
  await import('./init.express.js');
  await import('./init.database.js');
  const { default: initRoutes } = await import('./init.routes.js');
  await initRoutes(app);

}