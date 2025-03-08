
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext';
import { FaEdit } from 'react-icons/fa';
import { MdDelete, MdRestore } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function ArticleByID() {
  const { state } = useLocation();
  const { currentUser } = useContext(UserAuthorContextObj);
  const [editArticleStatus, setEditArticleStatus] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [currentArticle, setCurrentArticle] = useState(state);
  const [commentStatus, setCommentStatus] = useState('');

  // Enable edit of article (only for author)
  function enableEdit() {
    setEditArticleStatus(true);
  }

  // Save modified article (only for author)
  async function onSave(modifiedArticle) {
    const articleAfterChanges = { ...state, ...modifiedArticle };
    const token = await getToken();
    const currentDate = new Date();
    // Add date of modification
    articleAfterChanges.dateOfModification =
      currentDate.getDate() + '-' + currentDate.getMonth() + '-' + currentDate.getFullYear();

    // Make HTTP PUT request
    let res = await axios.put(
      `http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`,
      articleAfterChanges,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.message === 'article modified') {
      // Change edit article status to false
      setEditArticleStatus(false);
      navigate(`/author-profile/articles/${state.articleId}`, { state: res.data.payload });
    }
  }

  // Add comment by user
  async function addComment(commentObj) {
    // Add name of user to comment object
    commentObj.nameOfUser = currentUser.firstName;
    console.log(commentObj);
    // HTTP PUT request
    let res = await axios.put(
      `http://localhost:3000/user-api/comment/${currentArticle.articleId}`,
      commentObj
    );
    if (res.data.message === 'comment added') {
      setCommentStatus(res.data.message);
    }
  }

  // Delete article (for author)
  async function deleteArticle() {
    state.isArticleActive = false;
    let res = await axios.put(
      `http://localhost:3000/author-api/articles/${state.articleId}`,
      state
    );
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload);
    }
  }

  // Restore article (for author)
  async function restoreArticle() {
    state.isArticleActive = true;
    let res = await axios.put(
      `http://localhost:3000/author-api/articles/${state.articleId}`,
      state
    );
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload);
    }
  }

  // Delete article (for admin)
  async function deleteArticleAsAdmin() {
    state.isArticleActive = false;
    let res = await axios.put(
      `http://localhost:3000/admin-api/articles/${state.articleId}`,
      state
    );
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload);
    }
  }

  // Restore article (for admin)
  async function restoreArticleAsAdmin() {
    state.isArticleActive = true;
    let res = await axios.put(
      `http://localhost:3000/admin-api/articles/${state.articleId}`,
      state
    );
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload);
    }
  }

  return (
    <div className="container">
      {editArticleStatus === false ? (
        <>
          {/* Print full article */}
          <div className="d-flex justify-content-between heading">
            <div className="w-100 px-4 py-2 rounded-2 d-flex justify-content-between align-items-center">
              <div>
                <p className="display-6 me-4">
                  <b>{state.title}</b>
                </p>
                {/* Date of creation and modification */}
                <span className="py-3 text-start w-100 d-inline-block">
                  <small className="text-secondary me-4">
                    Created on : {state.dateOfCreation}
                  </small>
                  <small className="text-secondary me-4">
                    Modified on : {state.dateOfModification}
                  </small>
                </span>
              </div>
              {/* Author details */}
              <div className="author-details text-center mb-5">
                <img
                  src={state.authorData.profileImageUrl}
                  width="60px"
                  className="rounded-circle"
                  alt=""
                />
                <p>{state.authorData.nameOfAuthor}</p>
              </div>
            </div>
            {/* Edit & Delete buttons */}
            <div className="d-flex me-3">
              {/* Edit button (only for author) */}
              {currentUser.role === 'author' && (
                <button className="me-2 btn btn-light h-25 mt-4" onClick={enableEdit}>
                  <FaEdit className="text-warning" />
                </button>
              )}
              {/* Delete/Restore button for author */}
              {currentUser.role === 'author' &&
                (state.isArticleActive === true ? (
                  <button className="me-2 btn btn-light h-25 mt-4" onClick={deleteArticle}>
                    <MdDelete className="text-danger fs-4" />
                  </button>
                ) : (
                  <button className="me-2 btn btn-light h-25 mt-4" onClick={restoreArticle}>
                    <MdRestore className="text-info fs-4" />
                  </button>
                ))}
              {/* Delete/Restore button for admin */}
              {currentUser.role === 'admin' &&
                (state.isArticleActive === true ? (
                  <button className="me-2 btn btn-light h-25 mt-4" onClick={deleteArticleAsAdmin}>
                    <MdDelete className="text-danger fs-4" />
                  </button>
                ) : (
                  <button className="me-2 btn btn-light h-25 mt-4" onClick={restoreArticleAsAdmin}>
                    <MdRestore className="text-info fs-4" />
                  </button>
                ))}
            </div>
          </div>
          {/* Article content */}
          <p
            className="lead fs-6 text-justify article-content bgc p-5"
            style={{ whiteSpace: 'pre-line' }}
          >
            {state.content}
          </p>
          {/* User comments */}
          <div>
            <div className="comments my-4">
              {state.comments.length === 0 ? (
                <p className="fs-4 text-start">No comments yet..</p>
              ) : (
                state.comments.map((commentObj) => {
                  return (
                    <div key={commentObj._id}>
                      <img src="" alt="" />
                      <p className="user-name text-start"><b>{commentObj?.nameOfUser}</b></p>
                      <p className="comment text-start">{commentObj?.comment}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* Comment form */}
          <h6>{commentStatus}</h6>
          {currentUser.role === 'user' && (
            <form onSubmit={handleSubmit(addComment)}>
              <input
                type="text"
                {...register('comment')}
                className="form-control mb-4 w-50"
              />
              <button className="btn btn-success">Add a comment</button>
            </form>
          )}
        </>
      ) : (
        // Edit form for author
        <form onSubmit={handleSubmit(onSave)} className="bg-light p-5">
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              defaultValue={state.title}
              {...register('title')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="form-label">
              Select a category
            </label>
            <select
              {...register('category')}
              id="category"
              className="form-select"
              defaultValue={state.category}
            >
              <option value="" disabled>
                Categories
              </option>
              <option value="Web-development">Web Development</option>
              <option value="data-science">Data Science</option>
              <option value="cyber-security">Cyber Security</option>
              <option value="cloud-computing">Cloud Computing</option>
              <option value="AI&ML">AI&ML</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              {...register('content')}
              className="form-control"
              id="content"
              rows="10"
              defaultValue={state.content}
            ></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ArticleByID;