import ScrollMagic from 'scrollmagic';

const count = $('.js-animate-count'),
  countVal = count.data('count-val');

let countHand = () => {
  $({ Counter: 0 }).animate({ Counter: countVal }, {
    duration:  3000,
    easing: 'swing',
    step() {
      count.text(Math.ceil(this.Counter));
    }
  });
};

let controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({
  triggerElement: count[0],
  triggerHook: 0.6
})
  .on('enter', () => { countHand(); })
  .reverse(false)
  .addTo(controller);
