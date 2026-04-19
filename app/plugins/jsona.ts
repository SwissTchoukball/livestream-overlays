import Jsona from 'jsona';

export default defineNuxtPlugin(() => {
  const dataFormatter = new Jsona();

  return {
    provide: { dataFormatter },
  };
});
