import HomePageFooter from "./footer/homePageFooter";
import "./homepage.scss";
import Banner from "./section/banner";
import FeaturedHospital from "./section/FeaturedHospital";
import MedicalFacility from "./section/MedicalFacility";
import OutStandingDoctor from "./section/OutStandingDoctor";
import Specialty from "./section/Specialty";
const HomePage = () => {
  return (
    <div className="homepage-container">
      <Banner />
      <Specialty />
      <FeaturedHospital />
      <MedicalFacility />
      <OutStandingDoctor />
      <HomePageFooter />
    </div>
  );
};
export default HomePage;
