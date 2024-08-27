import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

interface CardProps {
    title: string;
    subtitle: string;
    thumbnail: string;
    btnLabel: string;
    href: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, thumbnail, btnLabel, href }) => {
    return (
        <div>
            <Link href={href}>
                <Image
                    className="block mx-auto mb-4 h-56 object-cover"
                    width="600"
                    height="400"
                    src={thumbnail}
                    alt="card thumbnail image"
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    placeholder="blur"
                />
            </Link>
            <div className="font-semibold text-center text-xl mb-1">
                {title}
            </div>
            <div className="text-md text-center mb-4">{subtitle}</div>
            <Button href={href}>{btnLabel}</Button>
        </div>
    );
};

export default Card;
