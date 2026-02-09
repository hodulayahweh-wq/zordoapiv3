import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "q parametresi gerekli" });
  }

  const filePath = path.join(process.cwd(), "veri.txt");
  const lines = fs.readFileSync(filePath, "utf8").split("\n");

  const found = lines.find(line => line.startsWith(q + "|"));

  if (!found) {
    return res.status(404).json({ error: "Veri bulunamadı" });
  }

  const [kod, ad, sehir] = found.split("|");

  return res.status(200).json({
    kod,
    ad,
    sehir
  });
}
