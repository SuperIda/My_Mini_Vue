class Vue {
  constructor(options) {
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;
    // 代理data的数据
    this._proxyData(this.$data);
    // 劫持
    new Observer(this.$data);
    // 解析模板
    new Compiler(this);
  }

  _proxyData(data) {
    Object.keys(data).forEach((item) => {
      Object.defineProperty(this, item, {
        enumerable: true,
        configurable: true,
        get() {
          return data[item];
        },
        set(newValue) {
          if (newValue === data[item]) {
            return;
          }
          data[item] = newValue;
        },
      });
    });
  }
}
