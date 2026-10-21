import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container text-white text-center">
      <div className="overlay"></div>
      <div className="content d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <h1 className="display-4 fw-bold" style={{marginTop: "-250px"}}>MaidEazy - Reliable Home Services at Your Fingertips</h1>
        <p className="lead">Book trusted maids for cleaning, cooking, and more with ease!</p>
        <div>
          <button className="btn btn-primary btn-lg mt-3 shadow" onClick={() => navigate("/login")}>Login</button>
          <button className="btn btn-warning btn-lg mt-3 shadow mx-3" onClick={() => scrollToSection("about")}>About</button>
          <button className="btn btn-light btn-lg mt-3 shadow" onClick={() => scrollToSection("contact")}>Contact</button>
        </div>
      </div>

       {/* About Section */}
       <section id="about" className="container my-5 text-center bg-light text-dark p-5 rounded">
        <h2 className="fw-bold text-primary">About MAIDEAZY</h2>
        <p className="lead">
          MAIDEAZY is a trusted service provider offering professional maid and housekeeping services on a membership basis in and around Bangalore.
        </p>
        <p>
          We provide skilled and experienced domestic help for various needs, including maid services, deep cleaning, home organization, and household assistance.
        </p>
        <h4 className="mt-4">Our Core Services:</h4>
        <ul className="list-group list-group-flush text-start w-50 mx-auto">
          <li className="list-group-item"><strong>Maid Services:</strong> Cleaning, cooking, laundry, and housekeeping tasks.</li>
          <li className="list-group-item"><strong>Deep Cleaning:</strong> Homes, offices, and commercial spaces.</li>
          <li className="list-group-item"><strong>Home Organization:</strong> Decluttering, arranging, and organizing spaces.</li>
          <li className="list-group-item"><strong>Household Assistance:</strong> Elder care, babysitting, and pet care.</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container my-5 text-center bg-dark text-white p-5 rounded">
        <h2 className="fw-bold text-warning">Contact Us</h2>
        <p className="fs-5">We’re here to assist you! Reach out to us anytime.</p>

        <div className="contact-details">
          <p><strong>📌 Address:</strong> 44/4, District Fund Rd, behind Big Bazaar, Jayanagar, Bengaluru, Karnataka 560069</p>
          <p><strong>📧 Email:</strong> <a href="mailto:MAIDEAZY@gmail.com" className="text-warning">MAIDEAZY@gmail.com</a></p>
          <p><strong>📞 Phone:</strong> 9353507267</p>
        </div>

        <h3 className="mt-4 text-warning">Get in Touch</h3>
        <p>
          Have any queries or need assistance? Feel free to reach out to us via the contact details above,  
          or visit <a href="https://help.maideazy.com" className="text-warning">help.maideazy.com</a>.
        </p>

        {/* Founder Section */}
        <div className="founder-details mt-4 p-4 bg-light text-dark rounded">
          <h3 className="fw-bold text-primary">Meet Our Founders</h3>
          <p><strong>Founders:</strong> Sudarshan M, Suhani, Deeptoy, Chavi</p>
          <p><strong>📧 Email:</strong> <a href="mailto:Admin.maideazy@gmail.com" className="text-primary">Admin.maideazy@gmail.com</a></p>
          <p><strong>📞 Contact:</strong> 9353507267 | 98315 21111 | +91 93809 95355</p>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
