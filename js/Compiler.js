class Compiler {
  constructor(vm) {
    this.vm = vm;
    this.el = vm.$el;
    this.compile(this.el);
  }
  compile(node) {
    const nodeList = node.childNodes;
    Array.from(nodeList).forEach((node) => {
      // 判断节点类型
      if (this.isTextNode(node)) {
        this.compileText(node);
      }
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }
  // 编译文本节点
  compileText(node) {
    let reg = /\{\{(.+?)\}\}/;
    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = this.vm[key];
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue;
      });
    }
  }
  isTextNode(node) {
    return node.nodeType === 3;
  }
}
