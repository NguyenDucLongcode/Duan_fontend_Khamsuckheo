import HomePageFooter from "./footer/homePageFooter";
import "./homepage.scss";
import Banner from "./section/banner";
import Clinic from "./section/clinic/Clinic";

import OutStandingDoctor from "./section/doctor/OutStandingDoctor";
import Specialty from "./section/specialty/Specialty";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Banner />
      <Specialty />

      <OutStandingDoctor />
      <Clinic />
      <HomePageFooter />
    </div>
  );
};
export default HomePage;
