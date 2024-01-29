import classNames from 'classnames';
import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

const StepsTab = ({
  activeTab,
  setActiveTab,
  passedSteps,
}: {
  activeTab: number;
  passedSteps: number[];
  setActiveTab: (active: number) => void;
}) => {
  return (
    <>
      <div className='wizard clearfix'>
        <div className='steps clearfix'>
          <ul>
            <NavItem className={classNames({ current: activeTab === 1 })}>
              <NavLink
                className={classNames({ current: activeTab === 1 })}
                onClick={() => {
                  setActiveTab(1);
                }}
                disabled={!(passedSteps || []).includes(1)}
              >
                <span className='number'>1.</span> Crear Formulario
              </NavLink>
            </NavItem>
            <NavItem className={classNames({ current: activeTab === 2 })}>
              <NavLink
                className={classNames({ active: activeTab === 2 })}
                onClick={() => {
                  setActiveTab(2);
                }}
                disabled={!(passedSteps || []).includes(2)}
              >
                <span className='number'>2.</span> Añadir Preguntas
              </NavLink>
            </NavItem>
            <NavItem className={classNames({ current: activeTab === 3 })}>
              <NavLink
                className={classNames({ active: activeTab === 3 })}
                onClick={() => {
                  setActiveTab(3);
                }}
                disabled={!(passedSteps || []).includes(3)}
              >
                <span className='number'>3.</span> Finalizado
              </NavLink>
            </NavItem>
          </ul>
        </div>
      </div>
    </>
  );
};
export default StepsTab;
