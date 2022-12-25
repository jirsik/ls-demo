type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props): JSX.Element {
  return (
    <div>
      { children }
    </div>
  );
}

export default Layout;
