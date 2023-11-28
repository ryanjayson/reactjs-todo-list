import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../assets/footer-logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <Container className="py-5">
        <Row style={{}}>
          <Col lg={3} style={{ height: 135 }}>
            <img
              src={logo}
              className="app-footer-logo"
              alt="logo"
              style={{ height: "inherit" }}
            />
          </Col>
          <Col lg={2}>
            <div>
              <h4>FOR PARENTS</h4>
              <a href="/">Parent Resources</a>
              <a href="/">How It Works</a>
              <a href="/">Testimonials</a>
              <a href="/">Terms of Use</a>
              <a href="/">Privacy Policy</a>
            </div>
          </Col>
          <Col lg={2}>
            <div>
              <h4>FOR PROVIDERS</h4>
              <a href="/">Provider Resources</a>
              <a href="/">How It Works</a>
              <a href="/">Testimonials</a>
              <a href="/">Terms and Conditions</a>
              <a href="/">List Your Program</a>
            </div>
          </Col>
          <Col lg={2}>
            <div>
              <h4>MORE</h4>
              <a href="/">About Us</a>
              <a href="/">Press</a>
              <a href="/">Jobs</a>
              <a href="/">Contact Us</a>
            </div>
          </Col>

          <Col lg={3}>
            <div>
              <div
                className="footer-social"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                }}
              >
                <a
                  href="/"
                  style={{ height: "50px", width: "50px", overflow: "hidden" }}
                >
                  <img
                    alt="facebook icon"
                    style={{
                      width: "150px",
                      height: "100px",
                      marginTop: "-6px",
                      marginLeft: "-6px",
                    }}
                    src="https://divin2sy6ce0b.cloudfront.net/images/footerSpriteBig4.png"
                  ></img>
                </a>
                <a
                  href="/"
                  style={{ height: "50px", width: "50px", overflow: "hidden" }}
                >
                  <img
                    alt="Twitter icon"
                    style={{
                      width: "150px",
                      height: "100px",
                      marginTop: "-6px",
                      marginLeft: "-52px",
                    }}
                    src="https://divin2sy6ce0b.cloudfront.net/images/footerSpriteBig4.png"
                  ></img>
                </a>
                <a
                  href="/"
                  style={{ height: "50px", width: "50px", overflow: "hidden" }}
                >
                  <img
                    alt="Instagram icon"
                    style={{
                      width: "150px",
                      height: "100px",
                      marginTop: "-52px",
                      marginLeft: "-6px",
                    }}
                    src="https://divin2sy6ce0b.cloudfront.net/images/footerSpriteBig4.png"
                  ></img>
                </a>
              </div>
            </div>
            <div className="mt-4 ms-3">
              <a href="/">
                <div className="btnLight">
                  <span>Help Center</span>
                </div>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
