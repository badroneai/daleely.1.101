// Analytics events tracking (lightweight, privacy-focused)

export type AnalyticsEvent =
  | "tool_open"
  | "start_training"
  | "answer_correct"
  | "answer_wrong"
  | "sound_toggle"
  | "session_complete"
  | "page_leave_early"
  | "worksheet_generated"
  | "worksheet_printed"
  | "worksheet_downloaded";

interface EventData {
  [key: string]: string | number | boolean;
}

export function trackEvent(event: AnalyticsEvent, data?: EventData) {
  // In production, this would send to your analytics service
  // For now, we'll just log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("Analytics Event:", event, data);
  }

  // Example: Send to analytics service
  // if (typeof window !== "undefined" && window.gtag) {
  //   window.gtag("event", event, data);
  // }
}

export function trackPageLeaveEarly() {
  if (typeof window !== "undefined") {
    let startTime = Date.now();
    let hasTracked = false;

    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime;
      if (timeSpent < 10000 && !hasTracked) {
        // Less than 10 seconds
        trackEvent("page_leave_early", { timeSpent });
        hasTracked = true;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup after 10 seconds
    setTimeout(() => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }, 10000);
  }
}
