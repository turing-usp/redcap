import fs from "fs"
import parse from "csv-parser"
import { Disease } from "../interfaces";
import { finished } from "stream/promises";

const redcapCsvPath = process.env.CSV_PATH;

const readCsvRedcap = async (path: string) => {
    const records: Disease[] = []
    const parser = fs
    .createReadStream(path)
    .pipe(parse());
    parser.on('readable', function(){
      let record;
      while (record = parser.read()) {
        // Work with each record
        records.push(record)
      }
    });
    await finished(parser);
    return records
  }
  

let cache = null;
export const getAllredcap = async () => {
    if (cache == null) {
        cache = await readCsvRedcap(redcapCsvPath);
    }
    return cache;
}