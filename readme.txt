Name          :Tanya Gautam
Class Id      :571025696
Homework8 URL  :http://cs-server.usc.edu:25697/hotel_fb.html
Main URL      :http://www-scf.usc.edu/~tanya/class.html

______________________________________________________________________________________________________________________________________________________
----------------
Files Submitted
----------------

1) hotel_fb.html
2) perl2.pl
3) hotelserv.java
4) disphotel.js
5) readme.txt

_________________________________________________________________________________________________________________________________________________________

--------------------------
Description of the files
--------------------------

hotel_fb.html
_______________

This file is the main  page of the homework 8.It contains a textbox and a drop down selection list
along with a submit button.The user is suposed to enter a name of city in the text box and then
select the hotel name which he wants to search in the enters city.A validation check is done if the 
user enters no city name.The city name along with the hotel name are passed to the servlet using as 
servlet using AJAX.


perl2.pl
________________

This is the perl file which contains the reading of data sent by the servlet.After getting this data the hotel 
and city names are extraced from it and passed as an argument to the tripadvisor.com/Search which searches the necessary information.This information is then 
captured by the perl script and displayed as a reponse to the user query.

disphotel.js
_______________

This is the javascript which contains the AJAX and establishess the connection to the java servlet.
It also contains the API used for displaying the facebook functionality.
 
hotelserv.java
_________________

This is the java servlet which captures the parameter passed by the AJAX and send this as an argument to 
the perl file.
__________________________________________________________________________________________________________________________________________________________

   

