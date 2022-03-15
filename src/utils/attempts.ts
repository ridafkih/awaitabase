/**
 * Closure function that tracks attempts information.
 * @param max The maximum number of attempts.
 * @param attempts The starter number of attempts, defaults to 0.
 * @returns Support functions to extract, or manipulate the closure state.
 */
export const makeAttemptsTracker = (max: number, attempts: number = 0) => {
  const markAttempt = () => attempts++;
  const getAttemptsData = () => ({
    attempts,
    max,
    display: [attempts, max].join("/"),
  });

  return { markAttempt, getAttemptsData };
};
