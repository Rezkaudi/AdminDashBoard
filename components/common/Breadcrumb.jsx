"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {

  const pathname = usePathname()
  const path = pathname.split("/")

  return (
    <section className="page-title pt-0 rounded">
      <div className="auto-container">
        <div className="title-outer d-flex">
          <ul className="page-breadcrumb d-inline">
            <li>
              <Link className="text-primary" href="/">Home</Link>
            </li>
            <li>
              <Link href={path.slice(1).map(item=> item + "/")}>{path.length ===3 ? path.slice(1,2).map(item=> item  ) : path.slice(1).map(item=> item )}</Link>
            </li>
            {/* {path.map((item, index) =>
              <li key={index}>
                <Link className={index !== path.length - 1 ? "text-primary" : ""} href={item ? `/${item}` : "/"}>{item ? item : "Home"}</Link>
              </li>
            )} */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
