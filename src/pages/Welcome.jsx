import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="welcome">
      <div className="welcome-content">
        <h1>Welcome to IBlog </h1>

        <p>
          A place where ideas become stories. Read inspiring blogs, share your
          experiences, and connect with amazing writers.
        </p>

        <div className="welcome-btns">
          <Link to="/blogs" className="primary-btn">
            Explore Blogs
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h2>📚</h2>
          <h3>Read</h3>
          <p>Discover stories from different writers.</p>
        </div>

        <div className="feature-card">
          <h2>✍️</h2>
          <h3>Create</h3>
          <p>Publish your own blogs in seconds.</p>
        </div>

        <div className="feature-card">
          <h2>🌍</h2>
          <h3>Connect</h3>
          <p>Share ideas with readers worldwide.</p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
