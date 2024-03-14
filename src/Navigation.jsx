import { Link } from "react-router-dom";

export  const Navigation = () => {//arrow version
  return (
      <nav>
        <ul>
          <li><Link to='/'>Home</Link> </li>
          <li><Link to='/post/new'>NewPost</Link> </li>
        </ul>
      </nav>
  );
}

//----normal version-----
/* export function Navigation() {
    return (
      <div>
        <nav>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </div>
    );
  } */

  //----default version-----
  
/*  function Navigation() {
    return (
      <div>
        <nav>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </div>
    );

    export default Navigation; */