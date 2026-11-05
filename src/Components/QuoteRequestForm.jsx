import { useLanguage } from "../i18n/LanguageContext";
import React, { useRef, useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { SITE } from '../data/site';

const initial = { name: '', email: '', phoneNumber: '', subject: '', projectType: 'Other', message: '', website: '' };
const projectTypes = ['Live-edge & epoxy tables', 'Cabinets & built-ins', 'Jewelry & retail displays', 'Jeweler benches', 'Other'];

export default function QuoteRequestForm({ compact = false }) {
  const { t } = useLanguage();
  const [fields, setFields] = useState(initial);
  const [state, setState] = useState({ loading: false, success: false, error: '' });
  const submissionId = useRef(null);
  const submitting = useRef(false);
  const { trackFormSubmission } = useAnalytics();
  function change(event) {
    setFields(previous => ({ ...previous, [event.target.name]: event.target.value }));
    submissionId.current = null;
  }
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setState({ loading: true, success: false, error: '' });
    try {
      submissionId.current ||= crypto.randomUUID();
      const response = await fetch('/api/quote-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...fields, submissionId: submissionId.current }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.error || (response.status === 429 ? 'Too many attempts. Please wait a minute and try again.' : 'Your request could not be saved. Please try again.'));
      setState({ loading: false, success: true, error: '' });
      setFields(initial);
      submissionId.current = null;
      trackFormSubmission('quote_request', true);
    } catch (error) {
      setState({ loading: false, success: false, error: error.message || 'Connection error. Please try again or call us.' });
      trackFormSubmission('quote_request', false);
    } finally { submitting.current = false; }
  }
  return (state.success ? <section className="form-success-message" role="status" aria-live="polite">
        <h2>{t("Your project request is received.")}</h2><p>{t("Your details have been saved for our studio to review. Thank you for sharing your idea.")}</p>
        <button type="button" className="new-message-btn" onClick={() => setState({ loading: false, success: false, error: '' })}>{t("Send another request")}</button>
      </section> : <div className="contact-form-container">
        {state.error && <p className="form-error-message" role="alert">{t(state.error)}</p>}
        <form onSubmit={submit} aria-busy={state.loading}>
          <fieldset disabled={state.loading}>
            <legend className="sr-only">{t("Your project details")}</legend>
            <div className="quote-form-grid">
              <div className="form-group"><label htmlFor="quote-name">{t("Name ")}<span className="required">*</span></label><input id="quote-name" name="name" autoComplete="name" required minLength={2} maxLength={120} value={fields.name} onChange={change} /></div>
              <div className="form-group"><label htmlFor="quote-email">{t("Email ")}<span className="required">*</span></label><input id="quote-email" name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={change} /></div>
            </div>
            <div className="form-group"><label htmlFor="quote-phone">{t("Phone number")}</label><input id="quote-phone" name="phoneNumber" type="tel" autoComplete="tel" maxLength={40} value={fields.phoneNumber} onChange={change} /></div>
            <div className="form-group"><label htmlFor="quote-type">{t("Project type")}</label><select id="quote-type" name="projectType" value={fields.projectType} onChange={change}>{projectTypes.map(type => <option key={type} value={type}>{t(type)}</option>)}</select></div>
            {!compact && <div className="form-group"><label htmlFor="quote-subject">{t("Project title")}</label><input id="quote-subject" name="subject" maxLength={200} placeholder={t("For example, a walnut dining table")} value={fields.subject} onChange={change} /></div>}
            <div className="form-group"><label htmlFor="quote-message">{t("Tell us about your project ")}<span className="required">*</span></label><textarea id="quote-message" name="message" rows={compact ? 4 : 7} required minLength={10} maxLength={5000} placeholder={t("Approximate dimensions, intended use, preferred materials, budget and timing…")} value={fields.message} onChange={change} /></div>
            <div className="quote-honeypot" aria-hidden="true"><label htmlFor="quote-website">{t("Leave this field empty")}</label><input id="quote-website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={change} /></div>
            <p className="form-privacy">{t("We use the contact details you provide to respond to your project enquiry.")}</p>
            <button className="submit-button" type="submit" disabled={state.loading}>{t(state.loading ? 'Saving your request…' : 'Request a custom quote ↗')}</button>
          </fieldset>
        </form>
        <p className="contact-call">{t("Prefer to talk? ")}<a className="context-link" href={SITE.phoneHref}>{t(SITE.phoneDisplay)}</a></p>
      </div>);
}
