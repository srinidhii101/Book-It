//Allowing the editting of the head of the application
import Head from 'next/head';

//local css and bootstrap
import "../index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function Header() {
  return (
    <div>
      <Head>
        <title>Book it</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  );
}

export default Header;
