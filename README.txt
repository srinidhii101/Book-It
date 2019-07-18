Introduction 
Book It is one stop potential destination for ordinary services one might need. 
The web application provides a platform for persons with various technical skills
and expertise to announce their presence and the services they can provide to people
living in the Halifax community or region. ("Group 9", 2019)

One of the features of the application is Profile management which per our scope
as defined in the Proposal includes Registration and Login. Registration
allow users to register/signup to have an account and the Login allows users to login 
with their account details.

For this assignment, I have taken the responsibility of connecting the front-end
of the Registration and the Login activities to the backend of the application.
This has ensured that new users are able to create their account on the platform
and are able to later login with credentials they created. 

Bluenose and GitLab links

The link to the Registration on Bluenose is: http://bluenose.cs.dal.ca:23487/register
and Login is: http://bluenose.cs.dal.ca:23487/login

Codes related these features which I have worked on are commited to "register_user" branch
on the Gitlab repository of the group project found here: 
https://git.cs.dal.ca/khackett/book-it/tree/register_user
(The application structure has been adopted from Kirby Hacket's work for assignment 2
which the group agreed to use)

Files and Codes related to features I worked on in Assignment 4
Front-end: 
pages/register.js
pages/login.js

Back-end
api/controllers/usersController.js ('createUser' and 'userLogin' functions)
api/models/userSessions.js


How to Register

1. A user needs to provide username, email and password to create an account
2. Validation rule have been applied to ensure these required information are 
provided and in the format required. Validation is performed at the front-end before
the details are submitted to the backend application server and subsequent submission
to the database
3. The registration process provides a feedback to the user to inform a successful
account creation or server error in case any issues happend at the backend.
If the account creation was successful, the user is redirected to the home of the 
application


How to Login
1. A user needs to provide a username and password to login into the application
2.  Validation rule have been applied to ensure these required information are 
provided and in the format required. Validation is performed at the front-end before
the details are submitted to the backend application server and subsequent verification
from the database
3. If the login is successful, that is an account was found in the database to match the 
details supplied by the user, the login is successful and user is redirected to the home page.
The user is held at the login page to provide the correct credntials to login


Encryption
Encryption has been implemented using Crypto JS to secure when transmitting from the 
front end to server and the encrypted password is saved in database to ensure further
security at the database level. Encryption is done in both account creation and login
Decryption is done at the server end during login.


Code Reuse
1. As stated earlier,the basic application structure and front-end development have been
adopted from Kirby Hackets work for assignment 2. 
2. To understand how user cration and login are done in Mongo Express React and Node application
I followed a video tutorial from https://www.youtube.com/watch?time_continue=180&v=s1swJLYxLAA



References:
1. Nketia, A (2019). CSCI 5709-Advance Web Development - Assignment 3, Unpublished manuscript, Dalhousie University

2.Group 9, Advance Web Summer 2019 (2019). CSCI 5709-Advance Web Development - Project Proposal, Unpublished manuscript, Dalhousie University

3. Building a Login System for a MERN (MongoDB, Express.js, React.js, Node.js) Web App. (2019). 
Retrieved 10 July 2019, from https://www.youtube.com/watch?time_continue=180&v=s1swJLYxLAA
- I followed this tutorial to understand how user creation and login are implemented on MERN

4. crypto-js. (2019). Retrieved 10 July 2019, from https://www.npmjs.com/package/crypto-js
- I utilised this Librabry to implement AES encryption and decryption of user passwords


