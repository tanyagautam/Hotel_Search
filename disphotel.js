	var xhr = false;
	function check()
	{
		    var cityt = document.getElementById('city');
			var hotelt = document.getElementById('hotel');
			var cityval = cityt.value;
			if(cityval.replace(/\s/g,"") == "")
			{
				alert("Please enter a city name");
				return false;
			}
			else
			{
				xhr = false; 
	     		var	url = "http://cs-server.usc.edu:25697/examples/servlet/hotelserv?city="+cityt.value+"&hotel="+hotelt.value;
				
				if(window.XMLHttpRequest) 
				{
					try {
							xhr = new XMLHttpRequest();
					} 
					catch(e) {
						xhr = false;
					}
				} 
				else if(window.ActiveXObject) 
				{
					try {
						xhr = new ActiveXObject("Msxml2.XMLHTTP");
					}		 
					catch(e) {
						try {
							xhr = new ActiveXObject("Microsoft.XMLHTTP");
						}	 
						catch(e) {
							xhr = false;
						}
					}
				}
				
				if(xhr) 
				{
					xhr.onreadystatechange = showContent;
					xhr.open("GET", url, true);
					xhr.send(null);
				}

		}	
	}
	
	function showContent()
	{
		if (xhr.readyState == 4 ) {
			if (xhr.status == 200) {	
			    var response = xhr.responseText;
				
				var hotelObject = eval('('+response+')');
				
				var length = hotelObject.hotels.hotel.length;
				
				if(length == 0)
				{
				 var outmsg = "<h2>No Records Found!!!!<h2>";
				
				}
				else
				{
					var outmsg = "<table border='1' height='50px' cellpadding='10' align = 'right'>"
				              + "<th>Image</th>"
							  + "<th>Name</th>"
							  + "<th>Location</th>"
							  + "<th>Rating out of 5</th>"
							  + "<th>Reviews</th>"
							  + "<th>Facebook</th>";
				
				for(i=0;i<length;i++)
				{
				
					var name = hotelObject.hotels.hotel[i].name.trim();
					
					var img_url = hotelObject.hotels.hotel[i].image_url.trim();
					var caption = "This hotel is located at " + hotelObject.hotels.hotel[i].location.trim() + " and has a rating of " + hotelObject.hotels.hotel[i].no_of_star.trim();
					
				
					        outmsg += "<tr>";
							outmsg += "<td>";
							outmsg += "<img src='";
							outmsg += hotelObject.hotels.hotel[i].image_url + "' height = '100' width = '200' alt='no image available'>" ;
							outmsg += "</td>";
							outmsg += "<td>";
							outmsg += hotelObject.hotels.hotel[i].name;
							outmsg += "</td>";
							outmsg += "<td>";
							outmsg += hotelObject.hotels.hotel[i].location;
							outmsg += "</td>";
							outmsg += "<td>";
							outmsg += hotelObject.hotels.hotel[i].no_of_star;
							outmsg += "</td>";
							outmsg += "<td>";
							
							if(hotelObject.hotels.hotel[i].no_of_reviews == '0')
							{
									var link = "no reviews"; 
									outmsg +=" No Reviews Found" + "</td>";
							}
							else
							{
								var link = "http://www.tripadvisor.com/" + hotelObject.hotels.hotel[i].review_url.trim();
								outmsg += "<a href='"+ hotelObject.hotels.hotel[i].review_url +"'>"+hotelObject.hotels.hotel[i].no_of_reviews + "</a></td>";
							}
							
							window.fbAsyncInit();
							outmsg += "<td><fb:login-button onlogin = 'postReview(\""+ name +"\",\""+ link + "\",\""+ img_url +"\",\""+caption+"\")'>facebook</fb:login-button></td></tr>";
						
				}
				
				outmsg = outmsg + "</table>" ;
				}
				document.getElementById('content').innerHTML = outmsg;
			}
			
		}
	}
	
function postReview(hname,hlink,hpicture,hcaption){
	
if(hlink == "no reviews")
{
	FB.ui(
  {
    method: 'feed',
	name: hname,
	link: hlink,
    picture: hpicture,
    caption: 'Check this hotel',
    description: hcaption,
	//properties: {"Find the Hotel Reviews" : {text:'here', href:hlink}}
  },
  function(response) {
    if (response && response.post_id) {
      alert('Post was published.');
    } else {
      alert('Post was not published.');
    }
  });
 }
else
{
  FB.ui(
  {
    method: 'feed',
	name: hname,
	link: hlink,
    picture: hpicture,
    caption: 'Check this hotel',
    description: hcaption,
	properties: {"Find the Hotel Reviews" : {text:'here', href:hlink}}
  },
  function(response) {
    if (response && response.post_id) {
      alert('Post was published.');
    } else {
      alert('Post was not published.');
    }
  }); 
}

}