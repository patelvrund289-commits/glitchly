import { pgTable, text, integer, timestamp, jsonb, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  points: integer('points').notNull().default(10),
  wins: integer('wins').notNull().default(0),
  losses: integer('losses').notNull().default(0),
  draws: integer('draws').notNull().default(0),
  role: text('role').notNull().default('player'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const matches = pgTable('matches', {
  id: uuid('id').primaryKey().defaultRandom(),
  player1Id: uuid('player1_id').notNull().references(() => users.id),
  player2Id: uuid('player2_id').notNull().references(() => users.id),
  board: jsonb('board').notNull().$type<(string | null)[]>(),
  currentPlayer: text('current_player').notNull(), // 'X' or 'O'
  status: text('status').notNull(), // 'active' or 'finished'
  winner: text('winner'), // 'X', 'O', or null
  result: text('result'), // 'win', 'loss', 'draw' from perspective of player1
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const adminLogs = pgTable('admin_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  adminId: uuid('admin_id').notNull().references(() => users.id),
  playerId: uuid('player_id').notNull().references(() => users.id),
  pointsChanged: integer('points_changed').notNull(),
  reason: text('reason').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
