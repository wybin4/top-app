import { Htag } from '@component/components';
import { withLayout } from '@component/layout/Layout';

export function Error404(): JSX.Element {
	return (
		<>
			<Htag tag='h1'>Ошибка 404</Htag>
		</>
	);
}

export default withLayout(Error404);