import { MenuItem } from '@component/interfaces/menu.interface';
import { TopLevelCategory } from '@component/interfaces/page.interface';
import { PropsWithChildren, ReactNode, createContext, useState } from 'react';
export interface IAppContext {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	setMenu?: (newMenu: MenuItem[]) => void;

}
export const AppContext = createContext<IAppContext>({ menu: [], firstCategory: TopLevelCategory.Courses });

export const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setMenuState] = useState<MenuItem[]>(menu);

	const setMenu = (newMenu: MenuItem[]) => {
		setMenuState(newMenu);
	}

	return <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
		{children}
	</AppContext.Provider>
}