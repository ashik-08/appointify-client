import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import error_image from "../../assets/images/404-error.gif";

const ErrorPage = () => {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>Appointify | Error</title>
      </Helmet>
      <section className="w-full flex flex-col items-center justify-center md:mt-5 2xl:mt-16 p-5">
        <figure className="outline-dashed outline-1 outline-blue-gray-50 drop-shadow-sm">
          <img src={error_image} alt="errorPage-image" />
        </figure>
        <div className="flex flex-col items-center justify-center text-center font-play">
          <p className="text-4xl lg:text-5xl text-sub-head font-semibold mt-12">
            Page Not Found
          </p>
          <p className="md:text-xl text-details font-medium mt-8">
            Sorry, the page you are looking for could not be found.
          </p>

          {location.pathname.includes("/dashboard") ? (
            <Link
              to="/dashboard"
              className="bg-gradient-blue hover:bg-gradient-to-r hover:from-special hover:to-head text-white text-lg font-medium px-6 py-2.5 rounded-lg mt-8"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/"
              className="bg-gradient-blue hover:bg-gradient-to-r hover:from-special hover:to-head text-white text-lg font-medium px-6 py-2.5 rounded-lg mt-8"
            >
              Go Home
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
