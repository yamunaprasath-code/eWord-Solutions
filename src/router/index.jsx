import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const HomePage                 = lazy(() => import('@/pages/HomePage'));
const AboutPage                = lazy(() => import('@/pages/AboutPage'));
const ServicesPage             = lazy(() => import('@/pages/ServicesPage'));
const RecordsRetrievalPage     = lazy(() => import('@/pages/services/RecordsRetrievalPage'));
const EOfficeWorkflowPage      = lazy(() => import('@/pages/services/EOfficeWorkflowPage'));
const MedicalRecordsReviewPage = lazy(() => import('@/pages/services/MedicalRecordsReviewPage'));
const DictationTranscriptionPage = lazy(() => import('@/pages/services/DictationTranscriptionPage'));
const BlogPage                 = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage             = lazy(() => import('@/pages/BlogPostPage'));
const ResourcesPage            = lazy(() => import('@/pages/ResourcesPage'));
const ContactPage              = lazy(() => import('@/pages/ContactPage'));

function PageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-8 h-8 rounded-full border-4 border-brand-200 border-t-brand-500 animate-spin" />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter basename="/eWord-Solutions/">
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route path={ROUTES.HOME}                       element={<HomePage />} />
          <Route path={ROUTES.ABOUT}                      element={<AboutPage />} />
          <Route path={ROUTES.SERVICES}                   element={<ServicesPage />} />
          <Route path={ROUTES.SERVICES_RECORDS}           element={<RecordsRetrievalPage />} />
          <Route path={ROUTES.SERVICES_EWORKFLOW}         element={<EOfficeWorkflowPage />} />
          <Route path={ROUTES.SERVICES_MEDICAL_REVIEW}    element={<MedicalRecordsReviewPage />} />
          <Route path={ROUTES.SERVICES_DICTATION}         element={<DictationTranscriptionPage />} />
          <Route path={ROUTES.BLOG}                       element={<BlogPage />} />
          <Route path={ROUTES.BLOG_POST}                  element={<BlogPostPage />} />
          <Route path={ROUTES.RESOURCES}                  element={<ResourcesPage />} />
          <Route path={ROUTES.CONTACT}                    element={<ContactPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
