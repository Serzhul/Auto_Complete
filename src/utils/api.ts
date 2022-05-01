import { ApiCache } from "./api_cache.js";

const apiCache = new ApiCache();

export default {
  async get(url: string) {
    if (apiCache.recordExists(url)) {
      return await apiCache.get(url);
    }

    try {
      return await fetch(url).then(async (res) => {
        if (!res.ok) {
          throw res;
        }

        const text = await res.text();
        const json = JSON.parse(text);

        apiCache.set(url, json);

        return json;
      });
    } catch (e) {
      console.error("Something went wrong");
    }
  },
};
