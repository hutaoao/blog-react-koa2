import routes from './routes';
import Store from '../stores';
import {ConfigProvider} from 'antd';
import NotFind from '../pages/404';
import {Provider} from "mobx-react";
import PrivateRoute from "./PrivateRoute";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const index = () => {
  return (
    <Provider {...Store}>
      <ConfigProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute>
              {
                routes.map((item: any, index: number) => {
                  if (item.children && item.children.length > 0) {
                    return (
                      <Route
                        key={`item${index}`}
                        path={item.path}
                        component={(router: any) => {
                          return (
                            <item.component>
                              <Switch>
                                {
                                  item.children.map((cItem: any, cIndex: number) => {
                                    return (
                                      <Route
                                        exact
                                        key={`cItem${cIndex}`}
                                        path={`${item.path}${cItem.path}`}
                                        component={cItem.component}
                                      />
                                    )
                                  })
                                }
                                <Route component={NotFind}/>
                              </Switch>
                            </item.component>
                          )
                        }}/>
                    )
                  } else {
                    return (
                      <Route
                        exact
                        key={`item${index}`}
                        path={item.path}
                        component={item.component}
                      />
                    )
                  }
                })
              }
            </PrivateRoute>
            {/*<Route component={NotFind}/>*/}
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  )
}

export default index;
