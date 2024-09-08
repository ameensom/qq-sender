import glob from 'glob';
import { pathToFileURL } from 'url';

export default async (app) => {
  const routes = glob.sync('./src/modules/**/*.routes.js');

  await Promise.map(routes, async (route) => {
    const { default: routeFn } = await import(pathToFileURL(route));
    routeFn(app);
  });
};