import { useState, useEffect, FC, ReactElement } from 'react';

const Footer: FC = (): ReactElement => {
  const [currentYear, setCurrentYear] = useState(0);

  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    setCurrentYear(currentYear);
  }, []);

  return (
    <footer className='footer'>
      <p className='footer__copyright'>© {currentYear} Mesto Russia</p>
    </footer>
  );
};

export default Footer;
