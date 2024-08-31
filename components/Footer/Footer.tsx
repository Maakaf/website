import Link from 'next/link';
import FacebookIconLink from './FacebookIconLink';
import LinkedinIconLink from './LinkedinIconLink';
import TwitterIconLink from './TwitterIconLink';
import React from 'react';
import GithubIconLink from '@/components/Footer/GithubIconLink';
import { LINKS } from '@/config/consts';
import MeetupIconLink from './MeetupIconLink';
import YoutubeIconLink from './YoutubeIconLink';
import { useTranslations } from 'next-intl';

interface FooterLinkProps {
  href: string;
  text: string;
}

const FooterLink = ({ href, text }: FooterLinkProps) => (
  <Link href={href}>
    <p className="p-2 text-lg text-left md:text-left transition duration-200 hover:font-bold dark:hover:text-blue-400 hover:text-blue-600">
      {text}
    </p>
  </Link>
);
const Footer: React.FC = () => {
  const t = useTranslations('Footer');

  const links = [
    {
      text: 'Contributors',
      href: LINKS.CONTRIBUTORS,
    },
    {
      text: t('projects'),
      href: LINKS.PROJECTS,
    },
    {
      text: 'Newbies',
      href: LINKS.NEWBIES,
    },
    {
      text: t('contact'),
      href: LINKS.CONTACT_US,
    },
    {
      text: 'Maintainers',
      href: LINKS.COMMUNITY_MAINTAINERS,
    },
    {
      text: t('aboutUs'),
      href: LINKS.ABOUT_US,
    },
  ];

  return (
    <footer className="z-10 bottom-0 grid py-6 font-inter md:grid-cols-2 border-t-[1px] w-full border-blue-600 bg-blue-100 dark:bg-darkAccBg text-darkTex dark:text-lightText">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 2xl:w-2/3 md:px-2 lg:px-4 md:gap-4 lg:gap-6">
        {links.map((link, index) => (
          <FooterLink key={index} href={link.href} text={link.text} />
        ))}
      </div>
      <div className="flex flex-col items-center w-full h-auto md:px-2 md:items-end md:gap-4 lg:gap-6">
        <div className="flex flex-col justify-around h-full">
          <div className="flex justify-center gap-1 md:gap-4 lg:gap-6">
            <GithubIconLink repoUrl="https://github.com/Maakaf/maakaf-website" />
            <FacebookIconLink />
            <LinkedinIconLink />
            <TwitterIconLink />
            <YoutubeIconLink />
            <MeetupIconLink />
          </div>
          <div className="flex justify-center w-full gap-10 text-center lg:gap-16">
            <Link className="text-sm" href={LINKS.TERMS_OF_USE}>
              {t('terms')}
            </Link>
            <Link className="text-sm" href={LINKS.PRIVACY_SETTINGS}>
              {t('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
