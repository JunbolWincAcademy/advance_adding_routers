// PostListLoader.js (or directly above your component, depending on structure)

// This async function is called before the PostList component renders.
// Its job is to fetch data that PostList needs.
export async function postListLoader() {
  // Fetching posts data from the server.
  const postsResponse = await fetch(`http://localhost:3000/posts`);
  const posts = await postsResponse.json();

  // Fetching users data from the server.
  const usersResponse = await fetch(`http://localhost:3000/users`);
  const users = await usersResponse.json();

  // Returning both posts and users as an object.
  // React Router will provide this object to the PostList component through useLoaderData hook.
  return { posts, users };
}

// Your PostList component

import { useLoaderData, Link } from 'react-router-dom';

export function PostList() {
  // Accessing the data fetched by the loader function.
  // The data structure here matches what postListLoader returns.
  const { posts, users } = useLoaderData();

  return (
    <div className="post-list">
      <h2>Post List</h2>
      {/* Mapping through the posts to display them. */}
      {posts.map((post) => (
        <div key={post.id} className="post">
          {/* Creating a link to the detailed view of the post. */}
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          {/* Displaying a snippet of the post body. \// This line takes the first 20 characters of the post's body to create a snippet. It's used to display a preview of the content without showing the entire text. 'slice(0, 20)' extracts characters from index 0 to 19 (the first 20 characters), and '...' ellipsis is appended to indicate that the text continues beyond the snippet shown, its just visual.*/}
          <p>{post.body.slice(0, 20)}...</p>
          {/* Finding and displaying the author's name using the user ID from the post. */}
          by <Link to={`/user/${post.userId}`}>{users.find((user) => user.id === post.userId).name}</Link>
        </div>
      ))}
    </div>
  );
}
