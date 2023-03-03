import React from 'react';
import ReactDOM from 'react-dom';
import style from './SideDrawer.module.css';
import { CSSTransition } from 'react-transition-group';
const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className={style['side-drawer']} onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById('overlays'));
};

export default SideDrawer;
