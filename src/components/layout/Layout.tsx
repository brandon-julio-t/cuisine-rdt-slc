import { Outlet } from 'react-router';
import Navbar from '../common/Navbar';

interface Props {}

const Layout = (props: Props) => {
  return (
    <>
      <Navbar />
      <Outlet {...props} />
    </>
  );
};

export default Layout;
