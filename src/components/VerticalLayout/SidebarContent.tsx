import React, { useCallback, useEffect, useRef } from 'react';
// //Import Scrollbar
import SimpleBar from 'simplebar-react';
// redux
import { useSelector } from 'react-redux';
import { IState, LoginProps, User, UserRole } from '@/src/Interfaces';
// MetisMenu
import MetisMenu from 'metismenujs';
import { Link, useLocation } from 'react-router-dom';
import withRouter from '../Common/withRouter';

const SidebarContent: React.FC<LoginProps> = React.memo((_props) => {
  const ref = useRef<HTMLElement | null>(null);
  const { user } = useSelector((state: IState) => state.auth);

  const activateParentDropdown = useCallback((item: HTMLElement) => {
    item.classList.add('active');
    const parent = item.parentElement;
    if (parent) {
      const parent2El = parent.childNodes[1];

      if (
        parent2El &&
        parent2El instanceof HTMLElement &&
        parent2El.id !== 'side-menu'
      ) {
        parent2El.classList.add('mm-show');
      }
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          const childNode = parent3.childNodes[0];
          if (childNode instanceof HTMLElement) {
            childNode.classList.add('mm-active'); //a
          }
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              const childNodeParent5 = parent5.childNodes[0];
              if (childNodeParent5 instanceof HTMLElement)
                childNodeParent5.classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items: HTMLCollectionOf<HTMLAnchorElement>) => {
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      const parent = items[i].parentElement;

      if (item?.classList.contains('active')) {
        item.classList.remove('active');
      }
      if (parent) {
        const parent2El =
          parent.childNodes?.length && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (
          parent2El &&
          parent2El instanceof HTMLElement &&
          parent2El.id !== 'side-menu'
        ) {
          parent2El.classList.remove('mm-show');
        }

        parent.classList.remove('mm-active');
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove('mm-show');

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('mm-active'); // li
            if (parent3.childNodes[0] instanceof HTMLElement)
              parent3.childNodes[0].classList.remove('mm-active');

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove('mm-show'); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('mm-show'); // li
                if (parent5.childNodes[0] instanceof HTMLElement)
                  parent5.childNodes[0].classList.remove('mm-active'); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
 
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById('side-menu');

    if (ul) {
      const items = ul.getElementsByTagName('a');
      removeActivation(items);

      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.recalculate();
    }
  }, []);


  useEffect(() => {
    new MetisMenu('#side-menu');
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);
  {
    /* @ts-ignore */
  }
  function scrollElement(item: HTMLElement) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        {
        }
        /* @ts-ignore */
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }
  function isAdmin(user: User) {
    return user.UserRole.includes(UserRole.ADMIN_ROLE);
  }
  function isUser(user: User) {
    return user.UserRole.includes(UserRole.USER_ROLE);
  }

  function isClinet(user: User) {
    return user.UserRole.includes(UserRole.CLIENT_ROLE);
  }
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const admin = isAdmin(user!);
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const isUserRole = isUser(user!);
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const isClientRole = isClinet(user!);

  return (
    <React.Fragment>
      {/* @ts-ignore */}
      <SimpleBar className='h-100' ref={ref}>
        <div id='sidebar-menu'>
          {admin ? (
            <ul className='metismenu list-unstyled' id='side-menu'>
              <li className='menu-title'>{'Menu'} </li>
              <li>
                <Link to='/dashboard'>
                  <i className='bx bx-home-circle' />
                  <span>{'Dashboards'}</span>
                </Link>
              </li>
              <li>
                <Link to='/#' className='has-arrow'>
                  <i className='mdi mdi-form-select' />
                  <span>{'Form'}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/form-table'>{'Mis Formularios'}</Link>
                  </li>
                  {/* <li>
                    <Link to='/form-create'>{'Creador de Formularios'}</Link>
                  </li> */}

                </ul>
              </li>
              <li>
                <Link to='/#' className='has-arrow'>
                  <i className='mdi mdi-office-building' />
                  <span>{'Empresas'}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/company-table-1'>{'Empresas'}</Link>
                  </li>
                  <li>
                    <Link to='/company-create'>{'Crear Empresa'}</Link>
                  </li>

                </ul>
              </li>
              <li>
                <Link to='/#' className='has-arrow'>
                  <i className='fas fa-user-friends' />
                  <span>{'Usuarios'}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/user-register'>{'Crear Usuario'}</Link>
                  </li>

                </ul>
              </li>
            </ul>
          ) : isClientRole ? (
            <ul className='metismenu list-unstyled' id='side-menu'>
              <li className='menu-title'>{'Menu'} </li>
              <li>
                <Link to='/dashboard'>
                  <i className='bx bx-home-circle' />
                  <span>{'Dashboards'}</span>
                </Link>
              </li>
              <li>
                <Link to='/#' className='has-arrow'>
                  <i className='mdi mdi-form-select' />
                  <span>{'Form'}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/form-table'>{'Mis Formularios'}</Link>
                  </li>
                  <li>
                    <Link to='/form-create'>{'Creador de Formularios'}</Link>
                  </li>
                  <li>
                    <Link to='/form-response-table'>{'Formularios Respondidos'}</Link>
                  </li>


                </ul>
              </li>
              <li>
                <Link to='/#' className='has-arrow'>
                  <i className='mdi mdi-office-building' />
                  <span>{'Empresas'}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/company-table-1'>{'Empresas'}</Link>
                  </li>
                  <li>
                    <Link to='/company-create'>{'Crear Empresa'}</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to='/#' className='has-arrow'>
                  <i className='fas fa-user-friends' />
                  <span>{'Usuarios'}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/user-register'>{'Crear Usuario'}</Link>
                  </li>


                </ul>
              </li>
            </ul>
          ) : isUserRole ? (
            <ul className='metismenu list-unstyled' id='side-menu'>
              <li className='menu-title'>{'Menu'} </li>
              <li>
                <Link to='/dashboard'>
                  <i className='bx bx-home-circle' />
                  <span>{'Dashboards'}</span>
                </Link>
              </li>

              <li>
                <Link to='/#' className='has-arrow'>
                  <i className='mdi mdi-office-building' />
                  <span>{'Empresa'}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/form-response-table'>{'Formularios Respondidos'}</Link>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className='metismenu list-unstyled' id='side-menu'>
              <li className='menu-title'>{'Menu'} </li>
              <li>
                <Link to='/dashboard'>
                  <i className='bx bx-home-circle' />
                  <span>{'Dashboards'}</span>
                </Link>
              </li>
              <li>
                <Link to='/#' className='has-arrow'>
                  <i className='mdi mdi-form-select' />
                  <span>{'Form'}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/ecommerce-orders'>{'Mis Formularios'}</Link>
                  </li>
                  <li>
                    <Link to='/form-create'>{'Creador de Formularios'}</Link>
                  </li>
 
                </ul>
              </li>
              <li>
                <Link to='/#' className='has-arrow'>
                  <i className='mdi mdi-office-building' />
                  <span>{'Empresas'}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/company-table-1'>{'Empresas'}</Link>
                  </li>
                  <li>
                    <Link to='/company-create'>{'Crear Empresa'}</Link>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </SimpleBar>
    </React.Fragment>
  );
});

export default withRouter(SidebarContent);
