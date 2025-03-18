import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      Login
      <Link to={"/register"}>GO TOO REGISTER</Link>
    </div>
  );
};

export default Login;
