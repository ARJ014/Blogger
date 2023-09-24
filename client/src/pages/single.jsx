import React from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div className="user">
          <img
            className="logo"
            src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <div className="info">
            <span>Arjun Goel</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link className="link" to="/write?id=3">
              <img src={Edit} alt="edit" />
            </Link>
            <Link>
              <img src={Delete} alt="delete" />
            </Link>
          </div>
        </div>
        <h1>This is the heading of the blog that wil be writtern here</h1>
        <p>
          o Get Better Business Results Improve Your Visibility in Search
          Engines: Next.js supports server-side rendering (SSR), enabling better
          indexing by search engines and improving visibility in search results.
          Enhance User Experience: Next.js ensures fast loading and high page
          performance, resulting in an excellent user experience and increased
          user engagement. Reduce Maintenance Costs: Next.js provides a
          streamlined development experience and built-in optimizations,
          reducing the need for extensive maintenance efforts. To Improve the
          Development Process Scalability Made Easy: Next.js simplifies app
          scaling, allowing it to effortlessly handle high traffic loads and
          adapt to growing user demands. With serverless deployment options,
          scalability becomes a seamless process. Optimal Performance: By
          providing advanced performance optimization techniques like static
          site generation (SSG) and server-side rendering (SSR), Next.js ensures
          fast page loads and smooth user experiences. Accelerated Development:
          Next.js provides a wide set of out-of-the-box features that improve
          development cycles. Developers can choose built-in solutions for
          routing, state management, and styling, reducing the need for manual
          configuration and third-party dependencies. Thriving Community
          Support: The dynamic Next.js community offers a wealth of resources,
          support, and readily available solutions. Developers can tap into this
          community-driven ecosystem to find answers, share knowledge, and
          leverage community-developed packages, streamlining their development
          process. Enhanced Security: Next.js prioritizes security by enabling
          server-side rendering (SSR) and enforcing best practices in data
          handling. This ensures protection against client-side vulnerabilities
          and strengthens the overall security posture of web applications.
          Flexible Architecture: While Next.js aligns seamlessly with the
          Jamstack architecture, it offers flexibility in building your digital
          solutions. Developers can embrace server-side rendering (SSR) and
          dynamic routing when needed, allowing them to tailor their
          applications to specific project requirements.
        </p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
