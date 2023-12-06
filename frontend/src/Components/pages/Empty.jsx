import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navigation from '../../Navigation';
import routes from '../../routes';
import empty from '../../assets/404.png';

const EmptyPage = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <Navigation />
      <div className="text-center">
        <img src={empty} alt={t('emptyPage.emptyPage')} className="img-fluid" id="error" />
        <h1 className="h4 text-muted">{t('notFound')}</h1>
        <p className="text-muted">
          {t('returnToHome')}
          {' '}
          <Link to={routes.home()}>{t('toMain')}</Link>
        </p>
      </div>
    </>
  );
};

export default EmptyPage;
