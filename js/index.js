/*

~~~ TLM's Capstone Project by Kinning Jefferson ~~~

~~ presenting Curry Island (a food ordering app) ~~

~~~~ January 2023, CSP San Quentin, California ~~~~

*/

// Global variables used inside scroll event
const $win = $( window );
const $infoDiv = $( '.info-div' );
const $infoCube = $( '.cube-1' );
const $whoCube = $( '.cube-2' );
const $visionCube = $( '.cube-3' );

// Event listener for window scroll event
$win.on( 'scroll', function () {
  if ( window.screen.width > 400 ) {
    let top = $win.scrollTop();
    $infoCube.css( 'transform', 'rotate3d(0, 10, 0, ' + top / 3 + 'deg)' );
    $whoCube.css( 'transform', 'rotate3d(1, 1, 2, ' + top / 3 + 'deg)' );
    $visionCube.css( 'transform', 'rotate3d(10, 0, 0, ' + top / 3 + 'deg)' );
    }
});
  
// Who we are component
let img = document.getElementById( "whoImage" );
let imageArray = [ "overcomer.png", "survivor.png", "visionary.png" ];
let prevNum;
function whoWeAre() {
    $( "#whoImage" ).fadeOut( "slow", function () {
        let currentNum = Math.floor( Math.random() * 3 );
        if ( currentNum == prevNum ) {
            currentNum = Math.floor( Math.random() * 3 );
        }
        prevNum = currentNum;
        img.srcset = `images/${ imageArray[ currentNum ] }`;
        $( "#whoImage" ).fadeIn( "slow" );
    } );
}
whoWeAre();
setInterval( whoWeAre, 5000 );