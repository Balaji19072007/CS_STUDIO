import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { SkeletonDashboard } from '../components/common/SkeletonLoader';
import { NotFoundPage } from '../components/common/ErrorPages';

// Dynamic map of route slugs to component files
const ROADMAP_COMPONENTS = {
  'c-programming': lazy(() => import('./roadmaps/CProgrammingRoadmap.jsx')),
  'python-programming': lazy(() => import('./roadmaps/PythonProgrammingRoadmap.jsx')),
  'java-programming': lazy(() => import('./roadmaps/JavaProgrammingRoadmap.jsx')),
  
  'frontend-development': lazy(() => import('./roadmaps/FrontendDevelopmentRoadmap.jsx')),
  'backend-development': lazy(() => import('./roadmaps/BackendDevelopmentRoadmap.jsx')),
  'database-development': lazy(() => import('./roadmaps/DataModelingRoadmap.jsx')),
  'deployment-development': lazy(() => import('./roadmaps/DeploymentDevOpsRoadmap.jsx')),
  'fullstack-development': lazy(() => import('./roadmaps/FullStackIntegrationRoadmap.jsx')),
  
  'android-development': lazy(() => import('./roadmaps/NativeAndroidDevelopmentRoadmap.jsx')),
  'ios-development': lazy(() => import('./roadmaps/NativeIOSDevelopmentRoadmap.jsx')),
  'cross-development': lazy(() => import('./roadmaps/CrossPlatformMobileDevelopmentRoadmap.jsx')),
  'backend-apis-mobile-development': lazy(() => import('./roadmaps/BackendAPIsForMobileDevelopmentRoadmap.jsx')),
  'publishing-mobile-development': lazy(() => import('./roadmaps/MobileAppPublishingMaintenanceRoadmap.jsx')),
  
  'cyber-security-foundations': lazy(() => import('./roadmaps/CyberSecurityFoundationsRoadmap.jsx')),
  'cyber-security-defensive': lazy(() => import('./roadmaps/DefensiveSecurityRoadmap.jsx')),
  'cyber-security-webapp': lazy(() => import('./roadmaps/WebAppSecurityRoadmap.jsx')),
  'cyber-security-offensive': lazy(() => import('./roadmaps/OffensiveSecurityRoadmap.jsx')),
  'cyber-security-forensics': lazy(() => import('./roadmaps/ForensicsIncidentResponseRoadmap.jsx')),
  
  'devops-fundamentals': lazy(() => import('./roadmaps/DevOpsCICDRoadmap.jsx')),
  'devops-container': lazy(() => import('./roadmaps/ContainerizationRoadmap.jsx')),
  'devops-orchestration': lazy(() => import('./roadmaps/OrchestrationInfrastructureRoadmap.jsx')),
  'devops-observability': lazy(() => import('./roadmaps/ObservabilityReliabilityRoadmap.jsx')),
  
  'ai-ml-math': lazy(() => import('./roadmaps/AIMathFundamentalsRoadmap.jsx')),
  'ai-ml-core': lazy(() => import('./roadmaps/CoreMLAlgorithmsRoadmap.jsx')),
  'ai-ml-deeplearning': lazy(() => import('./roadmaps/DeepLearningRoadmap.jsx')),
  'ai-ml-production': lazy(() => import('./roadmaps/ProductionMLOpsRoadmap.jsx')),
  
  'data-science-python': lazy(() => import('./roadmaps/DataSciencePythonStatsRoadmap.jsx')),
  'data-science-wrangling': lazy(() => import('./roadmaps/DataWranglingRoadmap.jsx')),
  'data-science-modeling': lazy(() => import('./roadmaps/DataScienceModelingRoadmap.jsx')),
  'data-science-bigdata': lazy(() => import('./roadmaps/DataScienceRoadmap.jsx')),
};

const RoadmapRouter = () => {
    const { roadmapSlug } = useParams();
    const RoadmapComponent = ROADMAP_COMPONENTS[roadmapSlug];

    if (!RoadmapComponent) {
        return <NotFoundPage />;
    }

    return (
        <Suspense fallback={<SkeletonDashboard />}>
            <RoadmapComponent />
        </Suspense>
    );
};

export default RoadmapRouter;
