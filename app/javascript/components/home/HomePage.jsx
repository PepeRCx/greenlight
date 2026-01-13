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

import React, { useEffect } from 'react';
import {
  Col, Row, Container, Button, Card,
} from 'react-bootstrap';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  GlobeAltIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/auth/AuthProvider';
import useRoomConfigValue from '../../hooks/queries/rooms/useRoomConfigValue';
import useEnv from '../../hooks/queries/env/useEnv';

function FeatureCard({ icon, title, description, highlighted }) {
  return (
    <Card className={`h-100 border-0 feature-card ${highlighted ? 'feature-card-highlighted' : ''}`}>
      <Card.Body className="p-4 d-flex flex-column">
        <div className={`feature-icon-wrapper mb-3 ${highlighted ? 'highlighted' : ''}`}>
          {icon}
        </div>
        <Card.Title className="fw-bold mb-2">{title}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const currentUser = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('success');
  const { data: recordValue } = useRoomConfigValue('record');
  const { data: env } = useEnv();

  // Redirects the user to the proper page based on signed in status and CreateRoom permission
  useEffect(
    () => {
      // Todo: Use PermissionChecker.
      if (!currentUser.stateChanging && currentUser.signed_in && currentUser.permissions.CreateRoom === 'true') {
        navigate('/rooms');
      } else if (!currentUser.stateChanging && currentUser.signed_in && currentUser.permissions.CreateRoom === 'false') {
        navigate('/home');
      }
    },
    [currentUser.signed_in],
  );

  useEffect(() => {
    switch (success) {
      case 'LogoutSuccessful':
        toast.success(t('toast.success.session.signed_out'));
        break;
      default:
    }
    if (success) { setSearchParams(searchParams.delete('success')); }
  }, [success]);

  useEffect(() => {
    switch (error) {
      case 'InviteInvalid':
        toast.error(t('toast.error.users.invalid_invite'));
        break;
      case 'SignupError':
        toast.error(t('toast.error.users.signup_error'));
        break;
      case 'BannedUser':
        toast.error(t('toast.error.users.banned'));
        break;
      default:
    }
    if (error) { setSearchParams(searchParams.delete('error')); }
  }, [error]);

  // useEffect for inviteToken
  useEffect(
    () => {
      const inviteToken = searchParams.get('inviteToken');

      // Environment settings not loaded
      if (!env) {
        return;
      }

      if (inviteToken && env?.EXTERNAL_AUTH) {
        const signInForm = document.querySelector('form[action="/auth/openid_connect"]');
        signInForm.submit();
      } else if (inviteToken && !env?.EXTERNAL_AUTH) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach((button) => {
          if (button.textContent === 'Sign Up') {
            button.click();
          }
        });
      }
    },
    [searchParams, env],
  );

  return (
    <div className="homepage-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-50 py-5">
            <Col lg={7} className="text-center text-lg-start">
              <div className="hero-badge mb-3">
                <SparklesIcon className="hi-xs me-1" />
                <span>AI-Powered Translation</span>
              </div>
              <h1 className="hero-title display-4 fw-bold mb-4">
                {t('homepage.welcome_title')}
              </h1>
              <p className="hero-subtitle lead text-muted mb-4">
                {t('homepage.welcome_subtitle')}
              </p>
              <div className="hero-buttons d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Link to="/signup">
                  <Button className="btn-brand btn-lg px-4 py-2">
                    {t('homepage.hero_cta')}
                    <ArrowRightIcon className="hi-s ms-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline-secondary" className="btn-lg px-4 py-2">
                    {t('homepage.hero_secondary_cta')}
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={5} className="d-none d-lg-flex justify-content-center mt-5 mt-lg-0">
              <div className="hero-visual">
                <div className="hero-circle hero-circle-1"></div>
                <div className="hero-circle hero-circle-2"></div>
                <div className="hero-circle hero-circle-3"></div>
                <div className="hero-icon-container">
                  <GlobeAltIcon className="hero-main-icon" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-4">
        <Container>
          <Row className="justify-content-center">
            <Col xs={6} md={4} lg={3} className="text-center stats-item">
              <div className="stats-number">50+</div>
              <div className="stats-label text-muted">{t('homepage.stats_languages')}</div>
            </Col>
            <Col xs={6} md={4} lg={3} className="text-center stats-item">
              <div className="stats-number">99.9%</div>
              <div className="stats-label text-muted">Uptime</div>
            </Col>
            <Col xs={6} md={4} lg={3} className="text-center stats-item">
              <div className="stats-number">&lt;1s</div>
              <div className="stats-label text-muted">Translation Latency</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">{t('homepage.explore_features')}</h2>
            <p className="text-muted lead">Powerful features designed for modern teams</p>
          </div>

          {/* Highlighted Translation Features */}
          <Row className="g-4 mb-4">
            <Col md={6}>
              <FeatureCard
                icon={<GlobeAltIcon className="hi-l text-white" />}
                title={t('homepage.translation_title')}
                description={t('homepage.translation_description')}
                highlighted
              />
            </Col>
            <Col md={6}>
              <FeatureCard
                icon={<MicrophoneIcon className="hi-l text-white" />}
                title={t('homepage.voice_translation_title')}
                description={t('homepage.voice_translation_description')}
                highlighted
              />
            </Col>
          </Row>

          {/* Other Features Grid */}
          <Row className="g-4">
            <Col md={6} lg={4}>
              <FeatureCard
                icon={<VideoCameraIcon className="hi-m" />}
                title={t('homepage.meeting_title')}
                description={t('homepage.meeting_description')}
              />
            </Col>
            {(recordValue !== 'false') && (
              <Col md={6} lg={4}>
                <FeatureCard
                  icon={<SparklesIcon className="hi-m" />}
                  title={t('homepage.recording_title')}
                  description={t('homepage.recording_description')}
                />
              </Col>
            )}
            <Col md={6} lg={4}>
              <FeatureCard
                icon={<Cog8ToothIcon className="hi-m" />}
                title={t('homepage.settings_title')}
                description={t('homepage.settings_description')}
              />
            </Col>
            <Col md={6} lg={4}>
              <FeatureCard
                icon={<UserGroupIcon className="hi-m" />}
                title={t('homepage.collaboration_title')}
                description={t('homepage.collaboration_description')}
              />
            </Col>
            <Col md={6} lg={4}>
              <FeatureCard
                icon={<ShieldCheckIcon className="hi-m" />}
                title={t('homepage.security_title')}
                description={t('homepage.security_description')}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 mb-4">
        <Container>
          <Card className="cta-card border-0 p-4 p-md-5 text-center">
            <Card.Body>
              <h2 className="fw-bold mb-3">Ready to get started?</h2>
              <p className="text-muted mb-4 lead">
                Join teams worldwide who are breaking down language barriers.
              </p>
              <Link to="/signup">
                <Button className="btn-brand btn-lg px-5">
                  Create Free Account
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
}
