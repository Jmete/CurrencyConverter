// Currency Converter
// By James Mete 2017
// www.jamesmete.com

// This object will hold currency names and codes
var CURR = {};

$(document).ready(function(){
    // Init the app
        $.get('http://openexchangerates.org/api/currencies.json', function(answer) {
            // Gets Currency names
            CURR = answer;
        });
        getCurrencies();
    });

 $('#num').on('keypress', function (e) {
    // Allows user to press enter to convert
         if(e.which === 13){

            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            letsConvert();

            //Enable the textbox again if needed.
            $(this).removeAttr("disabled");
         }
   });

function letsConvert(){
    // Validates input and passes args to api query function.
    if (!$('#num').val() || !$('#from').val() || !$('#to').val()){
        return;
    }
    var theN = $('#num').val();
    var theF = $('#from').val();
    var theT = $('#to').val();

    cM(theN,theF,theT);

}

function cM(num,from,to){
    // Submits the query to the server and gets the conversion.
    var n = num;
    var f = from;
    var t = to;
    var theQuery = "/xr/?num="+n+"&from="+f+"&to="+t;

    $.get(theQuery, function(answer) {
        // Display Conversion Answer
        $('#result').html(answer);
    });
}

function getCurrencies(){
    // Get the currencies available and populate select options.
    $.get("/xr/all", function (answer) {
        // console.log(Object.keys(answer).length);
        for(var i in answer) {
            if(i in CURR){
                var cName = getCountry(i);
                $('#from').append("<option value='"+i+"'>"+i+" "+cName+"</option>");
                $('#to').append("<option value='"+i+"'>"+i+" "+cName+"</option>");
            }

        }
    });
}



function getCountry(code) {
    // Get the Country Name from the Code
    return CURR[code];
}

function switchSelects() {
    var a = $('#to').val();
    var b = $('#from').val();

    $('#from').val(a);
    $('#to').val(b);

}

// function checkCURR(){
//     console.log(getCountry('USD'));
//     console.log(Object.keys(CURR).length);
// }


