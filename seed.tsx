import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
    const res = await prisma.user.create({
        data: {
            name: "kanghunz",
            account: "kbank01",
            xkey: "111222333444555666777888999xxx",
            hmac: "mUnI9oURFYom05qWNkdKSwpQbPMd2AYTXcgJng2bd38",
            line_access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2MWRmOTA4Yi0yMWNmLTQ4NmYtOTkyOS05YjRmOWVhNTI3MzQiLCJhdWQiOiJMSU5FIiwiaWF0IjoxNzU2OTg1MzA3LCJleHAiOjE3NTc1OTAxMDcsInNjcCI6IkxJTkVfQ09SRSIsInJ0aWQiOiIxNzkzMzM3YS0yODk2LTQ2NGQtOGYyYy03MTJhMTNhYWE0NzUiLCJyZXhwIjoxNzg4NTIxMzA3LCJ2ZXIiOiIzLjEiLCJhaWQiOiJ1ZmEyZDk5NTQwYjgwYTZiYTEwZGMwYWQ0NjY2MjRkMmIiLCJsc2lkIjoiMDFhNTkwMzItNTczMC00NDNiLThjMDMtZGMzYzQzOTBkNGMzIiwiZGlkIjoiTk9ORSIsImN0eXBlIjoiQ0hST01FT1MiLCJjbW9kZSI6IlNFQ09OREFSWSIsImNpZCI6IjAzMDAwMDAwMDAifQ.CQV4M6bhGhxmxZGTA3tFBczjrAIzK3lS3R3zxsf1ieA",
            body_token: "UhtGarPE25BUuiorh3UnzO1ATI6kNy1PJIhciE587DBg"
        }
    })
}