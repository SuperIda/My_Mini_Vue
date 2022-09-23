class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    // 不是引用类型 不是null或者typeof data !== "object"
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive(data, key, value) {
    const dep = new Dep();
    this.walk(value);
    Object.defineProperty(data, key, {
      get() {
        //! 此时还要收集依赖
        dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        //! 此时要通知依赖
        if (newValue === value) {
          return;
        }
        value = newValue;
        dep.notify();
      },
    });
  }
}
