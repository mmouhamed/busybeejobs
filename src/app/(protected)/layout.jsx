"use client";

import React from "react";
import "./applicant-home.css";
import logo from "../../../public/bb.png";
import { handleSignOut } from "../../../actions/signOut";
import { useRouter } from "next/navigation";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslations } from "next-intl";
import Image from 'next/image'; 

const ApplicantHomeLayout = ({ children }) => {
  const t = useTranslations('ApplicantHome');

  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

const Navbar = () => {
  const t = useTranslations('ApplicantHome');
  const router = useRouter();

  return (
    <nav className="navbar">
        <div className="navbar__logo"> 
            <a href="applicant-home">
                <Image 
                  src={logo.src} 
                  alt={t('logoAlt')} 
                  className="navbar__logo" 
                  width={200}  // You should provide a reasonable width
                  height={50}  // And height for better optimization
                  priority={true} // Use priority for the main logo to load faster
                />
            </a>
        </div>
        <div className="navbar_right">
            <LanguageSelector />
            <button
                className="navbar__signout"
                onClick={async () => {
                await handleSignOut();
                router.push("/auth/login")
                window.location.reload();
                }}
            >
                {t('signOut')}
            </button>
        </div>
    </nav>
  );
};

const Footer = () => {
  const t = useTranslations('ApplicantHome');

  return (
    <footer className="footer">
      <p>
        {t('equalOpportunity')}
      </p>
      <br />
      <p>
        {t('accommodations')}
      </p>
      <br />
      <br />
      <p style={{ textAlign: "center", color: "#777" }}>{t('copyright')}</p>
    </footer>
  );
};

export default ApplicantHomeLayout;
