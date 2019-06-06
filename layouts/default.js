/* Default layout with the navigation and the footer */
import Navigation from '../components/navigation';
import Footer from '../components/footer';

//Wrapping pages in the default header, navigation, and footer
export default ({ children }) => (
  <div className="defaultContainer">
    <Navigation />
      <main className="offsetNavigationHeader">
        { children }
      </main>
    <Footer />
  </div>
)
