// Registration Configuration
// Each event has its own dedicated Google Form

// Event-specific Google Form URLs mapping
export const EVENT_FORM_URLS: Record<string, string> = {
  "Solo Dance": "https://docs.google.com/forms/d/1gxqO64E7Hwq7GeBFVrnDkCn9xHGNxVl2sDTCTILsbOs/viewform",
  "Duet Dance": "https://docs.google.com/forms/d/1k4iryLZak30sQZs_5BandIbDtaBGR03BTWegJZ2h8V8/viewform",
  "Group Dance": "https://docs.google.com/forms/d/1m7CTXLQXLpJuS5S2BqLTvzOiBUpp6CiovSzqUFRXmA4/viewform",
  "Solo Singing": "https://docs.google.com/forms/d/1myOsJhmbv121q3BTHkdiNlwhXrkTtw5LAA7_q_Fb7Lk/viewform",
  "Duet Singing": "https://docs.google.com/forms/d/1dP_MK3Q-KzrlT33zDHYjY3oHXknoFZ9MmCz3iDzXxVg/viewform",
  "Fashion Show": "https://docs.google.com/forms/d/1DXLwMkoiEGmBP_4u6WmLKtsUQ-wUEUktaR1M1ixR-mU/viewform",
  "Antakshari": "https://docs.google.com/forms/d/1qPMUY_DKvUDeNbEfvBGO8b4JMaoJnT5fcZabkaMQ360/viewform",
  "Treasure Hunt": "https://docs.google.com/forms/d/1Nm3yptfjoso4LY3OpK4ilBO_wWVIMxEFCTC_Ogkb2Q0/viewform",
  "Attire Spectra": "https://docs.google.com/forms/d/1pBhIlnVMWXSIFcFdVW-ptNOxXLT6G_9ldY9brBjH6k4/viewform",
  "Short Film Competition": "https://docs.google.com/forms/d/13mFTlq2YiK-yXmwtwkyz4Nmw0pswJfyZn_mNnpCP1cI/viewform",
  "Mono Act": "https://docs.google.com/forms/d/19tUS3but__E_JR8eHEbLBGNu2yMLtV_h3LVMpczctxc/viewform",
  "Story Telling": "https://docs.google.com/forms/d/13JO3NV_GYjpKqLdEQ_tSaYiuUG4duucK0O5rpyd65F8/viewform",
  "Poem Recitation": "https://docs.google.com/forms/d/1a8DHsPrSYoAhu66H2hy_BlyXjieatbqTRmdWRFZissI/viewform",
  "Stand-Up Comedy": "https://docs.google.com/forms/d/1vXMqHHtYrLl2A0QuogO1d9Vs1Yt9hL7TNuGl9kaRaAk/viewform",
  "Sketching": "https://docs.google.com/forms/d/1uGOYJvKslU4v2CcX0vVeUaAK-qY_PVGNPk0aDzZbJW8/viewform",
  "Mandala Art": "https://docs.google.com/forms/d/1xmnaBImEPRxKfc8QBw4rjR9Kc98Y-E3UI2VdvIsZcl8/viewform",
  "Rangoli": "https://docs.google.com/forms/d/1RnbUondt5X6GnOcGSShEq3tge6FuBM4YP29pPWBVTZ8/viewform",
  "Reelography": "https://docs.google.com/forms/d/1tJTSB-949OWUkWOHO8cjITGyqPJTxUgWe1XOZZFrz0I/viewform",
  "Rose Day": "https://docs.google.com/forms/d/1jSjHa8rA27SvQO51Yw3LO2aPdRG68H6KjBDMtIWqucs/viewform",
  "Dramatics / Skit": "https://docs.google.com/forms/d/13mFTlq2YiK-yXmwtwkyz4Nmw0pswJfyZn_mNnpCP1cI/viewform",
  "Swarsandhya": "https://docs.google.com/forms/d/1vXMqHHtYrLl2A0QuogO1d9Vs1Yt9hL7TNuGl9kaRaAk/viewform",
};

// Fallback registration form URL (not currently used since each event has its own form)
export const REGISTRATION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSftHLRaTIjjOEK2PD02j9yfXdlx0SOdCDL4w-RMEvWsJGQuBQ/viewform";

// Set to true to use Google Form, false to use built-in registration
export const USE_GOOGLE_FORM = true;

// Helper function to get the registration URL for a specific event
export function getRegistrationURL(eventName: string): string {
  // Return event-specific form URL if available
  const eventFormURL = EVENT_FORM_URLS[eventName];
  if (eventFormURL) {
    return eventFormURL;
  }
  
  // Fallback to default form (should not happen with proper configuration)
  console.warn(`No registration form found for event: ${eventName}`);
  return REGISTRATION_FORM_URL;
}
