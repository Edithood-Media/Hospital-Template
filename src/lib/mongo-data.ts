/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, ObjectId, type Collection, type Document, type Filter, type Sort } from "mongodb";

type ModelName = "adminUser" | "appointment" | "blogPost" | "service" | "facility" | "staffProfile";

type FindOptions = {
  where?: Record<string, unknown>;
  orderBy?: Record<string, "asc" | "desc"> | Array<Record<string, "asc" | "desc">>;
  take?: number;
  select?: Record<string, boolean>;
  distinct?: string[];
};

type WriteOptions = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

const collectionNames: Record<ModelName, string> = {
  adminUser: "AdminUser",
  appointment: "Appointment",
  blogPost: "BlogPost",
  service: "Service",
  facility: "Facility",
  staffProfile: "StaffProfile",
};

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? "mongodb://127.0.0.1:27017/shree-shivaya-hospital";
}

function getDatabaseName() {
  const url = new URL(getDatabaseUrl());
  return url.pathname.replace(/^\//, "") || "shree-shivaya-hospital";
}

const mongoClient = globalForMongo.mongoClient ?? new MongoClient(getDatabaseUrl());

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

function collection(model: ModelName): Collection {
  return mongoClient.db(getDatabaseName()).collection(collectionNames[model]);
}

function createModel(model: ModelName) {
  return {
    async findMany(options: FindOptions = {}): Promise<any[]> {
      if (options.distinct?.length === 1) {
        const key = options.distinct[0];
        const values = await collection(model).distinct(key, toMongoFilter(options.where));
        return values.sort().map((value) => ({ [key]: value }));
      }

      let cursor = collection(model).find(toMongoFilter(options.where), { projection: toProjection(options.select) });
      const sort = toSort(options.orderBy);
      if (sort) cursor = cursor.sort(sort);
      if (options.take) cursor = cursor.limit(options.take);
      return (await cursor.toArray()).map(fromMongoDocument);
    },

    async findUnique(options: { where: Record<string, unknown> }): Promise<any | null> {
      const document = await collection(model).findOne(toMongoFilter(options.where));
      return document ? fromMongoDocument(document) : null;
    },

    async findFirst(options: FindOptions = {}): Promise<any | null> {
      const rows = await this.findMany({ ...options, take: 1 });
      return rows[0] ?? null;
    },

    async count(options: { where?: Record<string, unknown> } = {}) {
      return collection(model).countDocuments(toMongoFilter(options.where));
    },

    async create(options: WriteOptions): Promise<any> {
      const data = withDefaults(model, options.data as Record<string, unknown>, true);
      const result = await collection(model).insertOne(data);
      return fromMongoDocument({ ...data, _id: result.insertedId });
    },

    async createMany(options: WriteOptions) {
      const rows = Array.isArray(options.data) ? options.data : [options.data];
      if (rows.length === 0) return { count: 0 };
      await collection(model).insertMany(rows.map((row) => withDefaults(model, row, true)));
      return { count: rows.length };
    },

    async update(options: { where: Record<string, unknown>; data: Record<string, unknown> }): Promise<any | null> {
      const data = withDefaults(model, options.data, false);
      await collection(model).updateOne(toMongoFilter(options.where), { $set: data });
      const document = await collection(model).findOne(toMongoFilter(options.where));
      return document ? fromMongoDocument(document) : null;
    },

    async delete(options: { where: Record<string, unknown> }): Promise<any | null> {
      const document = await collection(model).findOne(toMongoFilter(options.where));
      await collection(model).deleteOne(toMongoFilter(options.where));
      return document ? fromMongoDocument(document) : null;
    },
  };
}

export const prisma = {
  adminUser: createModel("adminUser"),
  appointment: createModel("appointment"),
  blogPost: createModel("blogPost"),
  service: createModel("service"),
  facility: createModel("facility"),
  staffProfile: createModel("staffProfile"),
};

export async function closeMongoConnection() {
  await mongoClient.close();
  if (globalForMongo.mongoClient === mongoClient) {
    globalForMongo.mongoClient = undefined;
  }
}

export async function ensureMongoIndexes() {
  await Promise.all([
    collection("adminUser").createIndex({ email: 1 }, { unique: true, name: "AdminUser_email_key" }),
    collection("blogPost").createIndex({ slug: 1 }, { unique: true, name: "BlogPost_slug_key" }),
    collection("appointment").createIndex({ status: 1 }, { name: "Appointment_status_idx" }),
    collection("appointment").createIndex({ department: 1 }, { name: "Appointment_department_idx" }),
    collection("appointment").createIndex({ preferredDate: 1 }, { name: "Appointment_preferredDate_idx" }),
    collection("blogPost").createIndex({ status: 1 }, { name: "BlogPost_status_idx" }),
    collection("blogPost").createIndex({ category: 1 }, { name: "BlogPost_category_idx" }),
    collection("blogPost").createIndex({ publishedAt: 1 }, { name: "BlogPost_publishedAt_idx" }),
    collection("service").createIndex({ isVisible: 1 }, { name: "Service_isVisible_idx" }),
    collection("service").createIndex({ sortOrder: 1 }, { name: "Service_sortOrder_idx" }),
    collection("facility").createIndex({ isVisible: 1 }, { name: "Facility_isVisible_idx" }),
    collection("facility").createIndex({ sortOrder: 1 }, { name: "Facility_sortOrder_idx" }),
    collection("staffProfile").createIndex({ isVisible: 1 }, { name: "StaffProfile_isVisible_idx" }),
    collection("staffProfile").createIndex({ sortOrder: 1 }, { name: "StaffProfile_sortOrder_idx" }),
  ]);
}

function toMongoFilter(where: Record<string, unknown> | undefined): Filter<Document> {
  if (!where) return {};
  const filter: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(where)) {
    if (value === undefined) continue;
    if (key === "OR" && Array.isArray(value)) {
      filter.$or = value.map((item) => toMongoFilter(item as Record<string, unknown>));
      continue;
    }

    if (isContainsFilter(value)) {
      filter[key] = { $regex: escapeRegex(value.contains), $options: "i" };
      continue;
    }

    filter[key === "id" ? "_id" : key] = key === "id" && typeof value === "string" && ObjectId.isValid(value)
      ? new ObjectId(value)
      : value;
  }

  return filter;
}

function toSort(orderBy: FindOptions["orderBy"]): Sort | undefined {
  if (!orderBy) return undefined;
  const entries = Array.isArray(orderBy) ? orderBy.flatMap((item) => Object.entries(item)) : Object.entries(orderBy);
  return Object.fromEntries(entries.map(([key, value]) => [key === "id" ? "_id" : key, value === "asc" ? 1 : -1]));
}

function toProjection(select: FindOptions["select"]) {
  if (!select) return undefined;
  const projection: Record<string, 1> = {};
  for (const [key, enabled] of Object.entries(select)) {
    if (enabled) projection[key === "id" ? "_id" : key] = 1;
  }
  return projection;
}

function withDefaults(model: ModelName, input: Record<string, unknown>, isCreate: boolean) {
  const now = new Date();
  const data = cleanUndefined({ ...input });

  if (isCreate) {
    data.createdAt ??= now;
    data.updatedAt ??= now;
  } else {
    data.updatedAt = now;
  }

  if (isCreate && model === "appointment") data.status ??= "NEW";
  if (isCreate && model === "blogPost") {
    data.status ??= "DRAFT";
    data.authorDisplayName ??= "Shree Shivaya Hospital";
  }
  if (isCreate && model === "service") {
    data.iconKey ??= "clinic";
    data.sortOrder ??= 0;
    data.isVisible ??= true;
  }
  if (isCreate && model === "facility") {
    data.iconKey ??= "hospital";
    data.sortOrder ??= 0;
    data.isVisible ??= true;
  }
  if (isCreate && model === "staffProfile") {
    data.sortOrder ??= 0;
    data.isVisible ??= true;
  }

  return data;
}

function fromMongoDocument(document: Document) {
  const { _id, ...rest } = document;
  return { id: String(_id), ...rest };
}

function cleanUndefined(input: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
}

function isContainsFilter(value: unknown): value is { contains: string } {
  return typeof value === "object" && value !== null && "contains" in value && typeof (value as { contains?: unknown }).contains === "string";
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
