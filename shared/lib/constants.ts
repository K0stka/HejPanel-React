export const userTypes = ["user", "admin", "super-admin"] as const;

export const panelTypes = ["text", "image", "video"] as const;

export const activityTypes = ["admin:accept", "admin:reject", "message", "user:request:addPanel", "admin:addPanel", "user:request:changeTime", "admin:changeTime", "user:request:changeContent", "admin:changeContent"] as const;

export const themes = ["normal", "dark", "light"] as const;
