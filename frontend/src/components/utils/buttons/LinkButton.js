import { Link } from "react-router-dom";

function LinkButton({ url }) {
  return (
    <li>
      <Link to={url}></Link>
    </li>
  );
}
