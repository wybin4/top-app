import { API } from '@component/helpers/api';
import { firstLevelMenu } from '@component/helpers/helpers';
import { MenuItem } from '@component/interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '@component/interfaces/page.interface';
import { ProductModel } from '@component/interfaces/product.interface';
import { withLayout } from '@component/layout/Layout';
import { TopPageComponent } from '@component/page-components';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {

	return (
		<TopPageComponent
			firstCategory={firstCategory}
			page={page}
			products={products}
		/>
	)
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: m._id
		});
		paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
	}

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		}
	}
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		}
	}
	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: firstCategoryItem._id
		});
		if (menu.length == 0) {
			return {
				notFound: true
			}
		}
		const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
		const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
			category: page.category,
			limit: 10
		});

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem._id,
				page,
				products
			}
		}
	} catch {
		return {
			notFound: true
		}
	}
}

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: TopLevelCategory,
	page: TopPageModel;
	products: ProductModel[];
}