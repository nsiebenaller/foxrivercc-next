import path from "path";
import fs from "fs";
import { parse } from "csv-parse";
import { MembershipType, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const mergedCSV = path.join(__dirname, "./frcc_members.csv");
const columns = [
  "LAST NAME",
  "FIRST NAME",
  "adult/child",
  "Mailing Address",
  "City",
  "ST",
  "Zip",
  "Home Phone",
  "Mobile Phone",
  "Email",
];

type CSVRow = {
  "LAST NAME": string;
  "FIRST NAME": string;
  "adult/child": string;
  "Mailing Address": string;
  City: string;
  ST: string;
  Zip: string;
  "Home Phone": string;
  "Mobile Phone": string;
  Email: string;
  "Year Joined": string;
  "Member/Friend": string;
};

async function main() {
  console.log("parsing...");

  await clean();
  const csv = await parseCSV<CSVRow>(mergedCSV);
  await createFamilies(csv);
  await createFamilyContacts(csv);
  await createFamilyMembers(csv);
}

main();

async function createFamilyMembers(csv: CSVRow[]) {
  csv.forEach(async (row) => {
    const familyId = await findFamilyIdByLastName(row["LAST NAME"]);
    if (!familyId) {
      console.log(`⚠️ Could not find family ID for ${row["LAST NAME"]}`);
      return;
    }
    await prisma.familyMember.create({
      data: {
        firstName: row["FIRST NAME"],
        membershipType: getMembershipType(row),
        yearJoined: Number(row["Year Joined"]) || undefined,
        email: row.Email,
        mobilePhone: row["Mobile Phone"],
        familyId,
      },
    });
  });
}

async function createFamilyContacts(csv: CSVRow[]) {
  const families = getUniqueFamilies(csv);
  return Promise.all(
    families.map(async (row) => {
      if (!row["Mailing Address"] || !row.City || !row.ST || !row.Zip) return;
      const familyId = await findFamilyIdByLastName(row["LAST NAME"]);
      if (!familyId) {
        console.log(`⚠️ Could not find family ID for ${row["LAST NAME"]}`);
        return;
      }
      return prisma.family.update({
        data: {
          contact: {
            create: {
              address: row["Mailing Address"],
              city: row.City,
              state: row.ST,
              zipcode: Number(row.Zip),
            },
          },
        },
        where: {
          id: familyId,
        },
      });
    })
  );
}

async function createFamilies(csv: CSVRow[]) {
  // get unique families
  const families: Record<string, Prisma.FamilyCreateInput> = {};
  csv.forEach((row) => {
    families[row["LAST NAME"]] = {
      lastName: row["LAST NAME"],
      homePhone: row["Home Phone"],
    };
  });

  // create all families
  return prisma.family.createMany({ data: Object.values(families) });
}

async function findFamilyIdByLastName(lastName: string) {
  return (
    await prisma.family.findFirst({
      select: { id: true },
      where: { lastName },
    })
  )?.id;
}

function getUniqueFamilies(csv: CSVRow[]) {
  const families: Record<string, CSVRow> = {};
  csv.forEach((row) => {
    families[row["LAST NAME"]] = row;
  });
  return Object.values(families);
}

function getMembershipType(row: CSVRow): MembershipType {
  if (row["adult/child"] === "child") return "YOUTH";
  if (row["adult/child"] === "adult") {
    if (row["Member/Friend"] === "member") return "MEMBER";
    if (row["Member/Friend"] === "founding member") return "FOUNDING_MEMBER";
    return "MEMBER";
  }
  return "MEMBER";
}

async function parseCSV<T = any>(path: string): Promise<T[]> {
  return new Promise((resolve) => {
    const csv = fs.readFileSync(path);
    parse(
      csv,
      { delimiter: ",", columns, from_line: 2 },
      (err, result: T[]) => {
        if (err) throw new Error(err.message);
        resolve(result);
      }
    );
  });
}

async function clean() {
  await prisma.$transaction([
    prisma.family.deleteMany(),
    prisma.familyMember.deleteMany(),
    prisma.contact.deleteMany(),
  ]);
}
