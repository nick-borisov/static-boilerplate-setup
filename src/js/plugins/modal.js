export default class Modal {
  constructor(options) {
    this.isOpened = false;
    this.options = { backdrop: true, ...options };
  }

  init() {
    document.body.addEventListener('click', e => {
      let modalId;
      const modalCall = e.target.closest('[data-toggle="modal"]');
      const modalClose = e.target.closest('[data-dismiss="modal"]');

      if (modalClose) {
        this.hide();
      }

      if (this.isOpened && !e.target.closest('.modal-content')) {
        this.hide();
      }

      if (modalCall) {
        modalId = modalCall.dataset.target;
        this.show(modalId);
      }
    });
  }

  show(modalId) {
    const modal = document.getElementById(modalId);
    const { options } = this;
    const scrollbarSize = window.innerWidth - document.body.clientWidth;

    this.isOpened = true;

    document.body.style.paddingRight = `${scrollbarSize}px`;
    document.body.classList.add('modal-open');

    modal.style.display = 'block';

    setTimeout(() => {
      modal.classList.add('show');
    }, 150);

    if (options.backdrop) {
      let backdrop = document.querySelector('.modal-backdrop');
      if (backdrop === null) {
        backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade';
        document.body.appendChild(backdrop);
      }

      setTimeout(() => {
        backdrop.classList.add('show');
      }, 150);
    }
  }

  hide({keepBackdrop = false} = {}) {
    const modals = document.querySelectorAll('.js-modal');
    const { options } = this;

    this.isOpened = false;

    document.body.style.paddingRight = '';
    document.body.classList.remove('modal-open');

    [].forEach.call(modals, (modal) => {
      modal.style.display = 'none';
      modal.classList.remove('show');
    });

    if (options.backdrop) {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop !== null && !keepBackdrop) {
        backdrop.classList.remove('show');
        document.body.removeChild(backdrop);
      }
    }
  }
}
