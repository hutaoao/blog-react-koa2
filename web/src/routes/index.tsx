import routes from './routes';
import {ConfigProvider} from 'antd';
import NotFind from '../pages/404';
import PrivateRoute from "./PrivateRoute";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const index = () => {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <PrivateRoute>
          <Switch>
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
                                  console.log(cItem)
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
            <Route component={NotFind}/>
          </Switch>
        </PrivateRoute>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default index;
