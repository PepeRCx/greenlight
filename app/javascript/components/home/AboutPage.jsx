// tim-ai open source conferencing system - http://www.bigbluebutton.org/.
//
// Copyright (c) 2022 tim-ai Inc. and by respective authors (see below).
//
// This program is free software; you can redistribute it and/or modify it under the
// terms of the GNU Lesser General Public License as published by the Free Software
// Foundation; either version 3.0 of the License, or (at your option) any later
// version.
//
// Greenlight is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License along
// with Greenlight; if not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import {
  Col, Row, Container, Button, Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  GlobeAltIcon,
  MicrophoneIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

function FeatureSection({
  icon, title, description, features, reversed,
}) {
  const content = (
    <>
      <Col lg={6} className={`mb-4 mb-lg-0 ${reversed ? 'order-lg-2' : ''}`}>
        <div className="about-feature-icon mb-4">
          {icon}
        </div>
        <h3 className="fw-bold mb-3">{title}</h3>
        <p className="text-muted mb-4">{description}</p>
        {features && (
          <ul className="feature-list list-unstyled">
            {features.map((feature, index) => (
              <li key={index} className="d-flex align-items-start mb-2">
                <CheckCircleIcon className="hi-s text-success me-2 flex-shrink-0 mt-1" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </Col>
      <Col lg={6} className={`d-flex align-items-center justify-content-center ${reversed ? 'order-lg-1' : ''}`}>
        <div className="about-feature-visual">
          <div className="visual-circle visual-circle-1"></div>
          <div className="visual-circle visual-circle-2"></div>
          <div className="visual-icon-container">
            {icon}
          </div>
        </div>
      </Col>
    </>
  );

  return (
    <Row className="align-items-center py-5">
      {content}
    </Row>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <section className="about-hero-section py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">{t('about.title')}</h1>
              <p className="lead text-muted mb-0">{t('about.subtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="mission-card border-0 p-4 p-md-5">
                <Card.Body className="text-center">
                  <h2 className="fw-bold mb-4">{t('about.mission_title')}</h2>
                  <p className="lead text-muted mb-0">
                    {t('about.mission_description')}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="about-features-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">{t('about.features_title')}</h2>
          </div>

          <FeatureSection
            icon={<GlobeAltIcon className="hi-xl" />}
            title={t('about.translation_feature_title')}
            description={t('about.translation_feature_description')}
            features={[
              'Support for 50+ languages',
              'Real-time message translation',
              'Automatic language detection',
              'High accuracy AI models',
            ]}
          />

          <hr className="my-4" />

          <FeatureSection
            icon={<MicrophoneIcon className="hi-xl" />}
            title={t('about.voice_feature_title')}
            description={t('about.voice_feature_description')}
            features={[
              'Near-zero latency translation',
              'Natural voice synthesis',
              'Preserves speaker tone and intent',
              'Works with any accent',
            ]}
            reversed
          />

          <hr className="my-4" />

          <FeatureSection
            icon={<UserGroupIcon className="hi-xl" />}
            title={t('about.collaboration_feature_title')}
            description={t('about.collaboration_feature_description')}
            features={[
              'HD screen sharing',
              'Interactive whiteboards',
              'File sharing and annotations',
              'Breakout rooms',
            ]}
          />

          <hr className="my-4" />

          <FeatureSection
            icon={<ShieldCheckIcon className="hi-xl" />}
            title={t('about.security_feature_title')}
            description={t('about.security_feature_description')}
            features={[
              'End-to-end encryption',
              'SOC 2 compliance',
              'GDPR compliant',
              'Role-based access control',
            ]}
            reversed
          />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section py-5 mb-4">
        <Container>
          <Card className="cta-card border-0 p-4 p-md-5 text-center">
            <Card.Body>
              <h2 className="fw-bold mb-3">{t('about.cta_title')}</h2>
              <p className="text-muted mb-4 lead">
                {t('about.cta_description')}
              </p>
              <Link to="/signup">
                <Button className="btn-brand btn-lg px-5">
                  {t('about.cta_button')}
                  <ArrowRightIcon className="hi-s ms-2" />
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
}
