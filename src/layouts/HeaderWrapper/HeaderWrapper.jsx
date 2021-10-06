import Header from '../../components/Header/Header';
import Container from '../../components/Container/Container';

function HeaderWrapper({ theme, onToggleTheme }) {
  return (
    <Container>
      <Header onToggleTheme={'123'} />
    </Container>
  );
}

export default HeaderWrapper;
