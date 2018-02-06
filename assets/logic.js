
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD67kHnvcND1yri0XgLvN51BMZ06e8LkqE",
    authDomain: "trainschedule-aca4d.firebaseapp.com",
    databaseURL: "https://trainschedule-aca4d.firebaseio.com",
    projectId: "trainschedule-aca4d",
    storageBucket: "trainschedule-aca4d.appspot.com",
    messagingSenderId: "472787302121"
  };

  firebase.initializeApp(config);

  var trainData = firebase.database();

  $("#add-train-btn").on("click", function() {

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainUnix = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency-input").val().trim();


    var newTrain = {

        name: trainName,
        destination: destination,
        firstTrain: firstTrainUnix,
        frequency: frequency
    };

trainData.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(firstTrainUnix);
console.log(newTrain.frequency);

alert("Train Successfully Added!");

$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("frequency-input").val("");

return false;

  });


trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
    var tMinutes = tFrequency - tRemainder;

    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    console.log(tMinutes);
    console.log(tArrival);
    console.log(moment().format("hh:mm A"));
    console.log(tArrival);
    console.log(moment().format("X"));

    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + 
        tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});



//Coverr Logic BELOW
//jQuery is required to run this code


$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}