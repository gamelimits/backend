import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

/**
 * Database tables
 */
export interface Database {
  readonly minecraft__seasons: MinecraftSeasonsTable;
  readonly minecraft__players: MinecraftPlayersTable;
  readonly minecraft__stats: MinecraftStatsTable;
  readonly minecraft__advancements: MinecraftAdvancementsTable;
}

/**
 * Utility types
 */
export type Id = Generated<string>;
export type CreatedAt = ColumnType<Date, Date | undefined, never>;
export type UpdatedAt = ColumnType<Date, Date | undefined, Date | undefined>;

/**
 * Module: minecraft
 */
export interface MinecraftSeasonsTable {
  readonly id: Id;
  readonly name: string;
  readonly startedAt: Date;
  readonly endedAt: Date | null;
  readonly createdAt: CreatedAt;
  readonly updatedAt: UpdatedAt;
}

export type MinecraftSeason = Selectable<MinecraftSeasonsTable>;
export type NewMinecraftSeason = Insertable<MinecraftSeasonsTable>;
export type MinecraftSeasonUpdate = Updateable<MinecraftSeasonsTable>;

export interface MinecraftPlayersTable {
  readonly id: Id;
  readonly name: string | null;
  readonly minecraftId: string;
  readonly createdAt: CreatedAt;
  readonly updatedAt: UpdatedAt;
}

export type MinecraftPlayer = Selectable<MinecraftPlayersTable>;
export type NewMinecraftPlayer = Insertable<MinecraftPlayersTable>;
export type MinecraftPlayerUpdate = Updateable<MinecraftPlayersTable>;

export interface MinecraftStatsTable {
  readonly id: Id;
  readonly minecraftSeasonId: string;
  readonly minecraftPlayerId: string;
  readonly category: string;
  readonly stat: string;
  readonly value: number;
  readonly createdAt: CreatedAt;
}

export type MinecraftStat = Selectable<MinecraftStatsTable>;
export type NewMinecraftStat = Insertable<MinecraftStatsTable>;
export type MinecraftStatUpdate = Updateable<MinecraftStatsTable>;

export interface MinecraftAdvancementsTable {
  readonly id: Id;
  readonly minecraftSeasonId: string;
  readonly minecraftPlayerId: string;
  readonly advancement: string;
  readonly createdAt: CreatedAt;
}

export type MinecraftAdvancement = Selectable<MinecraftAdvancementsTable>;
export type NewMinecraftAdvancement = Insertable<MinecraftAdvancementsTable>;
export type MinecraftAdvancementUpdate = Updateable<MinecraftAdvancementsTable>;
