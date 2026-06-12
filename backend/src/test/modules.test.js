import { describe, it, expect } from 'vitest';

describe('All backend modules load without errors', () => {
  const modules = [
    ['../../config/supabase', 'supabase'],
    ['../../util/cache', 'cache'],
    ['../../util/logger', 'logger'],
    ['../../middleware/authMiddleware', 'authMiddleware'],
    ['../../middleware/optionalAuthMiddleware', 'optionalAuthMiddleware'],
    ['../../middleware/isAdmin', 'isAdmin'],
    ['../../middleware/roleMiddleware', 'roleMiddleware'],
    ['../../controllers/leaderboardController', 'leaderboardController'],
    ['../../controllers/notificationController', 'notificationController'],
    ['../../controllers/googleAuthController', 'googleAuthController'],
    ['../../controllers/progressController', 'progressController'],
    ['../../controllers/problemController', 'problemController'],
    ['../../controllers/predictionController', 'predictionController'],
    ['../../controllers/adminController', 'adminController'],
    ['../../controllers/statsController', 'statsController'],
    ['../../controllers/subscriptionController', 'subscriptionController'],
    ['../../controllers/courseController', 'courseController'],
    ['../../controllers/courseChallengeController', 'courseChallengeController'],
    ['../../controllers/chatController', 'chatController'],
    ['../../controllers/certificateController', 'certificateController'],
    ['../../controllers/authSessionController', 'authSessionController'],
    ['../../controllers/practiceProblemController', 'practiceProblemController'],
    ['../../routes/communityRoutes', 'communityRoutes'],
    ['../../routes/notificationRoutes', 'notificationRoutes'],
    ['../../routes/testRoutes', 'testRoutes'],
    ['../../routes/progressRoutes', 'progressRoutes'],
    ['../../util/testRunner', 'testRunner'],
    ['../../util/codeRunner', 'codeRunner'],
    ['../../util/notificationService', 'notificationService'],
    ['../../util/notificationSender', 'notificationSender'],
  ];

  for (const [modulePath, name] of modules) {
    it(`${name} loads without error`, async () => {
      const mod = await import(modulePath);
      expect(mod).toBeDefined();
    });
  }
});
