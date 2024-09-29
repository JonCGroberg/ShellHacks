type LinkComponentProps = {
  href: string;
  text: string;
  className?: string;
};

export default function Link({children}) {
  return (
    <a href={children.href}>
      {children}
    </a>
  );
};