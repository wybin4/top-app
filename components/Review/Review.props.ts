import { ReviewModel } from '@component/interfaces/product.interface';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	review: ReviewModel;
}