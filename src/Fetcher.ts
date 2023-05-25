import mitt from "mitt";

export class ResponseError extends Error {
  public response?: any;

  public code?: string;

  public data?: any;
}

export interface ResponseInfo {
  data?: any;
  errMsg?: ResponseError;
}

export interface RequestService {
  (...args: any[]): Promise<ResponseInfo>;
}

export default class Fetcher {
  protected static isFailed(response: any) {
    return "1000" === response.code && "success" === response.msg;
  }

  private static checkResponseStatus(
    response: Response | any
  ): Promise<Error | Response | any> {
    if (response.status < 200 || response.status >= 300) {
      const error: ResponseError = new ResponseError(response.statusText);
      error.response = response;
      return Promise.reject(error);
    }
    return Promise.resolve(response);
  }

  private static checkResponseData(responseJson: {
    data: any;
    code?: string;
    msg?: string;
    message?: string;
  }): Promise<Error | { data: any }> {
    if (!Fetcher.isFailed(responseJson)) {
      const error: ResponseError = new ResponseError(responseJson.message);
      error.response = responseJson;
      error.code = responseJson.code;
      error.data = responseJson.data;
      return Promise.reject(error);
    }
    return Promise.resolve({ data: responseJson.data });
  }

  private static handleResponse(
    response: Response
  ): Promise<ResponseError | any> {
    return Fetcher.checkResponseStatus(response)
      .then(() => response.json())
      .then(Fetcher.checkResponseData);
  }

  private emitter = mitt();

  // 默认使用 http: 协议
  private protocol = "https:" === window.location.protocol ? "https:" : "http:";

  private server = window.location.hostname;

  private port = window.location.port;

  protected baseUrl = "/phm-be";

  // constructor() {
  //   this.protocol = 'https:' === window.location.protocol ? 'https:' : 'http:';
  //   this.server = window.location.hostname;
  //   this.port = window.location.port;
  // }

  public get orgin() {
    const port = this.port ? `:${this.port}` : "";
    return `${this.protocol}//${this.server}${port}`;
  }

  public get api() {
    return `${this.orgin}${this.baseUrl}`;
  }

  public init({
    protocol,
    server,
    port,
    baseUrl,
  }: {
    protocol?: string;
    server?: string;
    port?: string;
    baseUrl?: string;
  }) {
    this.protocol = protocol ?? this.protocol;
    this.server = server ?? this.server;
    this.port = port ?? this.port;
    this.baseUrl = baseUrl ?? this.baseUrl;
  }

  destroy() {
    this.emitter.all.clear();
  }

  public subscribe(eventName: string, listener: any) {
    this.emitter?.on(eventName, listener);
    return this;
  }

  public unsubscribe(eventName: string, listener?: any) {
    this.emitter?.off(eventName, listener);
    return this;
  }

  private publish(eventName: string, data: any) {
    this.emitter?.emit(eventName, data);
    return this;
  }

  private request(
    url: string,
    opts: any
  ): Promise<{ data?: any; errMsg?: ResponseError }> {
    return fetch(url, {
      // 这部分参数可以被覆盖
      method: "GET",
      mode: "cors",
      // 支持携带 cookies
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...opts,
    })
      .then(Fetcher.handleResponse)
      .catch((errMsg) => {
        this.publish("error", errMsg);
        return { errMsg };
      });
  }

  public sendRequest(uri: string, opts: any = {}): Promise<ResponseInfo> {
    return this.request(`${this.api}${uri}`, opts);
  }
}
