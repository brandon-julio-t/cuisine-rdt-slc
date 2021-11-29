import { Outlet } from 'react-router';
import ModalProvider from '../../providers/ModalProvider';
import Navbar from '../common/Navbar';

interface Props {}

const Layout = (props: Props) => {
  return (
    <>
      <ModalProvider>
        <Outlet {...props} />
      </ModalProvider>
    </>
  );
};

export default Layout;
