import React from "react";

const Footer = () => {
  return (
    <section className="footer">
      <div className="f-item">
        <h3>FAQ</h3>
        <hr />
      </div>
      <div className="f-item">
        <h3>About</h3>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
          magna placerat sapien ultrices, non semper est aliquet. Aenean nulla
          nisl, aliquam et nisl ac, venenatis pellentesque dui.
        </p>
        <p>
          Vestibulum rhoncus, lectus sed vulputate dignissim, justo justo tempor
          tortor, at rhoncus sapien orci in libero. Quisque condimentum tellus
          sed nisi faucibus consectetur non sed ex. Suspendisse fermentum turpis
          neque, non laoreet sapien sagittis nec. Vivamus vitae massa
          vestibulum, mattis eros ac, pulvinar eros. Donec vitae ipsum congue,
          imperdiet nisl non, varius lectus. Aenean placerat laoreet congue.
          Suspendisse pretium, ipsum tristique dignissim luctus, tortor mi
          convallis enim, non vehicula diam ante et lorem.
        </p>
        <p>
          Integer blandit nisi eu risus volutpat, quis elementum urna fermentum.
          Duis eget fermentum ipsum.
        </p>
      </div>
      <div className="f-item">
        <h3>Newsletter</h3>
        <hr />
        <p>Join our mailing list</p>
        <form className="form-group newsletter">
          <input type="email" placeholder="your@email.com"></input>
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Footer;
