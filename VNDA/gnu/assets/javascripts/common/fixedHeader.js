const FixedHeader = {
  lastScrollTop: -1,
  st: $(window).scrollTop(),
  header: $('#header'),

  setScroll: function (st, lastScrollTop) {

    const _this = this;

    if (st <= 0) {
      _this.header.addClass('scroll-up');
      _this.header.removeClass('scroll-down');
      _this.header.addClass('on-top');
    } else {
      if (_this.header.hasClass('on-top')) {
        _this.header.removeClass('on-top');
      }
      if (st > lastScrollTop) {
        _this.header.addClass('scroll-down');
        _this.header.removeClass('scroll-up');
      } else {
        _this.header.addClass('scroll-up');
        _this.header.removeClass('scroll-down');
      }
    }
  },

  init: function() {
    const _this = this;
    const { lastScrollTop, st } = _this;

    _this.setScroll(st, lastScrollTop);

    window.addEventListener('scroll', function () {
      const newSt = $(window).scrollTop();
      _this.setScroll(newSt, lastScrollTop);
      _this.lastScrollTop = newSt;
    });

    $('[data-button-top]').on('click', function (event) {
      $('header').css("padding-top", 0);
    });
  }
}

export default FixedHeader;
