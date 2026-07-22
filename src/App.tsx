import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ArrowUpRight, Download } from "lucide-react";
import { filterCase, hero, otherProjects, profile, taxIntakeCase } from "./content";

const avatarImage = new URL("./assets/avatar-anton.png", import.meta.url).href;
const taxIntakeBg = new URL("./assets/tax-intake-card-bg.jpg", import.meta.url).href;
const taxIntakeMiniBg = new URL("./assets/tax-intake-mini-bg.jpg", import.meta.url).href;
const taxMiniBottomBg = new URL("./assets/tax-mini-card-bottom-bg.png", import.meta.url).href;
const taxFlowPreview = new URL("./assets/tax-flow-preview.png", import.meta.url).href;
const taxQuestionnaireCard = new URL("./assets/tax-questionnaire-card.png", import.meta.url).href;
const filterCaseImage = new URL("./assets/filter-case-visual.png", import.meta.url).href;
const filterCaseUi = new URL("./assets/filter-case-ui.png", import.meta.url).href;
const filterCaseBg = new URL("./assets/filter-case-bg.png", import.meta.url).href;
const otherProjectImages: Record<string, string> = {
  GigRadar: new URL("./assets/project-gigradar.png", import.meta.url).href,
  "Halyk Invest": new URL("./assets/project-halyk-invest.png", import.meta.url).href,
  RikkyHype: new URL("./assets/project-rikkyhype.png", import.meta.url).href,
  Dovody: new URL("./assets/project-dovody.png", import.meta.url).href,
};
const cvUrl = "/Anton_Reva_CV.pdf";

type Theme = "light" | "dark";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    finished: Promise<void>;
  };
};

const socialUrls: Record<string, string> = {
  D: "https://dribbble.com/anton_reva",
  in: "https://www.linkedin.com/in/anton-reva/",
  tg: "https://t.me/anton_reva",
  x: "https://x.com/anton_reva",
};

const socialLabels: Record<string, string> = {
  email: "Copy email",
  in: "LinkedIn",
  tg: "Telegram",
  x: "X",
};

const titleLead = "Senior Product Designer bringing clarity to complex problems with";
const titleRotatingWords = ["system thinking", "user research", "design systems", "data-driven design", "AI-driven design"];

function CopyIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M12.8682 5.56641C13.8761 5.56661 14.6933 6.38366 14.6934 7.3916V12.8682C14.6932 13.876 13.876 14.6932 12.8682 14.6934H7.3916C6.38366 14.6933 5.56661 13.8761 5.56641 12.8682V7.3916C5.56646 6.38357 6.38357 5.56646 7.3916 5.56641H12.8682ZM7.3916 6.7832C7.05565 6.78326 6.78326 7.05565 6.7832 7.3916V12.8682C6.78341 13.204 7.05574 13.4765 7.3916 13.4766H12.8682C13.2039 13.4764 13.4764 13.2039 13.4766 12.8682V7.3916C13.4765 7.05574 13.204 6.78341 12.8682 6.7832H7.3916ZM8.61035 1.30859C9.09416 1.3087 9.55819 1.50076 9.90039 1.84277C10.2427 2.18507 10.4355 2.64971 10.4355 3.13379V3.74219C10.4355 4.07813 10.1631 4.35044 9.82715 4.35059C9.49111 4.35059 9.21875 4.07823 9.21875 3.74219V3.13379C9.21872 2.97252 9.15403 2.81817 9.04004 2.7041C8.92602 2.59009 8.77158 2.52549 8.61035 2.52539H3.13379C2.97246 2.52542 2.81818 2.59002 2.7041 2.7041C2.59002 2.81818 2.52542 2.97246 2.52539 3.13379V8.61035C2.52549 8.77158 2.59009 8.92602 2.7041 9.04004C2.81817 9.15403 2.97252 9.21872 3.13379 9.21875H3.74219C4.07823 9.21875 4.35059 9.49111 4.35059 9.82715C4.35044 10.1631 4.07813 10.4355 3.74219 10.4355H3.13379C2.64971 10.4355 2.18507 10.2427 1.84277 9.90039C1.50076 9.55819 1.3087 9.09416 1.30859 8.61035V3.13379C1.30862 2.64971 1.50048 2.18507 1.84277 1.84277C2.18507 1.50048 2.64971 1.30862 3.13379 1.30859H8.61035Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M12.8473 10.3237C12.8202 10.3511 12.8202 10.3511 12.7924 10.379C12.7315 10.4404 12.6704 10.5017 12.6093 10.563C12.5657 10.6069 12.5221 10.6508 12.4785 10.6947C12.3598 10.8142 12.2409 10.9335 12.122 11.0527C12.0478 11.1272 11.9736 11.2017 11.8994 11.2762C11.6672 11.5092 11.435 11.7421 11.2026 11.9748C10.9342 12.2437 10.6661 12.5129 10.3984 12.7824C10.1915 12.9906 9.9843 13.1985 9.77682 13.4061C9.65289 13.5301 9.52911 13.6543 9.40564 13.7789C9.28952 13.896 9.173 14.0127 9.05609 14.1292C9.01328 14.172 8.97062 14.2149 8.92812 14.258C8.87005 14.3169 8.81144 14.3752 8.7527 14.4333C8.73602 14.4505 8.71934 14.4677 8.70214 14.4854C8.5866 14.5982 8.49578 14.6353 8.336 14.6517C8.12278 14.6382 8.04144 14.5847 7.89387 14.4367C7.86652 14.4095 7.86652 14.4095 7.83862 14.3818C7.77719 14.3208 7.71591 14.2596 7.65462 14.1984C7.61076 14.1547 7.5669 14.1111 7.52299 14.0674C7.40355 13.9485 7.28424 13.8295 7.16498 13.7105C7.09053 13.6361 7.01603 13.5618 6.94152 13.4875C6.7085 13.2551 6.47563 13.0226 6.24285 12.79C5.97393 12.5213 5.7047 12.2529 5.43525 11.9847C5.22717 11.7775 5.01928 11.5701 4.81162 11.3626C4.68755 11.2385 4.56333 11.1146 4.43888 10.9909C4.32179 10.8745 4.20502 10.7578 4.08844 10.6409C4.04559 10.598 4.00265 10.5553 3.95965 10.5127C3.90087 10.4545 3.84251 10.3958 3.7842 10.3371C3.75855 10.3119 3.75855 10.3119 3.7323 10.2863C3.62807 10.18 3.57485 10.09 3.54095 9.945C3.54571 9.76856 3.58446 9.64778 3.69425 9.50999C3.80593 9.41887 3.90709 9.37239 4.04917 9.34835C4.2507 9.37131 4.35728 9.43009 4.49922 9.57043C4.54264 9.61318 4.54264 9.61318 4.58691 9.65679C4.61891 9.68861 4.65097 9.72038 4.68298 9.75211C4.71673 9.78548 4.75048 9.81876 4.78428 9.85209C4.87597 9.94265 4.96756 10.0333 5.05916 10.1239C5.15481 10.2187 5.2506 10.3132 5.34639 10.4079C5.52783 10.5871 5.70913 10.7664 5.89039 10.9457C6.09672 11.1499 6.30319 11.3539 6.50967 11.558C6.93443 11.9777 7.35905 12.3976 7.78358 12.8176C7.78356 12.7835 7.78356 12.7835 7.78352 12.7487C7.78256 11.4001 7.7818 10.0516 7.78133 8.70314C7.78128 8.5414 7.78124 8.37956 7.78119 8.21773C7.78114 8.16941 7.78114 8.16941 7.78114 8.1201C7.78095 7.59807 7.78058 7.07604 7.7802 6.554C7.77977 6.01863 7.77951 5.48319 7.77945 4.94782C7.77937 4.61726 7.77918 4.28672 7.7788 3.95617C7.7786 3.72972 7.77852 3.50324 7.77855 3.27675C7.77862 3.146 7.77856 3.0152 7.77831 2.88441C7.77811 2.76477 7.77811 2.64514 7.77823 2.52546C7.77829 2.48213 7.77821 2.43875 7.77809 2.3954C7.77789 2.33658 7.77804 2.27779 7.77814 2.21895C7.77812 2.18625 7.77812 2.15355 7.77813 2.11988C7.79021 1.93092 7.8697 1.84021 8.00312 1.71274C8.10922 1.62794 8.17804 1.60777 8.31391 1.5923C8.51194 1.61479 8.61037 1.69173 8.75109 1.82922C8.88949 2.034 8.85031 2.31955 8.84957 2.55523C8.84958 2.59953 8.8496 2.64382 8.84968 2.68815C8.84977 2.80959 8.84959 2.93101 8.84938 3.05247C8.84918 3.18353 8.84925 3.31461 8.8493 3.4457C8.84933 3.6727 8.84918 3.89968 8.84893 4.12668C8.84857 4.45486 8.84846 4.78306 8.84839 5.11124C8.8483 5.64373 8.84802 6.17622 8.8476 6.70867C8.84718 7.22594 8.84685 7.74312 8.84666 8.26035C8.84671 8.29226 8.84666 8.32417 8.84666 8.35698C8.84656 8.51698 8.84652 8.67693 8.84652 8.83692C8.84603 10.1638 8.84525 11.4907 8.84424 12.8176C8.86167 12.8003 8.87905 12.783 8.89699 12.7651C9.3209 12.3428 9.74529 11.921 10.1702 11.4998C10.3757 11.2961 10.581 11.0922 10.786 10.8879C10.9646 10.7098 11.1436 10.5321 11.3229 10.3547C11.4178 10.2607 11.5126 10.1667 11.6069 10.0723C11.6959 9.98328 11.7852 9.89473 11.8749 9.80648C11.9077 9.7741 11.9402 9.74161 11.9727 9.7089C12.1486 9.53185 12.2854 9.39731 12.5345 9.34838C12.7423 9.372 12.8631 9.43182 12.9985 9.59145C13.075 9.74795 13.1026 9.88268 13.0648 10.0555C13.0102 10.1646 12.9326 10.2384 12.8473 10.3237Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "email") {
    return (
      <svg className="social-icon social-icon-email" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m5 7 7 5.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "tg") {
    return (
      <svg className="social-icon social-icon-telegram" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9.78047 18.6504L10.0605 14.4204L17.7404 7.50045C18.0805 7.19045 17.6704 7.04045 17.2204 7.31045L7.74047 13.3005L3.64046 12.0005C2.76047 11.7504 2.75047 11.1405 3.84047 10.7004L19.8104 4.54046C20.5405 4.21046 21.2404 4.72046 20.9605 5.84045L18.2404 18.6504C18.0505 19.5605 17.5004 19.7805 16.7404 19.3605L12.6005 16.3005L10.6105 18.2304C10.3805 18.4605 10.1905 18.6504 9.78047 18.6504Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "in") {
    return (
      <svg className="social-icon social-icon-linkedin" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M2.16344 0.015625C0.967892 0.015625 0.000193424 0.985064 0 2.17791C0 3.37191 0.967698 4.34116 2.16364 4.34116C3.35629 4.34116 4.32534 3.37191 4.32534 2.17791C4.32534 0.984871 3.35609 0.015625 2.16344 0.015625Z"
          fill="currentColor"
        />
        <path d="M4.02744 5.98047H0.296875V17.9832H4.02744V5.98047Z" fill="currentColor" />
        <path
          d="M13.5248 5.68359C11.7101 5.68359 10.4933 6.67856 9.99523 7.62208H9.94533V5.98205H6.36738H6.36719V17.9846H10.0945V12.0468C10.0945 10.4815 10.3925 8.96522 12.3333 8.96522C14.2463 8.96522 14.2718 10.7555 14.2718 12.1472V17.9844H17.9997V11.401C17.9997 8.16947 17.3024 5.68359 13.5248 5.68359Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg className="social-icon social-icon-x" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M12.6 0.75H15.054L9.694 6.892L16 15.25H11.063L7.196 10.18L2.771 15.25H0.316L6.049 8.68L0 0.75H5.063L8.558 5.383L12.6 0.75ZM11.74 13.778H13.1L4.323 2.145H2.865L11.74 13.778Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MobileSocialIcon({ name }: { name: "linkedin" | "behance" | "dribbble" | "email" }) {
  if (name === "linkedin") {
    return <SocialIcon name="in" />;
  }

  if (name === "behance") {
    return <span className="mobile-social-monogram" aria-hidden="true">Bē</span>;
  }

  if (name === "dribbble") {
    return (
      <svg className="mobile-social-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 5.3c3.8 3.3 6.2 7.5 7.4 12.9M4 11.2c5.2.2 10.1-1.2 14.1-4M7.1 18c2.6-3.7 6.5-5.8 11.9-5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="mobile-social-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m5 7 7 5.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Sidebar({
  isDark,
  onToggleTheme,
  onCopyEmail,
}: {
  isDark: boolean;
  onToggleTheme: () => void;
  onCopyEmail: () => void;
}) {
  return (
    <aside className="sidebar" aria-label="Profile sidebar">
      <section className="card profile-card" id="about">
        <div className="profile-top">
          <div className="profile-person">
            <div className="avatar-shape" aria-hidden="true">
              <img src={avatarImage} alt="" />
            </div>
            <div>
              <h2 className="sidebar-title">{profile.name}</h2>
              <p>{profile.role}</p>
            </div>
          </div>
          <button
            className="toggle"
            aria-label="Toggle dark theme"
            aria-pressed={isDark}
            type="button"
            onClick={onToggleTheme}
          >
            <svg className={`toggle-icon ${!isDark ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
              <path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" />
              <path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
              <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
              <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
              <path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" />
              <path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
              <path d="M12 1a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
              <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
            </svg>
            <svg className={`toggle-icon ${isDark ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" />
            </svg>
          </button>
        </div>

        <div className="profile-copy">
          {profile.intro.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>
              {paragraph.map((segment, segmentIndex) => (
                <span
                  className={segment.tone ? `profile-copy-${segment.tone}` : undefined}
                  key={segmentIndex}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          ))}
        </div>

        <div className="pills" aria-label="Experience and skills">
          {profile.tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="card links-card" aria-label="External links">
        {profile.links.map((link) => (
          <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
            <span className="link-label">{link.label}</span>
          </a>
        ))}
      </section>

      <section className="card contact-card" id="contacts">
        <h3 className="sidebar-title">Have a project in mind?</h3>
        <p>Let's discuss your project</p>
        <button className="contact-email" type="button" onClick={onCopyEmail}>
          <span className="link-label">{profile.email}</span>
        </button>
      </section>
    </aside>
  );
}

function Hero({ onCopyEmail }: { onCopyEmail: () => void }) {
  return (
    <section className="card hero-card" id="home">
      <div className="hero-content">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>
          {titleLead}{" "}
          <span className="title-rotator" aria-label="system thinking">
            <span className="title-rotator-track" aria-hidden="true">
              {titleRotatingWords.map((words) => (
                <span key={words}>{words}</span>
              ))}
            </span>
          </span>
        </h1>
        <div className="hero-actions">
          <a className="button button-dark" href="https://t.me/anton_reva" target="_blank" rel="noreferrer">
            <span className="btn-text-wrap">
              <span className="btn-text"><svg className="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.787l3.019-14.228c.309-1.239-.473-1.8-1.282-1.432z"/></svg>Message me</span>
              <span className="btn-text btn-text-clone" aria-hidden="true"><svg className="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.787l3.019-14.228c.309-1.239-.473-1.8-1.282-1.432z"/></svg>Message me</span>
            </span>
          </a>
          <a className="button button-light" href={cvUrl} download="Anton_Reva_CV.pdf">
            <span className="btn-text-wrap">
              <span className="btn-text"><Download className="button-cv-icon" aria-hidden="true" />{hero.secondaryAction}</span>
              <span className="btn-text btn-text-clone" aria-hidden="true"><Download className="button-cv-icon" aria-hidden="true" />{hero.secondaryAction}</span>
            </span>
          </a>
        </div>
        <nav className="mobile-social-links" aria-label="Contact links">
          <a href="https://www.linkedin.com/in/anton-reva/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><MobileSocialIcon name="linkedin" /><span className="mobile-social-label">LinkedIn</span></a>
          <a href="https://www.behance.net/antonreva" target="_blank" rel="noreferrer" aria-label="Behance"><MobileSocialIcon name="behance" /><span className="mobile-social-label">Behance</span></a>
          <a href="https://dribbble.com/anton_reva" target="_blank" rel="noreferrer" aria-label="Dribbble"><MobileSocialIcon name="dribbble" /><span className="mobile-social-label">Dribbble</span></a>
          <button type="button" onClick={onCopyEmail} aria-label="Copy email"><MobileSocialIcon name="email" /><span className="mobile-social-label">Email</span></button>
        </nav>
      </div>

      <div className="social-stack" aria-label="Social shortcuts">
        {hero.socials.map((social) =>
          social === "email" ? (
            <button
              className="social-link social-link-email"
              key={social}
              type="button"
              aria-label={socialLabels[social]}
              onClick={onCopyEmail}
            >
              <SocialIcon name={social} />
            </button>
          ) : (
            <a
              className={`social-link social-link-${social}`}
              href={socialUrls[social]}
              key={social}
              aria-label={socialLabels[social] ?? social}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon name={social} />
            </a>
          ),
        )}
      </div>
    </section>
  );
}

function TaxIntakeCaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const checklistItems = [
    ["Reading document", "tax_return_2025.pdf"],
    ["Detecting document type", "Form 1040 · individual return"],
    ["Extracting line items", "9 fields detected"],
    ["Identifying required documents", "W-2, 1099-INT, K-1, 1098, ..."],
    ["Building checklist", ""],
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = section.querySelectorAll<HTMLElement>(".tax-case-card, .filters-case-card");

    if (reducedMotion.matches) {
      cards.forEach((card) => {
        card.classList.add("is-scroll-visible");
        card.style.opacity = "1";
        card.style.translate = "0 0";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;

          if (card.classList.contains("tax-case-card")) {
            card.classList.remove("is-scroll-visible");

            if (entry.boundingClientRect.top < 0) {
              card.style.opacity = "1";
              card.style.translate = "0 0";
              return;
            }

            const progress = Math.min(1, entry.intersectionRatio / 0.34);
            card.style.opacity = String(0.72 + progress * 0.28);
            card.style.translate = `0 ${1.5 * (1 - progress)}rem`;
          } else if (entry.isIntersecting) {
            entry.target.classList.add("is-scroll-visible");
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove("is-scroll-visible");
          }
        });
      },
      { threshold: [0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.34], rootMargin: "0px 0px -8%" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="card selected-work-section"
      id="projects"
      ref={sectionRef}
    >
      <header className="selected-work-header">
        <p className="section-kicker">Case Studies</p>
        <h2>Selected work</h2>
      </header>

      <a
        className="tax-case-card"
        href={taxIntakeCase.href}
        target="_blank"
        rel="noreferrer"
        aria-labelledby="tax-case-title"
        style={{ backgroundImage: `url(${taxIntakeBg})` }}
      >
        <div className="tax-case-copy">
          <p className="filters-case-meta">{taxIntakeCase.meta}</p>
          <h3 id="tax-case-title">{taxIntakeCase.title}</h3>
          <p className="tax-case-description">{taxIntakeCase.description}</p>
          <div className="filters-case-outcomes" aria-label="Project outcomes">
            {taxIntakeCase.outcomes.map((outcome) => (
              <span key={outcome}>{outcome}</span>
            ))}
          </div>
          <span className="filters-case-link">
            <span className="filters-case-link-text">
              <span className="filters-case-link-text-track" data-text={taxIntakeCase.action}>
                {taxIntakeCase.action}
              </span>
            </span>
            <ArrowUpRight className="filters-case-link-icon" aria-hidden="true" />
          </span>
        </div>

        <div className="tax-case-showcase" aria-hidden="true">
          <div className="tax-upload-panel">
            <h4>
              ai builds checklist <span>in seconds</span>
            </h4>
            <div className="tax-upload-body">
              <div className="tax-dropzone">
                <img className="tax-file-stack" src={new URL("./assets/doc-icon.svg", import.meta.url).href} alt="" aria-hidden="true" />
                <div className="tax-drop-icon" />
                <strong>Drop your Form 1040 here</strong>
                <p>PDF only · up to 15MB</p>
                <div className="tax-upload-actions">
                  <span><img src={new URL("./assets/upload-icon.svg", import.meta.url).href} alt="" aria-hidden="true" className="upload-btn-icon" />Upload</span>
                  <span>Choose file</span>
                </div>
              </div>
              <div className="tax-progress-list">
                {checklistItems.map(([title, detail], index) => (
                  <div className="tax-progress-item" key={title}>
                    <span className={index === checklistItems.length - 1 ? "is-loading" : ""} />
                    <div>
                      <strong>{title}</strong>
                      {detail ? <p>{detail}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tax-mini-stack">
            <div className="tax-mini-card tax-mini-card-top" style={{ backgroundImage: `url(${taxIntakeMiniBg})` }}>
              <img className="tax-questionnaire" src={taxQuestionnaireCard} alt="" aria-hidden="true" />
              <h4>end-to-end<br />tax intake</h4>
            </div>

            <div className="tax-mini-card tax-mini-card-bottom" style={{ backgroundImage: `url(${taxMiniBottomBg})` }}>
              <h4>
                one flow
                <br />
                with a visible end
              </h4>
              <img className="tax-flow-preview-img" src={taxFlowPreview} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </a>
      <FilterCaseStudy />
      <OtherProjects />
    </section>
  );
}

function FilterCaseStudy() {
  return (
    <a
      className="filters-case-card"
      href={filterCase.href}
      target="_blank"
      rel="noreferrer"
      aria-labelledby="filters-case-title"
      style={{ backgroundImage: `url(${filterCaseBg})` }}
    >
      <div className="filters-case-copy">
        <p className="filters-case-meta">{filterCase.meta}</p>
        <h2 id="filters-case-title">{filterCase.title}</h2>
        <p className="filters-case-description">{filterCase.description}</p>
        <div className="filters-case-outcomes" aria-label="Project outcomes">
          {filterCase.outcomes.map((outcome) => (
            <span key={outcome}>{outcome}</span>
          ))}
        </div>
        <span className="filters-case-link">
          <span className="filters-case-link-text">
            <span className="filters-case-link-text-track" data-text={filterCase.action}>
              {filterCase.action}
            </span>
          </span>
          <ArrowUpRight className="filters-case-link-icon" aria-hidden="true" />
        </span>
      </div>

      <img className="filters-case-bg-img" src={filterCaseImage} alt="" aria-hidden="true" />
      <img className="filters-case-ui-img" src={filterCaseUi} alt="" aria-hidden="true" />
    </a>
  );
}

function OtherProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setIsRevealed(true);
      return;
    }

    lastScrollY.current = window.scrollY;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY >= lastScrollY.current;

        if (entry.isIntersecting && isScrollingDown) {
          setIsRevealed(true);
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          setIsRevealed(false);
        }

        lastScrollY.current = currentScrollY;
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`other-projects${isRevealed ? " is-revealed" : ""}`}
      id="other-projects"
      aria-label="Other projects"
      ref={sectionRef}
    >
      <p className="section-kicker other-projects-kicker">Other Projects</p>
      <div className="other-projects-grid">
        {otherProjects.map((project) => (
          <a
            className="other-project-card"
            href={project.href}
            key={project.title}
            target="_blank"
            rel="noreferrer"
          >
            <div className="other-project-media" aria-hidden="true">
              <img src={otherProjectImages[project.title]} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="other-project-title-row">
              <h3>{project.title}</h3>
              <div className="other-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <p>{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

const navItems = [
  { id: "home", label: "Home", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: "about", label: "About", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id: "projects", label: "Case Studies", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
  { id: "other-projects", label: "Projects", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
];

function BottomNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActive(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`bottom-nav-item${active === item.id ? " is-active" : ""}`}
          onClick={(e) => handleClick(e, item.id)}
        >
          {item.icon}
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

export function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = window.localStorage.getItem("theme");
    return savedTheme === "light" ? "light" : "dark";
  });
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#090a0b" : "#eceeef");
  }, [theme]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateAvatarRotation = () => {
      frame = 0;

      if (reduceMotion.matches) {
        document.documentElement.style.setProperty("--avatar-rotation", "0deg");
        return;
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;

      document.documentElement.style.setProperty("--avatar-rotation", `${scrollProgress * -360}deg`);
    };

    const queueAvatarRotationUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateAvatarRotation);
    };

    updateAvatarRotation();
    window.addEventListener("scroll", queueAvatarRotationUpdate, { passive: true });
    window.addEventListener("resize", queueAvatarRotationUpdate);

    return () => {
      window.removeEventListener("scroll", queueAvatarRotationUpdate);
      window.removeEventListener("resize", queueAvatarRotationUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setShowToast(true);

      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }

      toastTimer.current = window.setTimeout(() => {
        setShowToast(false);
      }, 800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = isDark ? "light" : "dark";
    const viewTransitionDocument = document as ViewTransitionDocument;
    const shouldAnimate =
      window.matchMedia("(min-width: 769px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      typeof viewTransitionDocument.startViewTransition === "function";

    if (!shouldAnimate) {
      setTheme(nextTheme);
      return;
    }

    viewTransitionDocument.startViewTransition?.(() => {
      flushSync(() => setTheme(nextTheme));
      document.documentElement.dataset.theme = nextTheme;
      window.localStorage.setItem("theme", nextTheme);
    });
  };

  return (
    <>
      <main className="page-shell">
        <Sidebar
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onCopyEmail={copyEmail}
        />
        <div className="main-column">
          <Hero onCopyEmail={copyEmail} />
          <TaxIntakeCaseStudy />
        </div>
      </main>
      <div className={`copy-toast${showToast ? " is-visible" : ""}`} aria-live="polite" aria-atomic="true">
        Email copied successfully
      </div>
      <BottomNav />
    </>
  );
}
