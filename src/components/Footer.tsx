import Link from "../components/Link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Courses</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Lessons</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Vocabulary</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Podcasts</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Videos</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Forums</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Language Exchange</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Events</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Careers</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-orange-500">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; 2024 LinguaLeap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
