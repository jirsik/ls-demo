type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props) {
  return (
    <div>
      { children }
    </div>
  );
}

export default Layout;
