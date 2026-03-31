export default function Header() {
  return (
    <header>
      <div className="logo">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="34" height="34" rx="8" fill="#ece7de"/>
          <g transform="translate(17,17)">
            <path d="M0,0 C0,-3.5 1.5,-6.5 4.5,-7.5 C7.5,-8.5 10.5,-6.5 10.5,-3.5 C10.5,-0.5 7.5,1.5 4.5,2.5 C1.5,3.5 0,6 0,9"
                  stroke="#0d1520" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
            <path d="M0,0 C0,-3.5 1.5,-6.5 4.5,-7.5 C7.5,-8.5 10.5,-6.5 10.5,-3.5 C10.5,-0.5 7.5,1.5 4.5,2.5 C1.5,3.5 0,6 0,9"
                  stroke="#0d1520" strokeWidth="2.4" fill="none" strokeLinecap="round" transform="rotate(120)"/>
            <path d="M0,0 C0,-3.5 1.5,-6.5 4.5,-7.5 C7.5,-8.5 10.5,-6.5 10.5,-3.5 C10.5,-0.5 7.5,1.5 4.5,2.5 C1.5,3.5 0,6 0,9"
                  stroke="#0d1520" strokeWidth="2.4" fill="none" strokeLinecap="round" transform="rotate(240)"/>
          </g>
        </svg>
        Forma<span className="logo-accent">AI</span>
      </div>
      <span className="header-tag">Client Scoping Tool</span>
    </header>
  );
}
