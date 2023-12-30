
    import * as ReactDOMClient from "react-dom/client";
    
    import { History, createBrowserHistory, createMemoryHistory } from "history";
    
    import App from "./App";
    import { Provider } from "react-redux";
    import React from "react";
    import store from "./redux/store";
    import { BrowserRouter } from 'react-router-dom';
    
    interface MountOptions {
      onNavigate?: (location: any) => void;
      defaultHistory?: History;
      initialPath?: string;
    }
    
    interface MountReturn {
      onParentNavigate: ({ pathname }: { pathname: string }) => void;
    }
    
    // Mount function to start up the app
    const mount = (
      el: HTMLElement,
      { onNavigate, defaultHistory, initialPath }: MountOptions
    ): MountReturn => {
      const history =
        defaultHistory ||
        createMemoryHistory({ initialEntries: [initialPath || ""] });
    
      if (onNavigate) {
        history.listen(onNavigate);
      }
    
      const root = ReactDOMClient.createRoot(el);
      root.render(
        <Provider store={store}>
          <BrowserRouter>
            <App history={history} />
          </BrowserRouter>
        </Provider>
      );
    
      return {
        onParentNavigate({ pathname: nextPathname }) {
          const { pathname } = history.location;
    
          if (pathname !== nextPathname) {
            history.push(nextPathname);
          }
        },
      };
    };
    
    // If we are in development and in isolation,
    // call mount immediately
    if (process.env.NODE_ENV === "development") {
      const devRoot = document.querySelector(
        "#_zosor-root"
      ) as HTMLElement | null;
    
      if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
      }
    }
    
    // We are running through container
    // and we should export the mount function
    export { mount };
    
          