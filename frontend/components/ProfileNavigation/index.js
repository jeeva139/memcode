import { AuthenticationActions } from '~/reducers/Authentication';
import { orFalse } from '~/services/orFalse';

import { Link } from 'react-router';
import css from './index.css';

@connect(
  (state) => ({
    currentUser: state.global.Authentication.currentUser || false
  }),
  (dispatch) => ({
    signOut: () => AuthenticationActions.signOut(dispatch)
  })
)
class ProfileNavigation extends React.Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
    currentUser: orFalse(PropTypes.object).isRequired
  }

  render = () => (
    this.props.currentUser ?
      <nav className={css.nav}>
        <div className="container">
          <section className="links">
            <Link
              to="/courses"
              activeClassName="active"
            >All courses</Link>
            <Link
              to="/profile/learning"
              activeClassName="active"
            >I'm learning</Link>
            <Link
              to="/profile/created"
              activeClassName="active"
            >I created</Link>
          </section>

          <section className="settings standard-tooltip">
            <span className="toggler">
              <i className="fa fa-cog"/>
            </span>
            <div className="modal -standard-tooltip-list">
              <a onClick={this.props.signOut}>Sign Out</a>
            </div>
          </section>
        </div>
      </nav> :
      null
  )
}

export { ProfileNavigation };
