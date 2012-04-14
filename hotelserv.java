import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import java.net.*;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.json.*;


public class hotelserv extends HttpServlet {
   
   public void doGet(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException
   {
				PrintWriter out = response.getWriter();
				
				response.setContentType("text/plain");

				
				//out.println("In the servlet");
				
				String city = request.getParameter("city");
				String hotel = request.getParameter("hotel");
				
				String tempcity = city.replace(' ','+');
				//String tempcity = "Los+Angeles";
				//String hotel = "Mariott";
				String perlhotelLocation = "http://cs-server.usc.edu:25696/cgi-bin/perl2.pl?city=" +tempcity + "&hotel=" + hotel ;
				
				//Setting up connection to perl file
				
				//out.println(perlhotelLocation);
				URL perlHotel = new URL(perlhotelLocation);
				URLConnection perlConnection = perlHotel.openConnection();
				perlConnection.setAllowUserInteraction(false);
				
				
				BufferedReader bufferXML = new BufferedReader(new InputStreamReader(perlConnection.getInputStream()));
                
				String stringFromXML;
				String fullXMLString="";
				
				//out.println("here");
				while ((stringFromXML = bufferXML.readLine()) != null) 
					{
						fullXMLString = fullXMLString + stringFromXML;
					}
				//out.print(fullXMLString);
					
				bufferXML.close();
				
				//Parsing the XML
				
				SAXBuilder builder = new SAXBuilder();
				Reader in = new StringReader(fullXMLString);
				
				Document document = null;
				Element hotels = null;
				Element childhotel = null;
				int num_of_hotels;
				
				try
				{
					document = builder.build(in);
					hotels = document.getRootElement();
				
					num_of_hotels = Integer.parseInt(hotels.getAttributeValue("total"));
					
					JSONObject Hotels = new JSONObject();
					JSONObject Hotel = new JSONObject();
		            JSONArray HotelRow = new JSONArray();
		            JSONObject HotelInfo = new JSONObject();
					
					//out.println(num_of_hotels);
					
					for(int i =0;i<num_of_hotels;i++)
					{
							HotelInfo = new JSONObject();
							
							childhotel = (Element) hotels.getChildren().get(i);
							
							String name = childhotel.getAttributeValue("name");
							name = name.replace('!','&');
							name = name.replace('%','\'');
							HotelInfo.put("name",name );	
							HotelInfo.put("location",childhotel.getAttributeValue("location"));
							HotelInfo.put("no_of_star", childhotel.getAttributeValue("no_of_stars"));
							HotelInfo.put("no_of_reviews", childhotel.getAttributeValue("no_of_reviews"));	
							HotelInfo.put("image_url", childhotel.getAttributeValue("image_url"));	
							HotelInfo.put("review_url", childhotel.getAttributeValue("review_url"));	
							
							HotelRow.put(HotelInfo);
					}
					
					Hotel.put("hotel", HotelRow);
					Hotels.put("hotels",Hotel);
					out.println(Hotels.toString());
				
				/*for(int i =0;i<num_of_hotels;i++)
				{
					out.print(name[i] + "," + location[i]);
					out.print("," + no_of_star[i] + "," + no_of_reviews[i]);
					out.print(image_url[i] + "," + review_url[i] + "\n");
				}*/
				}
				catch(Exception e){
					 out.println(e.toString());
					 e.printStackTrace();
				}
			
	}
}