import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlugins } from '../../../features/plugins/state/actions';
import { StoreState } from '../../../types';

const ref = React.createRef();

export const PluginProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const authentication = useSelector((state: StoreState) => state.authentication.isAuthenticated);
  useMemo(() => {
    dispatch(loadPlugins());
  }, [ref, authentication]);

  return <React.Fragment>{children}</React.Fragment>;
};
