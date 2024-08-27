import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: ReactNode;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button = ({ children, href, type = 'button', className = '' }: ButtonProps) => {
    const styles = `py-2 px-5 text-white rounded font-semibold bg-teal-800 hover:bg-teal-950 transition-colors ${className}`;

    if (href) {
        return (
            <Link href={href} className={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={styles}>
            {children}
        </button>
    );
};

export default Button;
