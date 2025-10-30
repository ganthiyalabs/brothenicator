import { relations } from "drizzle-orm";
import { usersTable } from "./users";
import { twoFactorSecretsTable } from "./twoFactorSecrets";
import { recoveryCodesTable } from "./recoveryCodes";

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  twoFactorSecret: one(twoFactorSecretsTable, {
    fields: [usersTable.user_id],
    references: [twoFactorSecretsTable.user_id],
  }),
  recoveryCodes: many(recoveryCodesTable),
}));

export const twoFactorSecretsRelations = relations(twoFactorSecretsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [twoFactorSecretsTable.user_id],
    references: [usersTable.user_id],
  }),
}));

export const recoveryCodesRelations = relations(recoveryCodesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [recoveryCodesTable.user_id],
    references: [usersTable.user_id],
  }),
}));

export * from "./users";
export * from "./twoFactorSecrets";
export * from "./recoveryCodes";
