import React from 'react';

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">

          <div className="col-sm-3">
            <ul className="list-unstyled mt-4">
              <li><a href="#" className='text-decoration-none text-light'>Sections</a></li>
              <li><a href="#" className='text-decoration-none text-light'>Our Crew</a></li>
              <li><a href="#" className='text-decoration-none text-light'>Highlights</a></li>
              <li><a href="#" className='text-decoration-none text-light'>Subscription</a></li>
            </ul>
          </div>

          <div className="col-sm-3">
            <ul className="list-unstyled mt-4">
              <li><a href="#" className='text-decoration-none text-light'>Encyclopedia</a></li>
              <li><a href="#" className='text-decoration-none text-light'>React Journal</a></li>
              <li><a href="#" className='text-decoration-none text-light'>Policies & Conditions</a></li>
              <li><a href="#" className='text-decoration-none text-light'>Angular Guide</a></li>
            </ul>
          </div>

          <div className="col-sm-2">
            <ul className="list-unstyled mt-4">
              <li><a href="#" className='text-decoration-none text-light'>Register</a></li>
              <li><a href="#" className='text-decoration-none text-light'>Access Account</a></li>
              <li><a href="#" className='text-decoration-none text-light'>User Agreement</a></li>
              <li><a href="#" className='text-decoration-none text-light'>Data Protection</a></li>
            </ul>
          </div>

          <div className="col-sm-4 text-center text-md-start">
            <div>
              <h6 className="footer-heading text-uppercase text-warning">Get in Touch</h6>
              <p className="contact-info mt-4">Reach out to us for any assistance</p>
              <p className="contact-info fw-bold">+91 9999999999</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-5 border-top pt-3">
        <p className="footer-alt mb-0 f-14">2024 © VNRBLOGAPP, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
