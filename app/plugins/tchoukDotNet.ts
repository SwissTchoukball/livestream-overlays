export default defineNuxtPlugin(() => {
  const tchoukDotNetApi = $fetch.create({
    baseURL: 'https://tchouk.net/api',
  });

  return {
    provide: {
      tchoukDotNetApi,
    },
  };
});
