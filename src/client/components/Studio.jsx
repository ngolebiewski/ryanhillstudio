import { useEffect, useState } from "react";
import axios from "axios";
import DateFormatter from "./DateFormatter"

const Studio = ({ parentPage }) => {
  const baseURL = import.meta.env.VITE_API;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMainImage = async (featuredMediaID) => {
      try {
        const { data } = await axios.get(`${baseURL}/media/${featuredMediaID}`);
        return {
          imageURL: data.media_details.sizes.large.source_url,
          imageAlt: data.alt_text,
        };
      } catch (error) {
        console.error("Error fetching the featured image:", error);
        return { imageURL: "", imageAlt: "" };
      }
    };

    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/posts/`);
        const postsWithImages = await Promise.all(
          data.map(async (post) => {
            const featImg = await fetchMainImage(post.featured_media);
            return { ...post, featImg };
          })
        );
        setPosts(postsWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    console.log("fetching posts")
    console.log(posts)
  }, [baseURL, parentPage]);

  return (
    <>
      <div className="series-section">
        {loading ? (
          <h1>Loading Studio Posts...</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              
              <div key={post.id} className="series-card contact">
                <h1>{post.title.rendered}</h1>
                <h5> <DateFormatter dateString={post.date} /></h5>
                <br />
                {post.featImg.imageURL && (
                  <img src={post.featImg.imageURL} alt={post.featImg.imageAlt} />
                )}
                <br />
                {/* <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <button>[More]</button> */}
                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                
              </div>
            ))}
          </div>
        ) : (
          <h1>No posts available</h1>
        )}
      </div>
    </>
  );
};

export default Studio;
