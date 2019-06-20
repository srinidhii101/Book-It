Team Book-it

Members:
Kirby Hackett - B00733131

1. Starting up the application
  a. For development
    - "npm run dev"
  b. Check production version
    = "npm run build"
    - "npm run start"
  c. Host on remote server (for our production build)
    - after signing up for github and linking your account to zeit "now login"
    - "npm run now-build"
    - "now"
    - if you want it to run at another address "now alias **OLD_URL** **NEW_NAME"
      + ex: "now alias https://book-it.kirbyhackett.now.sh book-it"


This project can be accessed at the following URL
- http://bluenose.cs.dal.ca:15057/

The project folders exist in the following directory on bluenose
~/public_html/csci4177/a2/

Gitlab username: khackett
Project url: https://git.cs.dal.ca/khackett/a2_kirby_hackett/

This implementation utilizes React.js as a framework, Next.js for routing, and react-bootstrap
for styling.

References:

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
- pages/_document.js file was copied to edit the html tag
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
<<<<<<< HEAD


http://regexlib.com/Search.aspx?k=postal+code&AspxAutoDetectCookieSupport=1
- Used this regex to validate postal code on the front end.It is used in the functions/validate.js file
in the isPostalCodeValid function.
- Same regex has been used in the code.

http://regexlib.com/Search.aspx?k=phone
- Used this regex to validate phone number on the front end.It is used in the functions/validate.js file
in the isValidPhone function.
- Same regex has been used in the code.
=======
>>>>>>> master
