import mitt from "mitt";

class Emitter {
  private mitt: any;

  constructor() {
    this.mitt = mitt();
  }

  get subscribers() {
    return this.mitt.all;
  }

  dispatch(type: string, data: any) {
    this.mitt?.emit(type, data);
    // TODO: 事件名称支持一级 namespace，使用点号分割，Editor.init 发布本身事件之外还会自动发布和 Editor 事件
    return this;
  }

  on(type: string, listener: any) {
    this.mitt?.on(type, listener);
    return this;
  }

  off(type: string, listener?: any) {
    // listener
    this.mitt?.off(type, listener);
    return this;
  }

  removeAllListeners() {
    this.mitt?.all.clear();
    return this;
  }
}

export default Emitter;
