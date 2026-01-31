import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import styles from "./NavBar.module.css";

const categories = [
  { id: "remeras", label: "Remeras" },
  { id: "pantalones", label: "Pantalones" },
  { id: "accesorios", label: "Accesorios" },
];

export default function NavBar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand}>
          Mi E-commerce
        </Link>

        <ul className={styles.links}>
          {categories.map((cat) => (
            <li key={cat.id}>
              <NavLink
                to={`/category/${cat.id}`}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                {cat.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <CartWidget />

      </nav>
    </header>
  );
}
