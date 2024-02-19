import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const api = 'https://cat-fact.herokuapp.com/facts/';

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { data: res } = await axios.get(api);
      setPosts(res);
    } catch (error) {
      console.error(error);
    }
  };

  const addPost = async () => {
    const post = { text: 'New Post' };
    await axios.post(api, post);
    setPosts([response.data, ...posts]);
  };

  const handleUpdate = async (post) => {
    const updatedPost = { ...post, text: 'Updated' };
    await axios.put(api + post._id, updatedPost);
    const updatedPosts = posts.map((p) => (p._id === post._id ? updatedPost : p));
    setPosts(updatedPosts);
  };

  const handleDelete = async (post) => {
    await axios.delete(api + '/' + post.id + '/');
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <>
      <div className="container">
        <h2> there are {posts.length} posts in the Database </h2>
        <button onClick={addPost} className="btn btn-primary">
          Post
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Posts</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, index) => (
              <tr key={index}>
                <td> {post?.text} </td>
                <td>
                  <button onClick={() => handleUpdate(post)} className="btn btn-info btn-sm">
                    Update
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(post)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
