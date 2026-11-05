import React from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';
import Icon from './Icons';

export default function ContactActions({ sticky = false }) {
  return <nav className={sticky ? 'mobile-contact-bar' : 'home-contact-actions'} aria-label={sticky ? 'Mobile contact actions' : 'Contact the studio'}>
    <a href={SITE.smsHref}><Icon name="message" size={21} /><span>Text Us</span></a>
    <a href={SITE.phoneHref}><Icon name="phone" size={21} /><span>Call Us</span></a>
    <Link to="/ContactUs#quote-request"><Icon name="pencil" size={21} /><span>Get a Quote</span></Link>
    <Link to="/ContactUs"><Icon name="mail" size={21} /><span>Contact Us</span></Link>
  </nav>;
}
