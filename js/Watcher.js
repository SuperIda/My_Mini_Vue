class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    Dep.target = this;
    this.oldValue = vm[key];
    Dep.target = null;
  }
  update() {
    const newValue = this.vm[this.key];
    if (newValue !== this.oldValue) {
      this.cb(newValue);
      this.oldValue = newValue;
    }
  }
}
