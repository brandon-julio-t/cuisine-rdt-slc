import { Outlet } from 'react-router';

interface Props {}

const Layout = (props: Props) => {
  return <Outlet {...props} />;
};

export default Layout;
