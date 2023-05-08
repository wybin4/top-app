import { Htag } from '@component/components';
import { withLayout } from '@component/layout/Layout';

export function Error500(): JSX.Element {
	return (
		<>
			<Htag tag='h1'>Ошибка 500</Htag>
		</>
	);
}

export default withLayout(Error500);