import { lazy } from 'react';

export const lazyComponent = (name, importer) =>
  lazy(async () => {
    const component = await importer;
    return { default: component[name] };
  });
