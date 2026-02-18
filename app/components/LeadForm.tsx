"use client";

export default function LeadForm() {
  function onLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "there").trim();
    alert(`Thanks ${name}. Our design team will contact you shortly.`);
    event.currentTarget.reset();
  }

  return (
    <form id="lead-form" className="lead-card reveal delay-1" onSubmit={onLeadSubmit}>
      <h2>Designs for Every Budget</h2>
      <label>
        Name
        <input type="text" name="name" required placeholder="Your name" />
      </label>
      <label>
        Mobile
        <input
          type="tel"
          name="mobile"
          required
          placeholder="10 digit mobile number"
          pattern="[0-9]{10}"
        />
      </label>
      <label>
        Property Type
        <select name="type" required defaultValue="">
          <option value="">Select</option>
          <option>2BHK</option>
          <option>3BHK</option>
          <option>4BHK</option>
          <option>Villa</option>
        </select>
      </label>
      <button className="btn" type="submit">
        Get Free Quote
      </button>
      <p className="policy">By submitting, you agree to our privacy policy and terms.</p>
    </form>
  );
}
