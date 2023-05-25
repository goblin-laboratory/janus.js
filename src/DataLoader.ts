/** 缓存请求数据，防止请求重复发送，可以考虑是否使用下面的项目
 * https://github.com/graphql/dataloader
 * 调用多次只会发送一次请求
 * */
class DataLoader {
  private loadedMap: Map<string, Promise<any>>;

  constructor() {
    this.loadedMap = new Map();
  }

  public load(key: string, load: () => Promise<any>) {
    if (!key) {
      return Promise.resolve([]);
    }
    const loaded = this.loadedMap.get(key);
    if (loaded instanceof Promise) {
      return loaded;
    }

    const loadData = load();
    this.loadedMap.set(key, loadData);
    return loadData;
  }
}

export default DataLoader;
