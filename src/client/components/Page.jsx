import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, resetCurrentPage } from "../redux/pageSlice";
import SeriesPage from "./SeriesPage";
import Studio from "./Studio";

// Utility function to convert page titles into slugs
const slugify = (title) => {
  return title.replace(/\s+/g, '-').toLowerCase();
};

// Utility function to create readable titles from slugs
const unslugify = (slug) => {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const Page = ({ parentPage, setParentPage }) => {
  const baseURL = import.meta.env.VITE_API;
  const sitePages = useSelector((state) => state.pages.sitePages);
  const dispatch = useDispatch();
  const currentPageObject = useSelector((state) => state.pages.currentPage);

  const location = useLocation();
  const fullPath = location.pathname;
  const segments = fullPath.split('/').filter(segment => segment); // Split by "/" and remove empty strings
  const currentPath = segments[segments.length - 1];

  const [pageImages, setPageImages] = useState([]);
  const [childPages, setChildPages] = useState([]);
  const [seriesFocus, setSeriesFocus] = useState();
  const [seriesDescription, setSeriesDescription] = useState({});

  useEffect(() => {
    dispatch(resetCurrentPage());
  }, [dispatch]);

  // Set current page based on the URL
  useEffect(() => {
    if (currentPath && sitePages) {
      const matchingPage = Object.values(sitePages).find((page) =>
        slugify(page.title.rendered) === currentPath
      );

      if (matchingPage) {
        dispatch(setCurrentPage(matchingPage));
        setParentPage(matchingPage.title.rendered);

        const children = Object.values(sitePages).filter(
          (page) => page.parent === matchingPage.id
        );
        setChildPages(children);
      }
    }
  }, [currentPath, dispatch, sitePages]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/media?search=series-${parentPage}`);
        setPageImages(data);
      } catch (error) {
        console.error("No images to be found.", error);
      }
    };

    fetchImages();
  }, [parentPage, baseURL]);

  // Breadcrumbs component
  const renderBreadcrumbs = () => {
    let path = '';

    return (
      <nav className="breadcrumbs">
        {segments.map((segment, index) => {
          path += `/${segment}`;
          const isLast = index === segments.length - 1;
          return (
            <span key={segment}>
              {!isLast ? (
                <Link to={path}>{unslugify(segment)}</Link>
              ) : (
                <span>{unslugify(segment)}</span>
              )}
              {!isLast && ' / '}
            </span>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="sub-container">
      {/* Breadcrumbs at the top */}
      {renderBreadcrumbs()}

      <div className="sub-header">
        <h1>{parentPage?.toUpperCase()}</h1>

        <div className="series-section">
          {childPages.length > 0 ? (
            <div className="child-pages">
              {childPages.map((child) => (
                <Link
                  to={`${window.location.pathname}/${slugify(child.title.rendered)}`}
                  key={child.id}
                >
                  <button className="text-black border border-black py-1 px-4 rounded mr-2 mb-2 transition duration-300 hover:bg-gray-800 hover:text-white">
                    {child.title.rendered}
                  </button>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {currentPageObject.content && (
          <div dangerouslySetInnerHTML={{ __html: currentPageObject.content.rendered }} />
        )}
      </div>

      {(currentPageObject.content && (slugify(currentPageObject.title.rendered) === 'studio')) ? 
        <Studio /> : null
      }

      <div>
        <SeriesPage
          seriesFocus={seriesFocus}
          setSeriesFocus={setSeriesFocus}
          description={seriesDescription[seriesFocus]}
        />
      </div>
    </div>
  );
};

export default Page;
