export default class Switcher {
  constructor(options) {
    const defaultName = '.js-switcher';
    const defaultOptions = {
      container: defaultName,
      control: `${defaultName}-control`,
      content: `${defaultName}-content`,
      activeClass: 'is-active'
    };
    this.options = { ...defaultOptions, ...options };
  }

  toggle(items) {
    [].forEach.call(items, (i) => {
      i.classList.toggle(this.options.activeClass)
    });
  }

  init() {
    document.body.addEventListener('click', e => {
      const _ = this.options;
      const control = e.target.closest(_.control);

      if (control) {
        const container = control.closest(_.container);
        const content = container.querySelector(_.content);

        this.toggle([control, container, content]);
      }
    });
  }
}
