import Footer from "./Footer";
import Header from "./Header";
import style from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={style.layout}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
