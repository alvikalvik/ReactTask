import { Route, Switch } from 'react-router';
import { LOCATIONS_PAGE_LINK } from '../../constants/constants';
import LocationWeatherContainer from '../../containers/LocationWeatherContainer';

function Main() {
  return (
    <Switch>
      <Route exact path="/">
        <LocationWeatherContainer />
      </Route>

      {/* <Route exact path={ABOUT_US_PAGE_LINK}>
      <About />
    </Route> */}
      {/* <Route exact path={LOCATIONS_PAGE_LINK}>
      <LocationWeatherContainer />
    </Route> */}
      <Route exact path={`${LOCATIONS_PAGE_LINK}`}>
        <div>123</div>
        {/* <LocationWeatherContainer /> */}
      </Route>
      <Route path={`${LOCATIONS_PAGE_LINK}/:id`}>
        <LocationWeatherContainer />
      </Route>
    </Switch>
  );
}

export default Main;
