import styles from './Header.module.css';
import React,{useEffect,useState} from "react"
import {Helmet} from "react-helmet";
import {Link, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, logout } from '../../Redux/auth';
import { changeRouteFalse, changeRouteTrue } from '../../Redux/adminRouterSlice';
function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const isAuth = useSelector(selectIsAuth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollThreshold = 50;

    const [activeItem, setActiveItem] = React.useState(0);
    const totalCount = useSelector((state) => state.cart.totalCount);
  let  [open,setOpen] = React.useState("true")
    let openHandler= () => {
        setOpen(!open);
      }
      const handleScroll = () => {
        const currentPosition = window.pageYOffset;
        if (currentPosition < scrollPosition && isVisible) {
          setIsVisible(false);
        } else if (currentPosition > scrollPosition && !isVisible) {
          setIsVisible(true);
        }
        setScrollPosition(currentPosition);
      };
      useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [isVisible, scrollPosition]);
    
      const onClickLogout = () => {
        if (window.confirm("Ви дійсно хочете вийти?")){
          dispatch(logout());
          window.localStorage.removeItem("token")
        }
      }
  return (
    <>
      <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
      </Helmet>
       <header className={isVisible ? styles.header : ""}>
             <div className={styles.header_container}>
             <div className={styles.leftHeader}>
            {/* <img width={30} height={30} src="/images/Vector.png" /> */}
            <div className={styles.store_title}>
                <img height={130} width={130} src="/images/logo.jpg" alt="" />
            </div>
        </div>
            <div className={open ? styles.menu : styles.menu + " " + styles.active }>
              {(isAuth && pathname.startsWith("/admin")) ? 
                <ul onClick={() => openHandler()}  className={styles.rigthHeader}>
                  <li> <Link onClick={() => setActiveItem(0)} className={activeItem === 0 ? styles.activen : ''} to="/admin/home"  >
                    ГОЛОВНА
                </Link></li>
                <li><Link onClick={() => setActiveItem(1)} className={activeItem === 1 ? styles.activen : ''} to="/admin">ТОВАРИ</Link></li>
                <li><Link onClick={() => setActiveItem(2)}   className={activeItem === 2 ? styles.activen : ''} to="/admin/create">СТВОРИТИ ТОВАР</Link></li>
                <li>< button onClick={onClickLogout} className={styles.button} >ВИХІД</button></li>
              </ul>
                :<ul onClick={() => openHandler()}  className={styles.rigthHeader}>
                  <li> <Link onClick={() => setActiveItem(1)}  className={activeItem === 1 ? styles.activen : ''} to="/"  >
                  ГОЛОВНА
                </Link></li>
                  {/* <li><a href="">КІЛЬЦЯ</a></li>
                  <li><a href="">СЕРЕЖКИ</a></li>
                  <li><a href="">ПІДВІСКИ</a></li> */}
                  <li><Link onClick={() => setActiveItem(0)}  className={activeItem === 0 ? styles.activen : ''} to="/goods">ТОВАРИ</Link></li>
                  {/* <li><Link onClick={() => setActiveItem(4)}  className={activeItem === 4 ? styles.activen : ''} to="/bonus">АКЦІЇ</Link></li> */}
                  <li><Link onClick={() => setActiveItem(2)}  className={activeItem === 2 ? styles.activen : ''} to="/cart">КОШИК</Link></li>
                  <li><Link onClick={() => setActiveItem(3)}  className={activeItem === 3 ? styles.activen : ''} to="/contacts">КОНТАКТИ</Link></li>
                </ul>
                }
                </div>
                <div onClick={() => openHandler()}  className={ open ? styles.burger :  styles.burger + " " + styles.active}>
        <span></span>
               </div>
        </div>
             </header>
       </>
  );
}
export default Header;
