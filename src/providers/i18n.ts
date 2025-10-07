import type { I18nProvider } from "@refinedev/core";

const messages: Record<string, string> = {
  // Change this value to update the Logout label across Refine UI
  "buttons.logout": "Se déconnecter",
};

export const i18nProvider: I18nProvider = {
  translate: (key, options, defaultMessage) => {
    if (key in messages) return messages[key];
    // Fallback to provided default message or the key itself
    return typeof defaultMessage === "string" && defaultMessage.length > 0
      ? defaultMessage
      : key;
  },
  changeLocale: () => Promise.resolve(),
  getLocale: () => "en",
};
