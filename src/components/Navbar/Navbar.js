import React from "react";
import s from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../store/actionCreators";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const logout = () => {
    dispatch(logoutAction());
    navigate("/");
  };
  return (
    <nav className={s.navbar}>
      <div className={s.container}>
        <div className={s.brandLogo}>
          <Link to={"/"}>
            <FaTwitter className={s.logo} />
          </Link>
        </div>
        <div className={s.navlist}>
          {user ? (
            <>
              <Link className={s.navItem} to={"/"}>
                Welcome {user && user.username}
              </Link>
              <Link className={s.navItem} to={`/profile/${user.id}`}>
                Profile
              </Link>
              <p className={s.navItem} onClick={logout}>
                Log Out
              </p>
            </>
          ) : (
            <>
              <Link className={s.navItem} to={"/register"}>
                Register
              </Link>
              <Link className={s.navItem} to={"/login"}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
