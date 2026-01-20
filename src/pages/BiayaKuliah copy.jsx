import React, { useMemo, useState } from "react";
import { rawDataBiayaProdi } from "../data/biayaProdi";

function formatIDR(n) {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `Rp ${Number(n || 0).toLocaleString("id-ID")}`;
  }
}

function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-neutral-100 text-neutral-700 border-neutral-200",
    green: "bg-emerald-100 text-emerald-800 border-emerald-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] ${tones[tone]}`}>
      {children}
    </span>
  );
}

function StatCard({ label, value, note, tone = "neutral" }) {
  const toneRing = {
    neutral: "ring-neutral-200",
    green: "ring-emerald-200",
    amber: "ring-amber-200",
    slate: "ring-slate-200",
  };
  return (
    <div className={`rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ${toneRing[tone]}`}>
      <div className="text-xs font-semibold text-neutral-600">{label}</div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
      {note ? <div className="mt-2 text-xs text-neutral-500">{note}</div> : null}
    </div>
  );
}

function sumBreakdown(items) {
  return (items || []).reduce((acc, x) => acc + (Number(x?.nominal) || 0), 0);
}

function normalizeProdiData(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((p) => {
      const semesters = Array.isArray(p.semesters) ? p.semesters : [];
      const sorted = [...semesters].sort((a, b) => (a?.semester || 0) - (b?.semester || 0));
      return {
        fakultas: String(p.fakultas || ""),
        prodi: String(p.prodi || ""),
        catatan: String(p.catatan || ""),
        semesters: sorted.map((s) => ({
          semester: Number(s.semester || 0),
          cicilan1: Number(s.cicilan1 || 0),
          cicilan2: Number(s.cicilan2 || 0),
          rincianC1: Array.isArray(s.rincianC1) ? s.rincianC1 : [],
          rincianC2: Array.isArray(s.rincianC2) ? s.rincianC2 : [],
        })),
      };
    })
    .filter((p) => p.fakultas && p.prodi);
}

export default function HalamanDetailBiaya() {
  const rawDataContoh = rawDataBiayaProdi;

  const prodiData = useMemo(() => normalizeProdiData(rawDataContoh), [rawDataContoh]);

  const [selectedKey, setSelectedKey] = useState(`${prodiData[0]?.fakultas}|${prodiData[0]?.prodi}`);
  const [semester, setSemester] = useState(1);
  const [showRincian, setShowRincian] = useState(true);
  const [mode, setMode] = useState("detail"); // (3) mode ringkas vs detail

  const selected = useMemo(() => {
    const [fak, pr] = String(selectedKey || "").split("|");
    return prodiData.find((p) => p.fakultas === fak && p.prodi === pr) || prodiData[0];
  }, [prodiData, selectedKey]);

  const s = useMemo(() => {
    const found = selected?.semesters?.find((x) => x.semester === semester);
    return found || selected?.semesters?.[0];
  }, [selected, semester]);

  const totalSemester = (s?.cicilan1 || 0) + (s?.cicilan2 || 0);

  //tambahan
  const isSemester1 = (s?.semester || semester) === 1;

  const labelCicilan1 = isSemester1
    ? "Bayar Saat Daftar Ulang"
    : "Bayar di Awal Semester";

  const descCicilan1 = isSemester1
    ? "Nominal minimum yang dibayar saat daftar ulang (registrasi awal)."
    : "Nominal yang dibayar di awal untuk memulai semester berjalan.";

  const descRingkasCicilan1 = isSemester1
    ? "Bayar Saat Daftar Ulang (Cicilan 1). Detail pelunasan & rincian komponen tersedia di halaman ini."
    : "Pembayaran awal semester berjalan (Cicilan 1). Sisa pembayaran ditampilkan sebagai pelunasan.";

  const totalC1ByBreakdown = sumBreakdown(s?.rincianC1);
  const totalC2ByBreakdown = sumBreakdown(s?.rincianC2);

  const breakdownMismatch =
    (s?.rincianC1?.length ? totalC1ByBreakdown !== (s?.cicilan1 || 0) : false) ||
    (s?.rincianC2?.length ? totalC2ByBreakdown !== (s?.cicilan2 || 0) : false);

  const semesterOptions = useMemo(() => {
    const nums = (selected?.semesters || []).map((x) => x.semester).filter(Boolean);
    const uniq = Array.from(new Set(nums)).sort((a, b) => a - b);
    return uniq.length ? uniq : [1, 2, 3, 4, 5, 6, 7, 8];
  }, [selected]);

  const groupedProdi = useMemo(() => {
    const map = {};
    prodiData.forEach((p) => {
      if (!map[p.fakultas]) map[p.fakultas] = [];
      map[p.fakultas].push(p);
    });
    return map;
  }, [prodiData]);

  return (
    // <div className="min-h-screen bg-neutral-50 text-neutral-900">
    //   <div className="mx-auto max-w-6xl px-6 py-10">
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600">
                <span className="h-2 w-2 rounded-full bg-neutral-300" />
                Detail Biaya • Skema 1 Semester = 2 Tahap
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">Detail Biaya Pendidikan (S1)</h1>
              {/* <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
              Halaman ini menampilkan 3 label baku: <b>Bayar Saat Daftar Ulang (Cicilan 1)</b>, <b>Pelunasan Semester (Cicilan 2)</b>, dan <b>Total Biaya Semester</b>.
            </p> */}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="green">Cicilan 1 = Bayar Awal</Badge>
              <Badge tone="amber">Cicilan 2 = Pelunasan</Badge>
              <Badge tone="slate">Total = Cicilan 1 + Cicilan 2</Badge>
            </div>
          </header>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="inline-flex rounded-2xl border border-neutral-200 bg-white p-1 shadow-sm">
              {[{ k: "detail", label: "Mode Detail" }, { k: "ringkas", label: "Mode Ringkas" }].map((x) => (
                <button
                  key={x.k}
                  onClick={() => setMode(x.k)}
                  className={
                    "rounded-xl px-4 py-2 text-sm font-semibold transition " +
                    (mode === x.k ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50")
                  }
                >
                  {x.label}
                </button>
              ))}
            </div>
            {/* <div className="text-xs text-neutral-500">Tip: Mode Ringkas cocok untuk halaman utama PMB.</div> */}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold text-neutral-600">Pilih Program Studi</div>
              {/* <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
              >
                {prodiData.map((p) => (
                  <option key={`${p.fakultas}|${p.prodi}`} value={`${p.fakultas}|${p.prodi}`}>
                    S1 - {p.prodi}
                  </option>
                ))}
              </select> */}
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
              >
                {Object.entries(groupedProdi).map(([fakultas, listProdi]) => (
                  <optgroup key={fakultas} label={fakultas}>
                    {listProdi.map((p) => (
                      <option
                        key={`${p.fakultas}|${p.prodi}`}
                        value={`${p.fakultas}|${p.prodi}`}
                      >
                        S1 - {p.prodi}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {/* <div className="mt-2 text-xs text-neutral-500">Data contoh. Untuk produksi: ambil dari JSON hasil sheet.</div> */}
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold text-neutral-600">Pilih Semester</div>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
              >
                {semesterOptions.map((n) => (
                  <option key={n} value={n}>
                    Semester {n}
                  </option>
                ))}
              </select>
              {/* <div className="mt-2 text-xs text-neutral-500">Sudah mendukung Semester 1–8.</div> */}
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold text-neutral-600">Tampilan</div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-neutral-800">Tampilkan rincian komponen</div>
                <button
                  onClick={() => setShowRincian((v) => !v)}
                  className={
                    "rounded-full border px-3 py-2 text-xs font-semibold " +
                    (showRincian
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-white border-neutral-200 text-neutral-700")
                  }
                >
                  {showRincian ? "ON" : "OFF"}
                </button>
              </div>
              {/* <div className="mt-2 text-xs text-neutral-500">Untuk FAQ, biasanya ON. Untuk ringkas, OFF.</div> */}
            </div>
          </div>

          <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard
              tone="green"
              // label="Bayar Saat Daftar Ulang (Cicilan 1)"
              label={`${labelCicilan1} (Cicilan 1)`}
              value={formatIDR(s?.cicilan1 || 0)}
              note={descCicilan1}
            />
            <StatCard
              tone="amber"
              label="Pelunasan Semester (Cicilan 2)"
              value={formatIDR(s?.cicilan2 || 0)}
              note="Sisa kewajiban semester berjalan, dibayar sesuai jadwal ketentuan PMB."
            />
            <StatCard
              tone="slate"
              label="Total Biaya Semester (Cicilan 1 + Cicilan 2)"
              value={formatIDR(totalSemester)}
              note="Total kewajiban untuk 1 semester, dibayarkan dalam 2 tahap."
            />
          </section>

          {breakdownMismatch ? (
            <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="font-extrabold">Perhatian: Total rincian ≠ angka cicilan</div>
              <div className="mt-1 text-xs text-amber-800">
                Ini indikator data belum lengkap/terbaca sempurna. (Normal saat masih pakai data contoh / parsing belum final.)
              </div>
            </div>
          ) : null}

          <section className="mt-6 rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <div className="p-5 sm:p-6 border-b border-neutral-200">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight">
                    {selected?.fakultas} — {selected?.prodi}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600">Semester {s?.semester || semester} • Skema pembayaran 2 tahap</p>
                </div>
                <div className="text-xs text-neutral-500 sm:text-left">{selected?.catatan}</div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {mode === "ringkas" ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                    <div className="text-xs font-semibold text-neutral-600">Yang perlu disiapkan sekarang</div>
                    <div className="mt-2 text-2xl font-extrabold">{formatIDR(s?.cicilan1 || 0)}</div>
                    {/* <div className="mt-2 text-xs text-neutral-600">
                      Bayar Saat Daftar Ulang (Cicilan 1). Detail pelunasan & rincian komponen tersedia di halaman ini.
                    </div> */}
                    <div className="mt-2 text-xs text-neutral-600">
                      {descRingkasCicilan1}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                    <div className="text-xs font-semibold text-neutral-600">Pelunasan nanti</div>
                    <div className="mt-2 text-2xl font-extrabold">{formatIDR(s?.cicilan2 || 0)}</div>
                    <div className="mt-2 text-xs text-neutral-600">Pelunasan Semester (Cicilan 2) sesuai jadwal ketentuan PMB.</div>
                  </div>
                  {/* <div className="sm:col-span-2 rounded-3xl border border-neutral-200 bg-white p-5">
                    <div className="text-sm font-extrabold">Catatan Transparansi</div>
                    <div className="mt-1 text-sm text-neutral-600">
                      Total biaya semester adalah <b>{formatIDR(totalSemester)}</b> (dibayarkan dalam 2 tahap). Untuk brosur/iklan biasanya hanya ditampilkan
                      <b> cicilan 1</b> agar fokus ke uang minimum saat daftar ulang.
                    </div>
                  </div> */}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold text-neutral-600">Cicilan 1</div>
                        {/* <div className="mt-1 text-base font-extrabold">Bayar Saat Daftar Ulang</div> */}
                        <div className="mt-1 text-base font-extrabold">{labelCicilan1}</div>
                      </div>
                      <Badge tone="green">{formatIDR(s?.cicilan1 || 0)}</Badge>
                    </div>

                    {showRincian ? (
                      <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
                        <table className="min-w-[420px] w-full">
                          <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500">
                              <th className="px-4 py-3">Komponen</th>
                              <th className="px-4 py-3 text-right">Nominal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(s?.rincianC1 || []).map((x) => (
                              <tr key={x.komponen} className="border-t border-neutral-200">
                                <td className="px-4 py-3 text-sm text-neutral-800">{x.komponen}</td>
                                <td className="px-4 py-3 text-sm text-right font-semibold">{formatIDR(x.nominal)}</td>
                              </tr>
                            ))}
                            <tr className="border-t border-neutral-200 bg-neutral-50">
                              <td className="px-4 py-3 text-sm font-bold">Total rincian</td>
                              <td className="px-4 py-3 text-sm text-right font-extrabold">{formatIDR(totalC1ByBreakdown)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="mt-4 text-xs text-neutral-600">Rincian komponen disembunyikan. Aktifkan toggle untuk melihat detail.</div>
                    )}
                  </div>

                  <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold text-neutral-600">Cicilan 2</div>
                        <div className="mt-1 text-base font-extrabold">Pelunasan Semester</div>
                      </div>
                      <Badge tone="amber">{formatIDR(s?.cicilan2 || 0)}</Badge>
                    </div>

                    {showRincian ? (
                      <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
                        <table className="min-w-[420px] w-full">
                          <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500">
                              <th className="px-4 py-3">Komponen</th>
                              <th className="px-4 py-3 text-right">Nominal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(s?.rincianC2 || []).map((x) => (
                              <tr key={x.komponen} className="border-t border-neutral-200">
                                <td className="px-4 py-3 text-sm text-neutral-800">{x.komponen}</td>
                                <td className="px-4 py-3 text-sm text-right font-semibold">{formatIDR(x.nominal)}</td>
                              </tr>
                            ))}
                            <tr className="border-t border-neutral-200 bg-neutral-50">
                              <td className="px-4 py-3 text-sm font-bold">Total rincian</td>
                              <td className="px-4 py-3 text-sm text-right font-extrabold">{formatIDR(totalC2ByBreakdown)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="mt-4 text-xs text-neutral-600">Rincian komponen disembunyikan. Aktifkan toggle untuk melihat detail.</div>
                    )}
                  </div>

                  {/* <div className="sm:col-span-2 mt-2 rounded-3xl border border-neutral-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-extrabold">FAQ Singkat</div>
                        <div className="mt-1 text-sm text-neutral-600">
                          Kenapa brosur hanya menampilkan cicilan 1? Karena itu adalah <b>uang minimum</b> untuk daftar ulang.
                          Rincian cicilan 2 & total semester ditampilkan di halaman detail ini untuk transparansi.
                        </div>
                      </div>
                      <div className="hidden sm:block text-xs text-neutral-500 text-right">
                        <div className="font-semibold">Butuh bantuan?</div>
                        <div>WA PMB: 08xxxxxxxx</div>
                      </div>
                    </div>
                  </div> */}

                </div>
              )}
            </div>
          </section>

          {/* <footer className="mt-8 text-xs text-neutral-500">
          <div className="flex flex-col gap-1">
            <div>ℹ️ UI ini siap untuk data real dari sheet (via JSON/API). Saat data real masuk, contoh angka/pola di atas otomatis tergantikan.</div>
            <div>ℹ️ Best practice: brosur/iklan tampilkan Cicilan 1; website tampilkan Cicilan 1 + Cicilan 2 + total semester.</div>
          </div>
        </footer> */}

        </div>
      </main>
      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-slate-500">
          <div className="font-semibold text-slate-700">
            Penerimaan Mahasiswa Baru – Universitas Pasundan
          </div>
          <div>© 2026 Universitas Pasundan. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
