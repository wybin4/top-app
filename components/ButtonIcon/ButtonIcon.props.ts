import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import cross from './cross.svg';
import menu from './menu.svg';
import up from './up.svg';

export const icons = {
	up,
	cross,
	menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconName;
	appearance: 'primary' | 'white';
}