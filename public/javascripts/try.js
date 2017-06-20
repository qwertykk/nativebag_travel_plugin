/**
 * Created by krishna on 19/5/17.
 */

var $widget_id = "#NB_widget";

// Add one to cart in summary
$($widget_id).on('click','.cart_add', function (){
    var $value = parseInt($(this).next().val());
    $(this).next().val($value+1);
    $(this).siblings("p.save").text("Save");
});

// Subtract one from cart -- Minimum till zero
$($widget_id).on('click','.cart_subtract',function () {
    var $value = parseInt($(this).prev().val());
    if($value >=1)
        $(this).prev().val($value-1);
    $(this).siblings("p.save").text("Save");
});

$($widget_id).on('input','.quantity', function () {
   $(this).siblings("p.save").text("Save")
});

// post data to NB on click save
$($widget_id).on('click','p.save', function () {
   alert(1);
   var $quantity = $(this).siblings("input.quantity").val();
   var $cartId = null;
   var $url = 'http://api.test.nativebag.in/v1/cart/update-quantity';
   // post values are =>id :cart id which is available in first API,q:quantity of item,sid:session Id
   var $sid;
   $.get('/sid').done(function (data) {
       if (data !== 'error') {
           $sid = data.sid;
           $.post('http://api.test.nativebag.in/v1/cart/cart-items', {sid:$sid}).done(function (body) {
                   $cartId = (body.CartItems[0].CartId);
               $.post($url, {id:$cartId, sid:$sid, q: $quantity}).done(function(body){
                   console.log(body);
                   $quantity.siblings("p.save").text('');
               })

           });
       }
       else if (data === 'error')
           return 'Error in getting session ID';

   });

   // $.ajax({
   //      url: $url,
   //      crossDomain:true,
   //      data: {
   //          quantity : $quantity,
   //          sid: $sid
   //      },
   //      type: "POST",
   //      // dataType: "json",
   //
   //      //on success
   //      success: function(response){
   //      },
   //      //on error
   //      error: function(jqXHR, exception){
   //          //bad request
   //          console.log(jqXHR.status);
   //          console.log(exception);
   //      }
   //  });

});

$(".send").on('click', function (){
    alert(1);
    // const $this = $(this);
    // const $id = $this.attr("button-id");
    // const $type = $this.attr("request-type");
    // const $sid = $this.attr("sid");
    // var $url;
    // // const $id = id;
    // // const $sid = sid;
    // console.log("sid ="+$sid+"\nid = " + $id + "\ntype = " + $type);
    // if ($type === "remove"){
    //     $url = "http://api.test.nativebag.in/v1/cart/remove-cart-items";
    // }else if($type === "add"){
    //     $url = "http://api.test.nativebag.in/v1/cart/create-new";
    // }
    // $.ajax({
    //     url: $url,
    //     crossDomain:true,
    //     data: {
    //         id : $id,
    //         sid: $sid
    //     },
    //     type: "POST",
    //     // dataType: "json",
    //
    //     //on success
    //     success: function(response){
    //         // console.log(response.count);
    //         if ($type === "remove"){
    //             $this.attr("request-type", "add");
    //             $this.text("Add to Cart")
    //
    //         }else if($type === "add"){
    //             $this.attr("request-type", "remove");
    //             $this.text("Remove from Cart")
    //         }
    //
    //         console.log("\n Response: count = "+response.count);
    //         console.log("\n Response: totalAmount = "+response.totalAmount);
    //         document.getElementById('cart').innerHTML = response.count+' item(s) - Rs.' + response.totalAmount;
    //         // $(".summary").load("summary.pug");
    //         // $(".summary").show(1000);
    //         //do something after something is received from php
    //     },
    //     //on error
    //     error: function(jqXHR, exception){
    //         //bad request
    //         console.log(jqXHR.status);
    //         console.log(exception);
    //     }
    // });
});

$( $widget_id ).on( "submit",".delivery_details", function( event ) {
    event.preventDefault();
    var $data =  $( this ).serialize();
    console.log($data);

    var data = new FormData( $(this) );
    // console.log(JSON.stringify(data));
    alert(data);
    for (var key of data.entries()) {
        console.log(key[0] + ', ' + key[1]);
        alert(key[0]+', '+ key[1]);
    }
    // $.ajax( {
    //     processData: false,
    //     contentType: false,
    //
    //     data: data,
    //     dataType: 'json',
    //     type: $( this ).attr( 'method' );
    // url: 'yourapi.php',
    //     success: function( feedback ){
    //     console.log( "the feedback from your API: " + feedback );
    // }
    // $.post('', $data, function (data) {
    //
    // })

});

$($widget_id).on('click', 'button.send', function () {
    const $this = $(this);
    const $id = $this.attr("button-id");
    const $type = $this.attr("request-type");
    const $sid = $this.attr("sid");
    var $url;
    // const $id = id;
    // const $sid = sid;
    console.log("sid ="+$sid+"\nid = " + $id + "\ntype = " + $type);
    if ($type === "remove"){
        $url = "http://api.test.nativebag.in/v1/cart/remove-cart-items";
    }else if($type === "add"){
        $url = "http://api.test.nativebag.in/v1/cart/create-new";
    }
    $.ajax({
        url: $url,
        crossDomain:true,
        data: {
            id : $id,
            sid: $sid
        },
        type: "POST",
        // dataType: "json",

        //on success
        success: function(response){
            // console.log(response.count);
            if ($type === "remove"){
                $this.attr("request-type", "add");
                $this.text("Add to Cart")

            }else if($type === "add"){
                $this.attr("request-type", "remove");
                $this.text("Remove from Cart")
            }

            console.log("\n Response: count = "+response.count);
            console.log("\n Response: totalAmount = "+response.totalAmount);
            document.getElementById('cart').innerHTML = response.count+' item(s) - Rs.' + response.totalAmount;
            // $(".summary").load("summary.pug");
            // $(".summary").show(1000);
            //do something after something is received from php
        },
        //on error
        error: function(jqXHR, exception){
            //bad request
            console.log(jqXHR.status);
            console.log(exception);
        }
    });
});