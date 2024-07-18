const Social = ({ github
  , portfolioUrl
  , linkedinUrl
  , email }) => {
  const socialContent = [
    { id: 2, icon: "fab fa-github", link: github },
    { id: 4, icon: "fab fa-linkedin-in", link: linkedinUrl },
    { id: 3, icon: "fa fa-envelope", link: email },
    { id: 1, icon: "fa fa-user", link: portfolioUrl },
  ];
  return (
    <div className="social-links">
      {socialContent.map((item) => (
        <a
          href={item.link}
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
