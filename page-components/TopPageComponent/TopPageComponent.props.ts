import { TopLevelCategory, TopPageModel } from '@component/interfaces/page.interface';
import { ProductModel } from '@component/interfaces/product.interface';

export interface TopPageComponentProps {
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}