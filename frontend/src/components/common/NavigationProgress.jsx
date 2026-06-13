import { useNavigationProgress } from '../../hooks/useNavigationProgress.jsx';

export default function NavigationProgress() {
  const { isNavigating } = useNavigationProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none"
      style={{
        opacity: isNavigating ? 1 : 0,
        transition: 'opacity 300ms ease',
      }}
    >
      <div className="h-full w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 progress-indeterminate" />
    </div>
  );
}
