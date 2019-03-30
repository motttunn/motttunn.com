const breakPoint = 1023;
let resizeFlag   = false;
let windowWidth  = window.innerWidth;
let windowHeight = window.innerHeight;
let windowWidthJ = $(window).width();





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
  anchorLink
}
