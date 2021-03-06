export function getStartingPositionX(
  osRef: HTMLDivElement | null,
  projectData: Project
) {
  if (!osRef) {
    return 0;
  }
  return Math.round(
    Math.random() *
      (osRef.clientWidth - (projectData.osSettings?.windowSize.w || 0))
  );
}

export function getStartingPositionY(
  osRef: HTMLDivElement | null,
  projectData: Project
) {
  if (!osRef) {
    return 0;
  }
  const OFFSET = 420; // not sure why this exists
  const TASKBAR_HEIGHT = 42;
  return (
    Math.round(
      Math.random() *
        (osRef.clientHeight -
          TASKBAR_HEIGHT -
          (projectData.osSettings?.windowSize.h || 0))
    ) - OFFSET
  );
}
