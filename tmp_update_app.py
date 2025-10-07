from pathlib import Path
path = Path("src/App.tsx")
text = path.read_text()
old = "                    <Route path=\"/blood_bank\">\n                      <Route index element={<BloodBank />} />\n                      <Route path=\"new\" element={<BloodBankCreate />} />\n                    </Route>"
new = "                    <Route path=\"/blood_bank\">\n                      <Route index element={<BloodBank />} />\n                      <Route path=\"new\" element={<BloodBankCreate />} />\n                      <Route path=\":id/edit\" element={<BloodBankEdit />} />\n                    </Route>"
if old not in text:
    raise SystemExit("pattern not found")
path.write_text(text.replace(old, new))
