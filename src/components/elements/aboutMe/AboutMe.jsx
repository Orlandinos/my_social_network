import React from 'react';
import './aboutMe.scss'

const AboutMe = () => {
  return (
    <div className="about-card">
      <h3>About me</h3>
      <p>
        from the server
      </p>
      <div className="details">
        <p><span className="label">Born:</span> from the server</p>
        <p><span className="label">Status:</span> from the server</p>
        <p><span className="label">Email:</span> from the server</p>
      </div>
    </div>
  );
};

export default AboutMe;