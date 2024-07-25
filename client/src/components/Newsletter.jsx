import { Send } from "@material-ui/icons";

function Newsletter() {
  return (
    <div className="newsletter-container">
      <h1 className="newsletter-title">Newsletter</h1>
      <div className="newsletter-desc">
        Get timely updates from your favorite products.
      </div>
      <div className="newsletter-input-container">
        <input className="newsletter-input" placeholder="Your email" />
        <button
          type="button"
          className="newsletter-button"
          aria-label="newsletter button"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
