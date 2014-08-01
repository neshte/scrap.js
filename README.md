scrap.js
========

Simple node.js snippet for dumping html tables to csv format

Run:

cd scrap.js
node scrap.js

Config:

var url = "http://www.example.com"; 
Use the url of the html to scrap.
Note: If there are many and they change a querystring or something, for now you will need to change the callback to modify the url string according to your needs. You could help yourself by reading the variables currentrequests and maxrequests.

var headers = {"HeaderName":"HeaderValue"};
Set http custom headers.
Example: If you are in a private site where a session is needed, you could use something like Fiddler and hijack your own session cookies, or Authentication headers.

var trselector = "";
Set the selector to your <tr> rows you want to scrap.

var tdselector = "";
Set a relative to the trselector tdselector of the <td> cells you want to scrap to your csv.

var maxrequests = 0;
Set this to the number of pages you want to dump

Limits:

For now it just works with GET requests.
For now it assumes tds contain immediately the clean text to scrap.