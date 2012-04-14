#!/usr/bin/perl -w
use CGI;
use LWP::Simple;


print "Content-type: text/plain \n\n";

#open (MYFILE, '>data.xml');

$request_method = $ENV{'REQUEST_METHOD'};								

if($request_method eq "GET")
{
	$form_info=$ENV{'QUERY_STRING'};
}
else
{
	$size_of_form_info=$ENV{'CONTENT_LENGTH'};
	read(STDIN, $form_info, $size_of_form_info);
}

#Splitting the query string into name value pairs
@nvpairs = split(/&/, $form_info);

foreach $pair(@nvpairs)
{
	($name, $value) = split(/=/, $pair);
	
	if($name eq 'city')
	{
		$city = $value;
	}
	if($name = 'hotel')
	{
		$hotel = $value;
	}
}

#print "$hotel";
#print "$city";

#Getting the url of trip advisor with hotel and city name

$URL="http://www.tripadvisor.com/Search?q=".$hotel.'+'.$city;

my $content = get $URL;

die "URL NOT DEFINED" unless defined $content;

#Finding all the hotels by the given name in the given city

@hotels =$content=~ m/div class="searchResult srLODGING.*?div/sg;

                  
$numofhotel = @hotels;

#$xml = new XML::Simple;

$data = "<?xml version='1.0' encoding='UTF-8'?>"."\n";
$data = $data."<hotels total='".$numofhotel."'>"."\n";

#Checking if the following hotel is present in the given city

for($i = 0;$i<$numofhotel;$i++)
{
		#Finding the details of hotel
		@image= $content =~ m/div class="searchResult srLODGING.*?<div class="sizedThumb".*?img src="(.*?)"/sg ;		
		
		@name= $content =~ m/div class="searchResult srLODGING.*?<div class="sizedThumb".*?alt="(.*?)"/sg;
		
		@location= $content =~ m/div class="searchResult srLODGING.*?<div class="srSubHead.*?; (.*?) <\/div>/sg;
		
		@rating = $content =~ m/div class="searchResult srLODGING.*?<div class="rating".*?alt="(.*?) of 5 stars"\/><\/span>/sg;
		
		@numofreviews= $content =~ m/div class="searchResult srLODGING.*?<div class="rating">.*?<\/span>(.*?) reviews/sg;
		
		@reviewlink = $content =~ m/<div class="searchResult srLODGING.*?<div class="rating">.*?<a href="(.*?)"/sg;
		
		if($image[$i] eq "")
		{	
			$image[$i] = "";
		}
		if($name[$i] eq "")
		{	
			$name[$i] = "no content";
		}
		if($location[$i] eq "")
		{	
			$city =~ s/\+/ /g;
			$location[$i] = "$city";
		}
		if($rating[$i] eq "")
		{	
			$rating[$i] = "no rating found "; 
		}
		if($numofreviews[$i] eq "")
		{	
			$numofreviews[$i] = "0"; 
		}
		if($reviewlink[$i] eq "")
		{
			$reviewlink[$i] = "no reviews";
		}
		
		$name[$i] =~ s/\&/\!/g;
		$name[$i] =~ s/\'/\%/g;
		
		
		$data = $data."<hotel name='".$name[$i]."' location='".$location[$i]."' ";
		$data = $data."no_of_stars='".$rating[$i]."' no_of_reviews='".$numofreviews[$i]."' ";
		$data = $data."image_url='".$image[$i]."' review_url='".$reviewlink[$i]."' />"."\n";
}

$data = $data."</hotels>";

print "$data";
#print MYFILE "$data";


 
