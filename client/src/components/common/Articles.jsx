import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [searchArticle, setCategory] = useState("All");

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { currentUser } = useContext(UserAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();

  // Get all articles
  async function getArticles() {
    const token = await getToken();
    // Make authenticated request
    if (currentUser.role === 'author' || currentUser.role === 'user') {
      let res = await axios.get('http://localhost:3000/author-api/articles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.message === 'articles') {
        setArticles(res.data.payload);
        setError('');
      } else {
        setError(res.data.message);
      }
    }
    if (currentUser.role === 'admin') {
      let res = await axios.get('http://localhost:3000/admin-api/articles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.message === 'all articles') {
        setArticles(res.data.payload);
        setError('');
      } else {
        setError(res.data.message);
      }
    }
  }

  // Go to specific article
  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  // Handle category change
  function getCategory(e) {
    setCategory(e.target.value);
  }

  useEffect(() => {
    getArticles();
  }, [currentUser.role]);

  // Filter articles by category
  const display = searchArticle === "All" 
    ? articles 
    : articles.filter((article) => article.category.toLowerCase() === searchArticle.toLowerCase());

  return (
    <div className="container">
      <select 
        name="category" 
        id="category" 
        className="form-select mb-5 dropdown"
        value={searchArticle} 
        onChange={getCategory}
      >
        <option value="" disabled>Categories</option>
        <option value="All">All</option>
        <option value="Web-development">Web Development</option>
        <option value="data-science">Data Science</option>
        <option value="cyber-security">Cyber Security</option>
        <option value="cloud-computing">Cloud Computing</option>
        <option value="AI&ML">AI&ML</option>
      </select>

      <div>
        {error.length !== 0 && <p className='display-3 text-center mt-5 text-danger'>{error}</p>}
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
          {display.length > 0 ? (
            display.map((articleObj) => (
              <div className='col mb-3' key={articleObj.articleId}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className='text-end'>
                      <img src={articleObj.authorData.profileImageUrl} width="40px" className='rounded-circle' alt="" />
                      <p>
                        <small className="text-secondary">
                          {articleObj.authorData.nameOfAuthor}
                        </small>
                      </p>
                    </div>
                    <h5 className='card-title'>{articleObj.title}</h5>
                    <p className='card-text article'>
                      {articleObj.content.substring(0, 130) + "....."}
                    </p>
                    <button onClick={() => gotoArticleById(articleObj)} className="read">
                      Read more
                    </button>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                      Last updated on {articleObj.dateOfModification}
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No articles found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Articles;
