"use client";

import React from "react";
import "./applicant-home.css";
import logo from "../../../public/bb.png";
import { handleSignOut } from "../../../actions/signOut";
import { useRouter } from "next/navigation";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslations } from "next-intl";

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
            <a href="applicant-home"><img src={logo.src} alt={t('logoAlt')} className="navbar__logo" /></a>
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
