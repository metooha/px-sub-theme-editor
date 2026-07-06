import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "../components/ui/Button";
import { IconButton } from "../components/ui/IconButton";
import { MastHead } from "../components/ui/MastHead";
import { AppSidebar } from "../components/ui/AppSidebar";
import { ArrowLeft, Home } from "../components/icons";
import styles from "@/styles/notFound.module.css";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('pages');
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname,
      );
    }
  }, [location.pathname]);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.root}>
      <MastHead />

      <div className={styles.appRow}>
        <AppSidebar />

        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.errorCode}>{t('notFound.errorCode')}</div>
            <h1 className={styles.heading}>{t('notFound.heading')}</h1>
            <p className={styles.description}>
              {t('notFound.description')}
            </p>
            <div className={styles.pathInfo}>{location.pathname}</div>
            <div className={styles.actions}>
              <Button
                variant="secondary"
                size="large"
                onClick={handleGoBack}
              >
                <ArrowLeft style={{ width: 20, height: 20, marginRight: 8 }} />
                {t('notFound.goBack')}
              </Button>
              <IconButton
                aria-label={t('notFound.goHome')}
                variant="primary"
                size="large"
                onClick={handleGoHome}
              >
                <Home style={{ width: 24, height: 24 }} />
              </IconButton>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
