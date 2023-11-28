import Menu from "../components/HeaderMenuDropdown.js";
import Footer from "../components/Footer.js";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <>
      <div className="login">
        <div
          style={{
            height: 45,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div>
            <img
              src={logo}
              className="home-logo"
              alt="logo"
              style={{ width: 150, height: 50 }}
            />
          </div>

          <Menu />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 className="mainText" style={{ fontSize: "45px" }}>
            Simple Task List web application
          </h1>
          <h2 className="mainText" style={{ fontSize: "25px" }}>
            Full Stack Developer Programming Challenge
          </h2>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
