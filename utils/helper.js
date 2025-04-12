export const showToast = (
  message,
  duration = 'SHORT',
  gravity = 'BOTTOM',
  delay = 0, // Time to wait before showing the toast (in milliseconds)
  dismissAfter = 0, // Time to show the toast before dismissing (in milliseconds)
) => {
  const toastDuration =
    duration === 'LONG' ? ToastAndroid.LONG : ToastAndroid.SHORT;
  const toastGravity =
    gravity === 'TOP'
      ? ToastAndroid.TOP
      : gravity === 'CENTER'
      ? ToastAndroid.CENTER
      : ToastAndroid.BOTTOM;

  // Delay logic: Set a timeout before showing the toast
  setTimeout(() => {
    ToastAndroid.showWithGravity(message, toastDuration, toastGravity);

    // If dismissAfter is provided, set a timeout to dismiss the toast
    if (dismissAfter > 0) {
      setTimeout(() => {
        // React Native ToastAndroid doesn't have a dismiss method.
        // This block is here just to handle timing if needed.
      }, dismissAfter);
    }
  }, delay);
};

export function isValidJSON(text) {
  if (typeof text !== 'string') {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}
