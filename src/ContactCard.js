import React, { useState } from "react";

const ContactCards = (props) => {
  const [showAge, setShowAge] = useState(false);

  return (
    <div className="contact-card">
      <img src={props.avatar} alt="profile" />
      <div className="user-details">
        <p>Name: {props.name}</p>
        <p>Email: {props.email}</p>
        {showAge && <p>Age: {props.age}</p>}
        <button onClick={() => setShowAge(!showAge)}>Toggle Age </button>
      </div>
    </div>
  );
};

export default ContactCards;
