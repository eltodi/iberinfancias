import { createClient } from "@libsql/client/web";
import { getConfig } from "./helpers/getconfig";

const config = getConfig()

export const turso = createClient({
   url: "libsql://iberinfancias-eliast.aws-eu-west-1.turso.io",
   authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDgwMjQyODMsImlkIjoiNjdiMDViYjQtMzI5OC00NTg1LWI5NDAtNzgwZTc1YzIxODk3IiwicmlkIjoiMmY2NDljYTAtNjE2Zi00MWJlLWI2ODgtYmUxYTIyYTZmNTZlIn0.MxqmblfaU5DE5hZzozY0cNyshkGSAsGCOgfRdnRo7GTZ7H3kCCScYFzU__qxuViHv8znPAvDUIfudRrae19gBw"
});