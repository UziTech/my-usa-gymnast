import React, { useState } from 'react';
import {
	SanctionRefreshes,
} from "./types";

export const AppContext = React.createContext<[SanctionRefreshes, (r: (p: SanctionRefreshes) => SanctionRefreshes) => void]>([{}, () => {}]);

export function AppContextProvider(props: React.PropsWithChildren) {
  const [state, setState] = useState<SanctionRefreshes>({});
  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
}
