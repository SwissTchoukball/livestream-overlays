export default defineNuxtPlugin(() => {
  const clupikApi = $fetch.create({
    baseURL: 'https://api.leverade.com',
  });

  return {
    provide: {
      clupikApi,
    },
  };
});
