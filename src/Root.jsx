import { Navigation } from "./Navigation";
import { Outlet } from 'react-router-dom';

export const Root= () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};
