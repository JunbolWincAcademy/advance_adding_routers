// PostLoader.js (or directly above your component, depending on structure)

// This async function is called before the Post component renders.
// Its job is to fetch data that Post needs.
export async function postLoader({ params }) {
  const postId = params.postId; //the params.postId  in   const postId  = params.postId;     =      :postId in  path: '/post/:postId' in the router in Main.jsx
  //:postId will be dynamically  chance by the user depending which post they click

  // Fetching post data from the server.
  const postResponse = await fetch(`http://localhost:3000/posts/${postId}`);
  const post = await postResponse.json();

  // Now that we have the post, we can fetch the user data for the post's author
  const userResponse = await fetch(`http://localhost:3000/users/${post.userId}`);
  const user = await userResponse.json();

  // Fetch comments specifically for this post using postId
  const commentsResponse = await fetch(`http://localhost:3000/comments?postId=${postId}`);
let comments = await commentsResponse.json();

  // Fetching all users data might not be necessary if you're fetching a specific user above
  // const usersResponse = await fetch("http://localhost:3000/users");
  // const users = await usersResponse.json();

  // ✅ Fetch each commenter's details
  const commentsWithUserNames = await Promise.all(
    comments.map(async (comment) => {
      const commenterResponse = await fetch(`http://localhost:3000/users/${comment.userId}`);
      const commenter = await commenterResponse.json();
      return { ...comment, commenterName: commenter.name }; // Append commenter's name to the comment object
    })
  );

  comments = commentsWithUserNames; // Reassign with updated comments including commenter names

  // Returning post, comments, and user as an object.
  return { post, comments, user };
}

import { useLoaderData, Link } from 'react-router-dom';

export const Post = () => {
  const { post, comments, user } = useLoaderData(); // Correctly accessing data from loader

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p>
        by <Link to={`/user/${post.userId}`}>{user.name}</Link>
      </p>{' '}
      {/* Correct usage of `user`*/}
      <p>{post.body}</p>
      <hr />
      {comments.length > 0 && (
        <div className="comments">
          <h2>Comments:</h2>
          {comments.map((comment) => {
            // Ensure `users` variable or similar isn't mistakenly used here instead of `user`
            return (
              <div key={comment.id} className="comment">
                <p>
                  <Link to={`/user/${comment.userId}`}>{comment.commenterName} commented:</Link> {/* Display commenter's name */}
                </p>
                <p>{comment.comment}</p>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

//--------Params-----------
/*   In the context of the postLoader function declaration export async function postLoader({ params }), params is a parameter of the function, more specifically, it's a destructured object parameter. This parameter is not a reserved keyword in JavaScript but is used by convention with React Router to handle dynamic route parameters. Here's a breakdown of what's happening:

Parameter, Argument, or Prop?
Parameter: In this case, params is a parameter of the postLoader function. When you define a function with { params }, you're using destructuring to directly access the params property of the object passed to postLoader as its argument.

Argument: The argument to postLoader is an object provided by React Router when the loader is invoked. This object contains various properties, including params, which itself is an object holding all the dynamic parameters from the URL matched by the route.

Not a Prop: While similar in how data is passed around, in this context, params is not considered a prop. "Props" are typically used within React components to pass data and callbacks.

How Does postLoader Get Its Argument?
When you use React Router and define a route with a loader:

jsx
Copy code
{
  path: '/post/:postId',
  element: <Post />,
  loader: postLoader, // Associate your loader here
}
React Router takes care of invoking postLoader for you whenever the route is matched. The framework automatically passes an object to postLoader that contains, among other things, the params object. This params object holds the dynamic parts of the URL that were matched by the route. For the route /post/:postId, params will have a property postId that corresponds to the actual ID in the URL.

For example, if a user navigates to /post/123, React Router matches this URL with the route /post/:postId, determines that 123 is the value of postId, and then calls postLoader with an object that includes params: { postId: '123' }.

In Summary
params in postLoader({ params }) is a parameter that uses JavaScript's object destructuring to directly access the params property of the argument object passed in by React Router.
The argument provided to postLoader (including params) is automatically supplied by React Router based on the URL and the route configuration.
This design pattern allows you to write loader functions that dynamically fetch data based on the current URL's parameters without manually parsing the URL or extracting parameters yourself. */

//original version:
/* export function Post() {
    return (
      <div>
        <h2>Post Details</h2>
        <p>This is a placeholder for a single post's details.</p>
      </div>
    );
  } */
