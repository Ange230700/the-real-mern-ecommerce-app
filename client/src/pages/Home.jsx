import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-container">
      <Announcement />
      <Navbar />
      <HeroCarousel />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
