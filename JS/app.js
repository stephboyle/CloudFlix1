//The URIs of the REST endpoint

RAV = "https://prod-53.eastus.logic.azure.com:443/workflows/f8e2f5836d5548ccac8bbb609ff54060/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=odjHZ9zHdL_U7HVD-k8KGBlrT7k8SstZneyq3Zohyl8";
IUPS = "https://prod-77.eastus.logic.azure.com:443/workflows/49f7527f0a5d4640ab61ee477d1702f4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MR6t9lhzGi5QFxwCHfOeOC5zVv4xaq8KDP4lRJ9ZY8k";

BLOB_ACCOUNT = "https://cloudflixblobnew.blob.core.windows.net";

$(document).ready(function() {

 

 

  $("#getVideo").click(function(){

 

      //Run the get asset list function

      getVideo();

 

  });

 

   //Handler for the new asset submission button

  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();

  });

});

 

//A function to submit a new asset to the REST endpoint

function submitNewAsset(){

 //Create a form data object

 submitData = new FormData();

 //Get form variables and append them to the form data object

 submitData.append('Title', $('#Title').val());

 submitData.append('Producer', $('#Producer').val());

 submitData.append('Publisher', $('#Publisher').val());

 submitData.append('Genre', $('#Genre').val());

 submitData.append('Age', $('#Age').val())

 submitData.append('File', $("#UpFile")[0].files[0]);

 

 //Post the form data to the endpoint, note the need to set the content type header

 $.ajax({

 url: IUPS,

 data: submitData,

 cache: false,

 enctype: 'multipart/form-data',

 contentType: false,

 processData: false,

 type: 'POST',

 success: function(data){

 

 }

 });

 

 

}

 

//A function to get a list of all the assets and write them to the Div with the AssetList Div

function getVideo(){

//Replace the current HTML in that div with a loading message

$('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

$.getJSON(RAV, function( data ) {

//Create an array to hold all the retrieved assets

var items = [];

 

//Iterate through the returned records and build HTML, incorporating the key values of the record in the data

$.each( data, function( key, val ) {

  items.push( "<hr />");

  items.push("<video src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400' autoplay muted controls> </video> <br />");

  items.push( "Video title: " + val["Title"] + "<br />");

  items.push( "Producer and Publisher: " + val["Producer"] + ", " + val["Publisher"]+"<br />");

  items.push( "Age Rating: " + val["age"] + "<br />");

  items.push( "Genre : " + val["Genre"] + "<br />");

  items.push( "<hr />");

});

 

// Play the video

$('#ImageList').trigger('play');

 

// Pause the video

$('#ImageList').trigger('pause');

//Clear the assetlist div

$('#ImageList').empty();

//Append the contents of the items array to the ImageList Div

$( "<ul/>", {"class": "my-new-list",html: items.join( "" )}).appendTo( "#ImageList" );

 

});
}
