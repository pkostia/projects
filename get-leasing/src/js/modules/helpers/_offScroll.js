const offScroll = () => {

  let winScrollTop = $(window).scrollTop();

  $(window).bind('scroll', () => {
    $(window).scrollTop(winScrollTop);
  });

};

module.exports = offScroll;
