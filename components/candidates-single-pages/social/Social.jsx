const Social = ({ github
  , portfolioUrl
  , linkedinUrl
  , email }) => {
  const socialContent = [
    { id: 1, icon: "fab fa-github", link: github },
    { id: 2, icon: "fab fa-linkedin-in", link: linkedinUrl },
    { id: 3, icon: "fa fa-user", link: portfolioUrl },
  ];

  const constructFullUrl = (link) => {
    // Check if the link already starts with http:// or https://
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return link;
    } else {
      // If it doesn't start with http:// or https://, add http://
      return `http://${link}`;
    }
  };
  return (
    <div className="social-links">
      {socialContent.map((item) => (
        item.link &&
        <a
          href={constructFullUrl(item.link)}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`${item.icon}`}></i>
        </a>
      ))}
    </div>
  );
};

export default Social;
