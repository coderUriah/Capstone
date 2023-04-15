/*

~~~ TLM's Capstone Project by Kinning Jefferson ~~~

~~ presenting Curry Island (a food ordering app) ~~

~~~~ January 2023, CSP San Quentin, California ~~~~

*/

// Array of menu item data arrays
const data = [
  [0, 'Curry Bacon Burger', 1099, 0, 'Garlic Bun, Thick Cut Maple Bacon, 1/4th pound Organic Beef Patty, Home-Made Sauce and topped with Onions', '../images/burgerandfries.jpeg', 0.00],
  [1, 'Chicken Curry Rice Plate', 1499, 0, 'Two Grilled Marinated Organic Chicken Thighs, Rice Pilaf w/ 9 Island Spices and a side of Kale Salad', '../images/riceandmeat.jpeg', 0.00],
  [2, 'Honey Pinapple Lamb Plate', 1999, 0, '1 pound of Marinated Lamb drizzled with a slow cooked honey pinapple sauce', '../images/bbqmeat.jpeg', 0.00],
  [3, 'Seafood Sauna Rice Plate', 2499, 0, '5 pieces of Island Heat Jumbo Shrimp, 2 Jamacian Jerk Lobster Tail and 4 King Crab Legs w/ a side of savory garlic butter dipping sauce', '../images/shrimpsoup.jpeg', 0.00],
  [4, 'Island Starter', 799, 0, '2 pieces of Island Heat Jumbo Shrimp and 4 mini Honey Pinapple Lamb bites over 1 cup of our Rice Pilaf', '../images/grillmeat.jpeg', 0.00]
  ];
 
// Menu item class constructor
class MenuItem {
   constructor(itemNumber, itemName, itemPrice, qty, itemIncludes, itemImg, subTotal){
    this.itemNumber = itemNumber;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.qty = qty;
    this.itemIncludes = itemIncludes;
    this.itemImg = itemImg;
    this.subTotal = subTotal;
   }
 }

// Mapping through menu item data arrays, returning new instances of the Menu Item class
let menuItems = data.map((element) => (new MenuItem(element[0],element[1],element[2],element[3],element[4],element[5],element[6])));
 
// Global variables used when inserting data into cards
let $menuCardTitle = $('.menu-card-title ');
let $menuCardText = $('.menu-card-text ');
let $menuCardImg = $('.menu-img ');
let $menuCardPrice = $('.menu-card-price ');

// Loop thats inserting data into cards
let all = $menuCardTitle.length;
for(let i = 0;i < all;i++){
$menuCardTitle[i].innerHTML = menuItems[i].itemName;
$menuCardText[i].innerHTML = menuItems[i].itemIncludes;
$menuCardImg[i].src = menuItems[i].itemImg;
$menuCardPrice[i].innerHTML = `$${menuItems[i].itemPrice / 100}`;
}

// Global variables used inside menu parent event listener
const burger = menuItems[ 0 ],
  chicken = menuItems[ 1 ],
  lamb = menuItems[ 2 ],
  seafood = menuItems[ 3 ],
  starter = menuItems[ 4 ];
const $pageBtns = $( '.add-btn' );
let htmlString;
  
// Event listener for menu parent
$pageBtns.on( 'click', function ( e ) {
  if ( e.target.className.includes('burger-btn') ) {
    burger.qty++;
    burger.subTotal = burger.itemPrice * burger.qty;
  } else if ( e.target.className.includes('chicken-btn') ) {
    chicken.qty++;
    chicken.subTotal = chicken.itemPrice * chicken.qty;
  } else if(e.target.className.includes('lamb-btn')){
    lamb.qty++;
    lamb.subTotal = lamb.itemPrice * lamb.qty;
  } else if(e.target.className.includes('seafood-btn')){
    seafood.qty++;
    seafood.subTotal = seafood.itemPrice * seafood.qty;
 } else if(e.target.className.includes('starter-btn')){
    starter.qty++;
    starter.subTotal = starter.itemPrice * starter.qty;
  }
  updateTable();
});

// Global function
const pickupTime = () => {
  let now = new Date();
  return new Date(now.getTime() + (25*60*1000)).toLocaleTimeString();
};

// Global variables used inside proceed to checkout button listener
const chkOutProceedBtn = $( '#proceed-btn' );
const $chkOutForm = $( `
  <thead style="display: flex; justify-content: center;">
    <th>Estimated Pickup Time( <span style="font-weight: 200;">from current time</span> )</th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
  </thead>
  <tbody style="display: flex; justify-content: center;">
    <tr>
      <td>${pickupTime()}</td>
    </tr>
  </tbody>
  ` );
  
// Event listener for proceed to checkout button
chkOutProceedBtn.on( 'click', function () {
  const $orderTable = $( '.table>tbody' ).html();
  $( '#modalTable>tbody' ).empty().append( $orderTable );
  $( '.modal-body' ).append( $chkOutForm );
  $( '.chkOut-tbody' ).css( { 'display': 'flex', 'justify-content': 'center' } );
  setTimeout( removeButtons, 100 );
  let subTotal = getSubtotal() / 100;
  let tax = subTotal * 0.0825;
  let grandTotal = subTotal + tax;
  let rows = $( "#modalTable>tfoot>tr" )
  rows[ 0 ].children[ 1 ].innerText = `$${subTotal }`;
  rows[ 1 ].children[ 1 ].innerText = `$${tax.toFixed(2) }`;
  rows[ 2 ].children[ 1 ].innerText = `$${ grandTotal.toFixed( 2 ) }`;
  if ( subTotal > 0 ) $( "#checkoutModal" ).show()
} );

// Global variable used for payment selection listener
const $paymentSelection = $( '.payment-parent' );

// Event listener for payment selection
$paymentSelection.on( 'click', function (e) {
  if ( e.target.id === 'cardPayMethod' ) {
    $( '.paypal-form' ).remove();
    let paymentParent = $( '.payment-parent' );
    if ( !paymentParent.html().includes( "form" ) ) {
      $( '.payment-parent' ).append( `
      <form class="credit-card-form flexed-out">
        <label for="cc-number">Card Number</label>
        <input type="text" id="cc-number" placeholder="Please enter 16-digit number">
        <label for="cc-expiration">Expiration Date</label>
        <input type="month" id="cc-expiration" name="cc-expiration" style="width: 8em;">
        <label for="cc-cvc">CVV/CVC</label>
        <input type="text" id="cc-cvc" name="cc-cvc" style="width: 2.2em;">
        <label for="cc-holder-name">Card Holder Name</label>
        <input type="text" id="cc-holder-name" name="cc-holder-name" placeholder="First M.(optional) Last">
      </form>
      `);
    }
  } else if ( e.target.id === 'paypalPayMethod' ) {
    $( '.credit-card-form' ).remove();
    let paymentParent = $( '.payment-parent' );
    if ( !paymentParent.html().includes( "form" )) {
      paymentParent.append( `
      <form class="paypal-form flexed-out">
        <label for="paypal-email">Paypal Address</label>
        <input type="email" id="paypal-email">
      </form>
      `);
    }
  } else {
    return null;
  }
} );

//Event listner for submit order button
$( "#modalCancelBtn" ).click( function () {
  $("#checkoutModal").hide()
})
$('#submitOrder').on('click', function(e){
  e.preventDefault();
  let $orderName = $('#orderName').val();
  let $orderEmail = $('#orderEmail').val();
  let $orderCellNumber = $('#orderCellNumber').val();
  if ( $orderName !== '' ) {
    if($orderCellNumber !== '' && $orderCellNumber.match(/(\d){3}(-*)(\d){3}\2(\d){4}/)){
      if($orderEmail === '' || $orderEmail.match(/^(\w+)@(\w+)\.(com|gov|net|edu|mil|org|)$/)){
        payMethodValidator(e);
      } else {
          validatePopUp($('#orderEmail').attr('data-name'), '230px');
          fadeOutVPopUp($('#orderEmail'));
        }
    } else {
      validatePopUp($('#orderCellNumber').attr('data-name'), '285px');
      fadeOutVPopUp($('#orderCellNumber'));
    }
  } else {
    validatePopUp($('#orderName').attr('data-name'), '176px');
    fadeOutVPopUp($('#orderName'));
  }
});

// Global functions
function getSubtotal() {
  let subTotal = 0;
  menuItems.forEach( item => subTotal += item.subTotal );
  return subTotal;
}

function updateTable() {
  $( '#previewPrice' ).html( `$${ getSubtotal() / 100 }` );
  htmlString = '';
  const orderMenu = menuItems.filter( item => item.qty !== 0 );
  orderMenu.forEach( item => {
    htmlString += `
      <tr>
        <td><img class="tiny-size-img" src="${item.itemImg }"></td>
        <td>${item.itemName }<button id=${ item.itemNumber }>X</button></td>
        <td>$${item.itemPrice / 100 }</td>
        <td>${item.qty }</td>
        <td>$${item.subTotal / 100 }</td>
      </tr>`;
  } );
  $( ".table>tbody" ).empty().append( htmlString );

  // reduce order button
  let reduceQtnBtns = $( ".table button" );
  reduceQtnBtns.css( {
    'background-color': 'red',
    'font-style': 'normal',
    'border-radius': '2px',
    'padding': '1px',
    'font-size': '12px',
    'margin-left': '2px',
    'width': '24px'
  } );

  reduceQtnBtns.click( function ( e ) {
    let item = menuItems[ Number( e.target.id ) ];
    if ( item.qty > 0 ) {
      item.qty--;
      item.subTotal = item.itemPrice * item.qty;
    }
    updateTable();
  } );
}

function validatePopUp(field, top, str = ''){
  $('#checkoutModal').append(`<div id="popUp"><p>Invalid ${field}</p></div>`);
  $('#popUp').css({
    'position': 'absolute',
    'top': top,
    'left': '50%',
    'transform': 'translate(-50%)',
    'height': '26px',
    'width': '300px',
    'background': 'gold',
    'padding': '2px',
    'text-align': 'center',
    'filter': 'drop-shadow(2px 4px 6px black)'
  });
  $('#popUp').fadeIn(500);
}

function orderConfirmPopUp(str, top){
  $('#checkoutModal').append(`<div id="popUp"><p style="font-size: 26px;">${str}</p></div>`);
  $('#popUp').css({
    'position': 'absolute',
    'top': top,
    'left': '50%',
    'transform': 'translate(-50%)',
    'background': 'gold',
    'padding': '2px',
    'text-align': 'center',
    'filter': 'drop-shadow(2px 4px 6px black)',
    'border-radius': '16px'
  } ).fadeIn( 500 );
}

const fadeOutOPopUp = () => {
  setTimeout(function(){
  $('#popUp').fadeOut(500, function(){$('#popUp').remove();});}, 3000);
}

const fadeOutVPopUp = (_id) => {
  setTimeout(function(){
  $('#popUp').fadeOut(500, function(){$('#popUp').remove();_id.focus();});},2000);
}

function payMethodValidator(e){
  if ( $( 'input:checked' ).val() === 'paypal' ) {
    let $paypalEmail = $( '#paypal-email' ).val();
    if ( $paypalEmail.match( /^(\w+)@(\w+)\.(com|gov|net|edu|mil|org|)$/ ) ) {
      orderConfirmPopUp( `Thank you for eating with Curry Island, your order will be ready at ${ pickupTime() }`, '21em' );
      fadeOutOPopUp();
      setTimeout( function () { $( '#checkoutModal' ).modal( 'hide' ); }, 3500 );
      setTimeout( function () { window.location.reload( true ); }, 4000 );
    } else {
      validatePopUp( 'Paypal address', '28em' );
      fadeOutOPopUp();
    }
  } else if ( $( 'input:checked' ).val() === 'credit' ) {
    let $ccNumber = $( '#cc-number' ).val();
    let $ccCVC = $( '#cc-cvc' ).val();
    let $ccHolderName = $( '#cc-holder-name' ).val();
    if ( $ccNumber.match( /^([0-9]){4}(\s*)([0-9]){4}\2([0-9]){4}\2([0-9]){4}$/ ) ) {
      if ( $ccCVC.match( /([\d]){3}/ ) ) {
        if ( $ccHolderName.match( /^([a-z]+)\s(\w+\s)*([a-z]+)$/ ) ) {
          orderConfirmPopUp( `Thank you for eating with Curry Island, your order will be ready at ${ pickupTime() }`, '21em' );
          fadeOutOPopUp();
          setTimeout( function () { $( '#checkoutModal' ).modal( 'hide' ); }, 3500 );
          setTimeout( function () { window.location.reload(true); }, 4000 );
        } else {
          validatePopUp( 'Card Holder Name', '20em' );
          fadeOutOPopUp();
        }
      } else {
        validatePopUp( 'CVV/CVC Number', '20em' );
        fadeOutOPopUp();
      }
    } else {
      validatePopUp( 'Credit Card Number', '20em' );
      fadeOutOPopUp();
    }
  } else {
    alert( "You must select a payment type!" )
  }
}

function removeButtons() {
  const rows = Array.from( $( '#modalTable>tbody>tr' ) )
  for ( let row of rows ) {
    row.children[ 1 ].lastChild.remove()
  }
}