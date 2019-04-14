const breakPoint = 1023;
let resizeFlag   = false;
let windowWidth  = window.innerWidth;
let windowHeight = window.innerHeight;
let windowWidthJ = $(window).width();



// ------------------------------------------------------------------------
// openPage
// ----- BOTH
// ------------------------------------------------------------------------
const openPage = () => {
  let loading = document.getElementById('idx-Loading');
  window.addEventListener('load', () => {
    loading.classList.add('idx-Loading-Hidden');
  }, false);
};



// ------------------------------------------------------------------------
// toggleHeader
// ----- BOTH
// ------------------------------------------------------------------------
const toggleHeader = () => {
  let headerFlag     = false;
  let headerButton   = document.getElementById('st-Header_Button');
  let headerNav      = document.getElementById('st-Header_Nav');
  let headerNavClose = document.getElementById('st-Header_Nav_List_Item-Close');
  if (windowWidth > breakPoint) {
    headerButton.addEventListener('mouseenter', () => {
      headerButton.classList.add('st-Header_Button-Hidden');
      headerNav.classList.remove('st-Header_Nav-Hidden');
    }, false);
    headerNav.addEventListener('mouseleave', () => {
      headerButton.classList.remove('st-Header_Button-Hidden');
      headerNav.classList.add('st-Header_Nav-Hidden');
    }, false);
  } else {
    headerButton.addEventListener('click', () => {
      if (!headerFlag) {
        headerButton.classList.add('st-Header_Button-Hidden');
        headerNav.classList.remove('st-Header_Nav-Hidden');
        headerFlag = true;
      }
    }, false);
    headerNavClose.addEventListener('click', () => {
      if (headerFlag) {
        headerButton.classList.remove('st-Header_Button-Hidden');
        headerNav.classList.add('st-Header_Nav-Hidden');
        headerFlag = false;
      }
    }, false);
  }
};



// ------------------------------------------------------------------------
// parallaxThumbnail
// ----- BOTH
// ------------------------------------------------------------------------
const parallaxThumbnail = () => {
  let scrollVolume   = 0;
  let worksThumbnail = document.getElementsByClassName('st-Works_List_Item_Thumbnail');
  if (windowWidth > breakPoint) {
    window.addEventListener('scroll', () => {
      scrollVolume = window.pageYOffset;
      for (let i = 0; i < worksThumbnail.length; i++) {
        let worksThumbnailTop        = worksThumbnail[i].getBoundingClientRect().top;
        let worksThumbnailWidth      = worksThumbnail[i].clientWidth;
        let worksThumbnailHeight     = worksThumbnail[i].clientHeight;
        let worksThumbnailDifference = scrollVolume - worksThumbnailTop - (worksThumbnailHeight * 1.5);
        if(worksThumbnailDifference > 0){
          worksThumbnail[i].style.transform = 'translateY(calc(-50% - ' + worksThumbnailDifference / 25 + 'px))';
        };
      }
    }, false);
  }
};



// ------------------------------------------------------------------------
// slickMain
// ----- BOTH
// ------------------------------------------------------------------------
const slickMain = () => {
  var slickWidth   = 0;
  var slickPadding = 0;
  $(window).on('load', function(){
    if(windowWidthJ > breakPoint){
      slickWidth   = 800;
      slickPadding = (windowWidthJ - 800) / 2;
    } else {

    }
    $('#idx-Main_Slider_List').slick({
      speed: 600,
      centerMode: true,
      centerPadding: slickPadding + "px",
      arrows: false,
      dots: true
      // responsive: [
      // {
      //   breakpoint: 768,
      //   settings: {
      //     arrows: false,
      //     centerMode: true,
      //     centerPadding: '40px',
      //     slidesToShow: 3
      //   }
      // },
      // ]
    });
  });
  $(window).on('resize', function(){
    var resizeWidthJ = $(window).width();
    if(resizeWidthJ > breakPoint){
      slickWidth   = 800;
      slickPadding = (resizeWidthJ - 800) / 2;
    } else {

    }
    $('#idx-Main_Slider_List')[0].slick.options.centerPadding = slickPadding + "px";
  });
};



// ------------------------------------------------------------------------
// anchorLink
// ----- BOTH
// ------------------------------------------------------------------------
const anchorLink = () => {
  $("a[href^=#]").on("click", function(){
    var linkSpeed    = 800;
    var linkHref     = $(this).attr("href");
    var linkTarget   = $(linkHref == "#" || linkHref == "" ? 'html' : linkHref);
    var linkAdjust   = 0;
    var linkPosition = linkTarget.offset().top;
    if(windowWidthJ > breakPoint){
      linkAdjust = 0;
    } else {
      linkAdjust = 0;
    }
    $("html, body").animate({scrollTop: linkPosition - linkAdjust}, linkSpeed, "swing");
    return false;
  });
};



export {
  openPage,
  toggleHeader,
  parallaxThumbnail,
  slickMain,
  anchorLink
}
