import React, { useMemo, useState, useRef, useEffect } from "react";
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

// function normalizeProdiData(raw) {
//   if (!Array.isArray(raw)) return [];
//   return raw
//     .map((p) => {
//       const semesters = Array.isArray(p.semesters) ? p.semesters : [];
//       const sorted = [...semesters].sort((a, b) => (a?.semester || 0) - (b?.semester || 0));
//       return {
//         fakultas: String(p.fakultas || ""),
//         prodi: String(p.prodi || ""),
//         catatan: String(p.catatan || ""),
//         isKedokteran: Boolean(p.isKedokteran),
//         semesters: sorted.map((s) => ({
//           semester: Number(s.semester || 0),
//           cicilan1: Number(s.cicilan1 || 0),
//           cicilan2: Number(s.cicilan2 || 0),
//           rincianC1: Array.isArray(s.rincianC1) ? s.rincianC1 : [],
//           rincianC2: Array.isArray(s.rincianC2) ? s.rincianC2 : [],
//         })),
//       };
//     })
//     .filter((p) => p.fakultas && p.prodi);
// }

function normalizeProdiData(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((p) => {
      const isKedokteran = Boolean(p.isKedokteran);

      if (isKedokteran && p.gelombang) {
        return {
          ...p,
          fakultas: String(p.fakultas || ""),
          prodi: String(p.prodi || ""),
          catatan: String(p.catatan || ""),
          isKedokteran: true,
        };
      }

      const semesters = Array.isArray(p.semesters) ? p.semesters : [];
      const sorted = [...semesters].sort((a, b) => (a?.semester || 0) - (b?.semester || 0));

      return {
        fakultas: String(p.fakultas || ""),
        prodi: String(p.prodi || ""),
        catatan: String(p.catatan || ""),
        isKedokteran: false,
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
  const [gelombang, setGelombang] = useState(1);
  const [showRincian, setShowRincian] = useState(true);
  const [mode, setMode] = useState("detail"); // (3) mode ringkas vs detail
  const [openProdi, setOpenProdi] = useState(false);
  const [searchProdi, setSearchProdi] = useState("");
  const prodiRef = useRef(null);

  const selected = useMemo(() => {
    const [fak, pr] = String(selectedKey || "").split("|");
    return prodiData.find((p) => p.fakultas === fak && p.prodi === pr) || prodiData[0];
  }, [prodiData, selectedKey]);

  const isKedokteran = !!selected?.isKedokteran;

  const sourceSemesters = isKedokteran
    ? selected?.gelombang?.[gelombang]?.semesters
    : selected?.semesters;

  // const s = useMemo(() => {
  //   const found = selected?.semesters?.find((x) => x.semester === semester);
  //   return found || selected?.semesters?.[0];
  // }, [selected, semester]);

  const s = useMemo(() => {
    const found = sourceSemesters?.find((x) => x.semester === semester);
    return found || sourceSemesters?.[0];
  }, [sourceSemesters, semester]);

  const totalSemester = (s?.cicilan1 || 0) + (s?.cicilan2 || 0);

  //tambahan
  const isSemester1 = (s?.semester || semester) === 1;

  const currentSemester = s?.semester || semester;

  // Kedok semester 2 dan ke atas = single card
  const isKedokSingleStage = isKedokteran && (s?.semester || semester) >= 2;
  // Khusus pembeda judul
  const isKedokSemester2 = isKedokteran && currentSemester === 2;
  const isKedokSemester3Up = isKedokteran && currentSemester >= 3

  // const labelCicilan1 = isSemester1
  //   ? "Bayar Saat Daftar Ulang"
  //   : "Bayar di Awal Semester";

  const labelCicilan1 = isKedokteran
    ? ""
    : isSemester1
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

  // 8 semester
  // const semesterOptions = useMemo(() => {
  //   const nums = (sourceSemesters || []).map((x) => x.semester).filter(Boolean);
  //   const uniq = Array.from(new Set(nums)).sort((a, b) => a - b);
  //   return uniq.length ? uniq : [1, 2, 3, 4, 5, 6, 7, 8];
  // }, [selected]);

  const semesterOptions = useMemo(() => {
    const nums = (sourceSemesters || []).map((x) => x.semester).filter(Boolean);
    let uniq = Array.from(new Set(nums)).sort((a, b) => a - b);

    // Jika data kosong, fallback:
    if (!uniq.length) {
      if (isKedokteran) {
        uniq = [1, 2, 3, 4, 5, 6, 7];
      } else {
        uniq = [1, 2, 3, 4, 5, 6, 7, 8];
      }
    }

    // 🔒 Safety clamp: Kedok maksimal semester 7
    if (isKedokteran) {
      uniq = uniq.filter((n) => n >= 1 && n <= 7);
    }

    return uniq;
  }, [sourceSemesters, isKedokteran]);

  const groupedProdi = useMemo(() => {
    const map = {};
    prodiData.forEach((p) => {
      if (!map[p.fakultas]) map[p.fakultas] = [];
      map[p.fakultas].push(p);
    });
    return map;
  }, [prodiData]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (prodiRef.current && !prodiRef.current.contains(e.target)) {
        setOpenProdi(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // <div className="min-h-screen bg-neutral-50 text-neutral-900">
    //   <div className="mx-auto max-w-6xl px-6 py-10">
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/biaya/rincian-lengkap/logo_unpas.png"
                alt="Logo Pasundan"
                className="h-12 w-auto"
              />
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Rincian Biaya Pendidikan (S1) Universitas Pasundan
              </h2>
            </div>

            {/* {!isKedokteran && (
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="green">Cicilan 1 = Bayar Awal</Badge>
                <Badge tone="amber">Cicilan 2 = Pelunasan</Badge>
                <Badge tone="slate">Total = Cicilan 1 + Cicilan 2</Badge>
              </div>
            )} */}
          </header>

          {!isKedokteran && (
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
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

            {/* KOLOM 1: PILIH PRODI */}
            {/* <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold text-neutral-600">Pilih Program Studi</div>
              <select
                value={selectedKey}
                onChange={(e) => {
                  setSelectedKey(e.target.value);
                  setSemester(1);
                  setGelombang(1);
                }}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm"
              >
                {Object.entries(groupedProdi).map(([fakultas, listProdi]) => (
                  <optgroup key={fakultas} label={fakultas}>
                    {listProdi.map((p) => (
                      <option key={`${p.fakultas}|${p.prodi}`} value={`${p.fakultas}|${p.prodi}`}>
                        S1 - {p.prodi}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div> */}

            {/* KOLOM 1: PILIH PRODI (CUSTOM DROPDOWN PRO) */}
            <div
              ref={prodiRef}
              className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <div className="text-xs font-semibold text-neutral-600">Pilih Program Studi</div>

              {/* Trigger */}
              <button
                type="button"
                onClick={() => setOpenProdi((v) => !v)}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-left flex items-center justify-between"
              >
                <span className="truncate">
                  {selected
                    ? `${selected.fakultas} — ${selected.prodi}`
                    : "Pilih Program Studi"}
                </span>
                <span className="text-neutral-400">▾</span>
              </button>

              {/* Dropdown */}
              {openProdi && (
                <div className="absolute z-50 mt-2 w-full rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden">

                  {/* Search */}
                  <div className="p-2 border-b">
                    <input
                      value={searchProdi}
                      onChange={(e) => setSearchProdi(e.target.value)}
                      placeholder="Cari program studi..."
                      className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm"
                    />
                  </div>

                  {/* List */}
                  <div className="max-h-80 overflow-y-auto">

                    {Object.entries(groupedProdi).map(([fakultas, listProdi]) => {
                      // Filter by search
                      const filtered = listProdi.filter((p) =>
                        p.prodi.toLowerCase().includes(searchProdi.toLowerCase())
                      );

                      if (filtered.length === 0) return null;

                      const isActiveFaculty = filtered.some(
                        (p) => `${p.fakultas}|${p.prodi}` === selectedKey
                      );

                      return (
                        <div key={fakultas}>
                          {/* Fakultas Header */}
                          <div className="px-4 py-2 text-sm font-semibold text-neutral-700 bg-white">
                            {fakultas}
                          </div>

                          {/* Prodi */}
                          {filtered.map((p) => {
                            const key = `${p.fakultas}|${p.prodi}`;
                            const active = selectedKey === key;

                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => {
                                  setSelectedKey(key);
                                  setSemester(1);
                                  setGelombang(1);
                                  setOpenProdi(false);
                                }}
                                className={
                                  "w-full text-left px-8 py-2 text-sm transition-colors " +
                                  (active
                                    ? "bg-blue-700 text-white font-semibold"
                                    : "text-neutral-800 hover:bg-blue-700 hover:text-white")
                                }
                              >
                                S1 — {p.prodi}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}

                  </div>
                </div>
              )}
            </div>

            {/* KOLOM 2: JIKA KEDOKTERAN = GELOMBANG, JIKA BUKAN = SEMESTER */}
            {isKedokteran ? (
              <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold text-neutral-600">Pilih Gelombang</div>
                <select
                  value={gelombang}
                  onChange={(e) => {
                    setGelombang(Number(e.target.value));
                    // setSemester(1);
                  }}
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm"
                >
                  {[1, 2, 3].map((g) => (
                    <option key={g} value={g}>Gelombang {g}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold text-neutral-600">Pilih Semester</div>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm"
                >
                  {semesterOptions.map((n) => (
                    <option key={n} value={n}>Semester {n}</option>
                  ))}
                </select>
              </div>
            )}

            {/* KOLOM 3: JIKA KEDOKTERAN = SEMESTER, JIKA BUKAN = TOGGLE */}
            {isKedokteran ? (
              <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold text-neutral-600">Pilih Semester</div>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm"
                >
                  {semesterOptions.map((n) => (
                    <option key={n} value={n}>Semester {n}</option>
                  ))}
                </select>
              </div>
            ) : (
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
              </div>
            )}

          </div>

          {/* <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard
              tone="green"
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
          </section> */}

          {!isKedokteran ? (
            <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatCard
                tone="green"
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
          ) :
            (
              <section className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="font-extrabold mb-4">Biaya Fakultas Kedokteran</div>
                <div className="w-full overflow-x-auto">
                  <table className="min-w-[600px] w-full border border-neutral-300 border-collapse">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="p-3 text-center border border-neutral-300 whitespace-nowrap">
                          Rincian Dana
                        </th>
                        <th className="p-3 text-center border border-neutral-300 whitespace-nowrap">
                          Jumlah
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold">
                          A. DP (Dana Pembangunan)
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap"></td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap pl-8">
                          A.1. DPU Universitas
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold text-right">
                          Rp 120.000.000
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap pl-8">
                          A.2. DPF Fakultas
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold text-right">
                          Rp 80.000.000
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold">
                          B. DPP (Dana Penyelenggara Pendidikan) Sarjana
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold text-right">
                          Rp 27.600.000
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold">
                          C. DPP (Dana Penyelenggara Pendidikan) Profesi*
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold text-right">
                          Rp 40.000.000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="font-extrabold mb-4 mt-6">IFK=INFAK*</div>
                <div className="w-full overflow-x-auto">
                  <table className="min-w-[700px] w-full border border-neutral-300 border-collapse text-sm">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="p-3 border border-neutral-300 text-center whitespace-nowrap">
                          IFK
                        </th>
                        <th className="p-3 border border-neutral-300 text-center whitespace-nowrap">
                          Gelombang I
                        </th>
                        <th className="p-3 border border-neutral-300 text-center whitespace-nowrap">
                          Gelombang II
                        </th>
                        <th className="p-3 border border-neutral-300 text-center whitespace-nowrap">
                          Gelombang III
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-neutral-300 font-semibold whitespace-nowrap">
                          Wajib
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap text-right font-semibold">
                          Rp 100.000.000
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap text-right font-semibold">
                          Rp 125.000.000
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap text-right font-semibold">
                          Rp 150.000.000
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-neutral-300 font-semibold whitespace-nowrap">
                          Kelipatan
                        </td>
                        <td
                          className="p-3 border border-neutral-300 text-center whitespace-nowrap font-semibold"
                          colSpan={3}
                        >
                          Rp 25.000.000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="font-extrabold mb-4 mt-8">POTONGAN DPP 12,5% UNTUK 10 ORANG PERTAMA YANG MEMBAYAR LUNAS</div>
                <div className="font-extrabold mb-4">*) Biaya dapat berubah sewaktu-waktu sesuai kebijakan yang berlaku</div>

              </section>
            )}

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
                  <p className="mt-1 text-sm text-neutral-600">Semester {s?.semester || semester} {!isKedokteran && <> • Skema pembayaran 2 tahap</>}</p>
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
                    <div className="mt-2 text-xs text-neutral-600">
                      {descRingkasCicilan1}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                    <div className="text-xs font-semibold text-neutral-600">Pelunasan nanti</div>
                    <div className="mt-2 text-2xl font-extrabold">{formatIDR(s?.cicilan2 || 0)}</div>
                    <div className="mt-2 text-xs text-neutral-600">Pelunasan Semester (Cicilan 2) sesuai jadwal ketentuan PMB.</div>
                  </div>
                </div>
              ) : (
                <div
                  className={
                    isKedokSingleStage
                      ? "grid grid-cols-1 gap-4"
                      : "grid grid-cols-1 gap-4 sm:grid-cols-2"
                  }
                >

                  {/* ================= CARD UTAMA ================= */}
                  <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold text-neutral-600">
                          {/* {isKedokteran
                            ? isKedokSingleStage
                              ? "Biaya Semester"
                              : "Tahap 1"
                            : "Cicilan 1"} */}
                          {isKedokteran
                            ? isKedokSemester3Up
                              ? "Biaya Semester"
                              : isKedokSemester2
                                ? "Tahap 3"
                                : "Tahap 1"
                            : "Cicilan 1"}
                        </div>

                        {!isKedokSingleStage && (
                          <div className="mt-1 text-base font-extrabold">
                            {labelCicilan1}
                          </div>
                        )}
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
                                {/* <td className="px-4 py-3 text-sm text-right font-semibold">{formatIDR(x.nominal)}</td> */}
                                <td className="px-4 py-3 text-sm text-right font-semibold">
                                  {x.komponen === "Infak Kelipatan (50%)"
                                    ? "Kelipatan Rp 25.000.000"
                                    : formatIDR(x.nominal)}
                                </td>
                              </tr>
                            ))}
                            <tr className="border-t border-neutral-200 bg-neutral-50">
                              <td className="px-4 py-3 text-sm font-bold">Total rincian</td>
                              <td className="px-4 py-3 text-sm text-right font-extrabold">
                                {formatIDR(totalC1ByBreakdown)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="mt-4 text-xs text-neutral-600">
                        Rincian komponen disembunyikan.
                      </div>
                    )}
                  </div>

                  {/* ================= CARD TAHAP 2 ================= */}
                  {!isKedokSingleStage && (
                    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-neutral-600">
                            {isKedokteran ? "Tahap 2" : "Cicilan 2"}
                          </div>
                          {!isKedokteran && (
                            <div className="mt-1 text-base font-extrabold">Pelunasan Semester</div>
                          )}
                        </div>
                        <Badge tone="green">{formatIDR(s?.cicilan2 || 0)}</Badge>
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
                                  {/* <td className="px-4 py-3 text-sm text-right font-semibold">{formatIDR(x.nominal)}</td> */}
                                  <td className="px-4 py-3 text-sm text-right font-semibold">
                                  {x.komponen === "Infak Kelipatan (50%)"
                                    ? "Kelipatan Rp 25.000.000"
                                    : formatIDR(x.nominal)}
                                </td>
                                </tr>
                              ))}
                              <tr className="border-t border-neutral-200 bg-neutral-50">
                                <td className="px-4 py-3 text-sm font-bold">Total rincian</td>
                                <td className="px-4 py-3 text-sm text-right font-extrabold">
                                  {formatIDR(totalC2ByBreakdown)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="mt-4 text-xs text-neutral-600">
                          Rincian komponen disembunyikan.
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}
            </div>
          </section>

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
