import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ onClick }) {
  return (
    <Link className="logo" to="/" aria-label="Live Wood Studio — Home" onClick={onClick}>
      <img className="brand-logo brand-logo-dark" src="/Assets/lws-logo.png" alt="Live Wood Studio" width="718" height="341" />
      <img className="brand-logo brand-logo-light" src="/Assets/lws-logo-light.png" alt="" aria-hidden="true" width="718" height="341" />
    </Link>
  );
}
