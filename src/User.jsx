// PostLoader.js (or directly above your component, depending on structure)

// This async function is called before the User component renders.
// Its job is to fetch data that User needs.
export async function userLoader({ params }) {
  const userId = params.userId;

  // Fetching user data from the server.
  const postResponse = await fetch(`http://localhost:3000/users/${userId}`);
  const user = await postResponse.json();

  // Now that we have the suer, we can fetch the post data for the author
  const userResponse = await fetch(`http://localhost:3000/posts?userId=${userId}}`);
  const posts = await userResponse.json();

  // Fetch comments specifically for this post using postId
  const commentsResponse = await fetch(`http://localhost:3000/comments?userId=${userId}`);
  const comments = await commentsResponse.json();

  // Fetching all users data might not be necessary if you're fetching a specific user above
  // const usersResponse = await fetch("http://localhost:3000/users");
  // const users = await usersResponse.json();

  // Returning post, comments, and user as an object.
  return { posts, comments, user };
}

import { useLoaderData, Link } from 'react-router-dom';

export const User = () => {
  const { posts, comments, user } = useLoaderData(); // Correctly accessing data from loader

  return (
    <div className="user">
      <h1>{user.name}</h1>

      {posts.length > 0 && (
        <>
          <h2>Posts:</h2>
          {posts.map((post) => (
            <div key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link> {/* ✅ Displaying user's posts*/}
            </div>
          ))}
        </>
      )}

      {comments.length > 0 && (
        <>
          <h2>Comments:</h2>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Link to={`/post/${comment.postId}`}>{comment.comment}</Link> {/* ✅ Displaying user's comments */} 
            </div>
          ))}
        </>
      )}
    </div>
  );
};

//original version:
/* export function User() {
    return (
      <div>
        <h2>User Profile</h2>
        <p>This is a placeholder for the user's profile, showing their posts and comments.</p>
      </div>
    );
  } */
