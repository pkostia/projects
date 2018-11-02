import ScrollMagic from 'scrollmagic';
import TweenMax from 'gsap';

const animationBreakpoint = 960;
let animation = null;

const section  = $('.js-activity'),
  sectionT = section.offset().top;

const car  = section.find('.js-activity-car'),
  carH = car.outerHeight();

const road  = section.find('.js-activity-road'),
  roadT = road.offset().top;

const points  = section.find('.js-activity-el'),
  pointsIn = points.find('.js-activity-el-in');

let y = section.outerHeight() -carH,
  x = section.outerWidth()/2-carH;

let easing = Linear.easeNone;

let breakpoints = [];

pointsIn.each((i, el) => {
  let offsetTop = el.getBoundingClientRect().top + pageYOffset + el.offsetHeight - sectionT;
  breakpoints.push(offsetTop);
});

var count = 0;

let updStep1 = () => {
  if ( !step1 ) return;
  let progress = step1.progress();

  let thisY = Math.round((y+carH/2-100)*progress-carH/2);

  if ( breakpoints[0] <= (thisY+5) && breakpoints[0] >= (thisY-5) ) {

    points.eq(count).addClass('is-active');
    breakpoints.shift();
    count++;
  }
  if ( progress === 1 ) {
    points.eq(count).addClass('is-active');
  }
};


let step1 = TweenMax.to( car, 4, { y: y-50, onUpdate: updStep1, ease: easing }),
  step2 = TweenMax.to( car, 0.5, { y: y+100, rotation: -90, x: 50, ease: easing }),
  step3 = TweenMax.to( car, 1.5, { x: x, ease: easing });

let tl = new TimelineMax({ paused: true });

tl.add( TweenMax.fromTo( car,	 1, { autoAlpha: 0.5 }, { autoAlpha: 1 } ), 'yo' )
  .add( step1, 'yo' )
  .add( step2 )
  .add( step3 )
  .add( TweenMax.fromTo( car, 0.5, { autoAlpha:  1 }, { autoAlpha: 0 } ) );

let controller = new ScrollMagic.Controller();

car.css('opacity', 0.5);

const initScroll = () => {

  animation = new ScrollMagic.Scene({
    triggerElement: car[0],
    triggerHook: 0.5
  })
    .on('enter', () => { tl.play(); })
    .addTo(controller);  

};

const mediaCheck = window.matchMedia(`(max-width: ${animationBreakpoint}px)`);

const onMediaChange = (e) => {
  
  location.reload();
  checkScreenSize();

};

mediaCheck.addListener(onMediaChange);

const checkScreenSize = (e) => {

  const documentWidth = $(document).width();

  if(documentWidth <= animationBreakpoint) {

    car.css('opacity', 1);
    car.css('visibility', 'visible');
    car.css('transform', 'none');

    $('.js-activity-el').each((index, item) => {

      $(item).addClass('is-active');

    });

    if(animation === null) return;

    controller.removeScene(animation);
    animation.destroy(true);

    animation = null;

  } else {

    $('.js-activity-el').each((index, item) => {

      $(item).removeClass('is-active');

    });
    
    tl.pause(0);
    car.css('opacity', 0.5);

    initScroll();

  }

};

// initScroll();

checkScreenSize();
