type CacheResult = any;

export class ApiCache {
  private static instance: ApiCache;
  private cache: { url: string; body?: string; result: CacheResult }[] = [];

  constructor() {
    if (!!ApiCache.instance) {
      return ApiCache.instance;
    }

    ApiCache.instance = this;

    return this;
  }

  public set = (url: string, result: any, body?: string): void => {
    if (!this.recordExists(url, body)) {
      this.cache.push({
        url,
        body,
        result,
      });
    }
  };

  public get = (url: string, body?: string): CacheResult | null => {
    const cacheRecord = this.cache.find((x) => {
      if (body) {
        return x.url === url && x.body === body;
      }

      return x.url === url;
    });

    if (cacheRecord) {
      return cacheRecord.result;
    }

    return null;
  };

  public recordExists = (url: string, body?: string): boolean => {
    return !!this.get(url, body);
  };
}
