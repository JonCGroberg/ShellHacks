type LinkComponentProps = {
  href: string;
  text: string;
  className?: string;
};

export default function Link({ href, text, className = '' }) {
  return (
    <a href={href} className={className}>
      {text}
    </a>
  );
};