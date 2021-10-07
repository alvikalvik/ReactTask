import Header from '../../components/Header/Header';
import Container from '../../components/Container/Container';
import PropTypes from 'prop-types';

function HeaderWrapper({ theme, onToggleTheme }) {
  return (
    <Container>
      <Header onToggleTheme={'12345'} />
    </Container>
  );
}

HeaderWrapper.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func
};

export default HeaderWrapper;
