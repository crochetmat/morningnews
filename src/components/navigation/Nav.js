import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import routes from "./routes";
import { useAuth } from "../../hooks/useAuth";

function Nav() {
  const { logout } = useAuth();

  const handleClick = (key) => {
    if (key === "logout") {
      logout();
    }
  };

  return (
    <nav>
      <Menu style={{ textAlign: "center" }} mode="horizontal" theme="dark">
        {routes.map((route) => (
          <Menu.Item key={route.key} onClick={() => handleClick(route.key)}>
            <Icon type={route.key} />
            {route.name}
            <Link to={route.route}></Link>
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  );
}

export default Nav;
