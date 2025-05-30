import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  log: () => {},
  migrationsTable: "pgmigrations",
};

async function listPandingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const pandingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
    });
    return pandingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  listPandingMigrations,
  runPendingMigrations,
};

export default migrator;
