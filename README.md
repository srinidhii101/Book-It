https://github.com/zeit/next.js
- This was used to configure the next.js environment and understand what this variant is

https://github.com/zeit/next.js/wiki/Global-styles-and-layouts
- This was used to get an idea about proper project structure
- line 5 - 13 in layouts/default.js was where the code was applied.
- It was modified to allow the wrap the /pages with a consistent layout

https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
- This was used to get idea about routing using next
- Used in Line 28 in pages/register.js and Line 24 in login
- I used this to reroute the app properly to the homepage after it will later on become authenticated

https://css-tricks.com/image-upload-manipulation-react/
https://github.com/damonbauer/react-cloudinary/blob/master/src/App.js
- These code snippets were used to setup the frontend component of the upload image functionality
- Line 23 - 47 & 138 - 162 in components/addServiceModal.js
- This functionality required a 3rd party service to host the image after upload, so I integrated it to
  work with my codebase.

https://github.com/zeit/next.js#custom-document
- pages/\_document.js file was copied to edit the html tag
- This was required to become w3c complaint as required, specifically the lang="en" portion
- Most of the document remains the same with a few unneeded parts cut out

https://stackoverflow.com/questions/29820791/git-ignore-node-modules-folder-everywhere
- This was used to ignore bulky unneeded files when using git
- This file remains pretty much unedited, and was used to prevent unneeded files from getting
  on Gitlab such as the node_modules folder

https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
- Password Regex was taken and left as is. It is imported as a helper function to do some
  front-end validation
- Line 6 of functions/validate.js

https://stackoverflow.com/questions/49992423/using-reactstrap-with-next-js
https://spectrum.chat/next-js/general/ignoring-folders-files-specifically-fonts~4f68cfd5-d576-46b8-adc8-86e9d7ea0b1f
- Used code from these sources to get react-bootstrap working with next.js
- Also to allow custom css to work inside the project. The code was kept as is,
  and is the entirety of the next.config.js file.

http://regexlib.com/REDetails.aspx?regexp_id=26
- Used this regex to validate emails on the front end. It is used in the functions/validate.js file
  in the isValidEmail function.
- I have no modified the regex in anyway besides getting it hook up to my project.
- Line 10 of functions/validate.js

https://react-bootstrap.github.io/
- Refactored Login Form code to fit the case for efficiency pages/login.js line 45 - 99
- Used the documentation to properly utilize grid layouts and used their built-in components.

https://www.kijiji.ca/
- Used as a point of reference since the website offers similar services

https://github.com/FortAwesome/react-fontawesome
- Icons for the application
- in the index page, for the promoted services

https://github.com/zeit/now-builders/issues/155#issuecomment-470932812
- Learning how to deploy using next.js and now command.

https://stripe.com/docs/recipes/elements-react
https://alligator.io/react/payments-stripe-checkout-react/
https://hackernoon.com/stripe-api-reactjs-and-express-bc446bf08301
- Checkout guides with stripe

http://regexlib.com/Search.aspx?k=postal+code&AspxAutoDetectCookieSupport=1
- Used this regex to validate postal code on the front end.It is used in the functions/validate.js file
in the isPostalCodeValid function.
- Same regex has been used in the code.

http://regexlib.com/Search.aspx?k=phone
- Used this regex to validate phone number on the front end.It is used in the functions/validate.js file
in the isValidPhone function.
- Same regex has been used in the code.

https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274
- getting server side running

https://stackoverflow.com/questions/43694799/how-can-i-connect-to-mongodb-atlas-using-robomongo
https://stackoverflow.com/questions/19961387/trying-to-get-a-list-of-collections-from-mongoose
- Mongodb atlas and robomongo issues

https://stackoverflow.com/questions/36234137/typeerror-class-function-is-not-a-function-at-object-anonymous
- Models exporting issues

https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
- Environment variables

https://sailsjs.com/documentation/anatomy
- Better project structure as suggested by Alfred

https://mongoosejs.com/docs/deprecations.html#-findandmodify-
- Fix console errors on line 21 of server.js
- Took the code to hide errors "mongoose.set('useFindAndModify', false)"

1. Modified Code:

      var receiptOutput = receipt.create([{
           type: 'text',
           value: [
               'Book It',
               'Thanks for supporting Local!',
               ]     

      Reference Code:

      const output = receipt.create([
           { type: 'text', value: [
               'MY AWESOME STORE',
               '123 STORE ST',
               ]
           }

       Reference:
       Receipt. Retrieved from https://www.npmjs.com/package/receipt

       This reference has been used to create the receipt for the customer as per the requirement.

   2. Modified Code:

       await transporter.sendMail({
           from: 'singh.manpreet4664@gmail.com',
           to: request.body.email,
           subject: "Your Order Receipt",
           text: receiptOutput,


      Reference Code:

      const mailOptions = {
           from: "nicklaus.roach@gmail.com",
           to: "nicklaus.roach@gmail.com",
           subject: "Node.js Email with Secure OAuth",
           generateTextFromHTML: true,
           html: "<b>test</b>"
       };

      Reference:
      (2019, June 04). Sending Emails with Node.js Using SMTP, Gmail, and OAuth2.
      Retrieved from https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

      This tutorial has been used to create the email server.

   3. Modified Code:

      setTimeout(function () {
       window.location.reload();
       }, 3000);

      Reference Code:

      window.location.reload(true);

      Reference:
      FreeCodeCamp. Location Reload Method. Retrieved from https://guide.freecodecamp.org/javascript/location-reload-method/

      1. ObjectID()¶. Retrieved from https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html

      2. Reading and Writing Files With NodeJS. Retrieved from https://tutorialedge.net/nodejs/reading-writing-files-with-nodejs/

      3. React-stripe-checkout. Retrieved from https://www.npmjs.com/package/react-stripe-checkout

      4. Dateformat. Retrieved from https://www.npmjs.com/package/dateformat

      To understand how user cration and login are done in Mongo Express React and Node application
      I followed a video tutorial from https://www.youtube.com/watch?time_continue=180&v=s1swJLYxLAA

      References:
      1. Nketia, A (2019). CSCI 5709-Advance Web Development - Assignment 3, Unpublished manuscript, Dalhousie University

      2.Group 9, Advance Web Summer 2019 (2019). CSCI 5709-Advance Web Development - Project Proposal, Unpublished manuscript, Dalhousie University

      3. Building a Login System for a MERN (MongoDB, Express.js, React.js, Node.js) Web App. (2019).
      Retrieved 10 July 2019, from https://www.youtube.com/watch?time_continue=180&v=s1swJLYxLAA
      - I followed this tutorial to understand how user creation and login are implemented on MERN

      4. crypto-js. (2019). Retrieved 10 July 2019, from https://www.npmjs.com/package/crypto-js
      - I utilized this Library to implement AES encryption and decryption of user passwords
