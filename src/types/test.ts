import { Test } from "@prisma/client";

export type TestInsert = Omit<Test, "id">;