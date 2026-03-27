import {
  Footer,
  FooterTitle,
  FooterLinkGroup,
  FooterLink,
  FooterDivider,
  FooterCopyright,
  FooterIcon,
} from 'flowbite-react';
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsGithub,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500 mt-5">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5 mr-2">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold text-gray-800 hover:text-gray-500 dark:text-white"
            >
              <span className="px-2 py-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Young's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google
                </FooterLink>
                <FooterLink
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Young's Blog
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/guniluk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="#"
            by="Young's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-10 mt-5 justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="https://github.com/guniluk" icon={BsGithub} />
            <FooterIcon href="#" icon={BsYoutube} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
