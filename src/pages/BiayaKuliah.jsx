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
    green: "bg-[#f3efec] text-black border-neutral-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] ${tones[tone]}`}>
      {children}
    </span>
  );
}

function StatCard({ label, value, note, tone }) {
  const toneRing = {
    neutral: "ring-neutral-200",
    green: "ring-emerald-200",
    amber: "ring-neutral-200",
    slate: "ring-slate-300",
  };
  const toneBg = {
    neutral: "bg-white",
    green: "bg-emerald-100",
    amber: "bg-[#f3efec]",
    slate: "bg-slate-200",
  };
  return (
    <div className={`rounded-3xl border border-neutral-200 p-5 shadow-sm ring-1 ${toneRing[tone]} ${toneBg[tone]}`}>
      <div className="text-md font-semibold">{label}</div>
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
          cicilan3: Number(s.cicilan3 || 0),
          rincianC1: Array.isArray(s.rincianC1) ? s.rincianC1 : [],
          rincianC2: Array.isArray(s.rincianC2) ? s.rincianC2 : [],
          rincianC3: Array.isArray(s.rincianC3) ? s.rincianC3 : [],
        })),
      };
    })
    .filter((p) => p.fakultas && p.prodi);
}

function calculateTotalPerSemester(semester, isFKIP) {
  if (!semester) return 0;

  return (
    (semester.cicilan1 || 0) +
    (semester.cicilan2 || 0) +
    (isFKIP ? (semester.cicilan3 || 0) : 0)
  );
}

function calculateTotalSampaiLulus({
  semesters = [],
  isFKIP,
  maxSemester,
}) {
  if (!Array.isArray(semesters)) return 0;

  return semesters
    .filter((s) => s.semester >= 1 && s.semester <= maxSemester)
    .reduce((total, s) => {
      return total + calculateTotalPerSemester(s, isFKIP);
    }, 0);
}

function buildLunasTable(semesters, cicilanCount) {
  const rowsMap = {};
  let grandTotal = 0;

  semesters.forEach((s) => {
    const rincianList = [
      ...(s.rincianC1 || []),
      ...(s.rincianC2 || []),
      ...(cicilanCount === 3 ? s.rincianC3 || [] : []),
    ];

    rincianList.forEach((r) => {
      if (r.komponen === "Infak Kelipatan (50%)") return;

      if (!rowsMap[r.komponen]) {
        rowsMap[r.komponen] = Array(8 * cicilanCount).fill(0);
      }

      const baseIndex = (s.semester - 1) * cicilanCount;
      const slot = rowsMap[r.komponen].findIndex(
        (v, i) => i >= baseIndex && i < baseIndex + cicilanCount && v === 0
      );

      if (slot !== -1) {
        rowsMap[r.komponen][slot] = r.nominal;
        grandTotal += r.nominal;
      }
    });
  });

  return { rowsMap, grandTotal };
}

function normalizeKomponenKedokteran(label) {
  if (!label) return label;

  // 1️⃣ DPP HARUS DIATAS DP
  if (label.startsWith("DPP")) return "DPP";

  // 2️⃣ DP tapi BUKAN DPP
  if (label.startsWith("DP ")) return "DP";

  // 3️⃣ Infak
  if (label.startsWith("Infak Wajib")) return "Infak Wajib";
  if (label.startsWith("Infak Kelipatan")) return "Infak Kelipatan";

  // 4️⃣ Lainnya
  if (label === "PKKMB") return "PKKMB";

  return label;
}

function buildLunasTableKedokteran(semesters = []) {
  const rowsMap = {};
  let grandTotal = 0;
  let hasInfakKelipatan = false;

  semesters.slice(0, 7).forEach((s, semIdx) => {
    const rincianList = [
      ...(s.rincianC1 || []),
      ...(s.rincianC2 || []),
      ...(s.rincianC3 || []),
    ];

    rincianList.forEach((r) => {
      // 🔹 DETEKSI infak kelipatan (tidak dihitung)
      if (r.komponen?.startsWith("Infak Kelipatan")) {
        hasInfakKelipatan = true;
        return;
      }

      if (!r.nominal) return;

      const normalized = normalizeKomponenKedokteran(r.komponen);

      if (!rowsMap[normalized]) {
        rowsMap[normalized] = Array(7).fill(0);
      }

      rowsMap[normalized][semIdx] += r.nominal;
      grandTotal += r.nominal;
    });
  });

  return {
    rowsMap,
    grandTotal,
    hasInfakKelipatan,
  };
}

export default function HalamanDetailBiaya() {
  const rawDataContoh = rawDataBiayaProdi;

  const prodiData = useMemo(() => normalizeProdiData(rawDataContoh), [rawDataContoh]);

  const [selectedKey, setSelectedKey] = useState(`${prodiData[0]?.fakultas}|${prodiData[0]?.prodi}`);
  const [semester, setSemester] = useState(1);
  const [gelombang, setGelombang] = useState(1);
  const [openProdi, setOpenProdi] = useState(false);
  const [searchProdi, setSearchProdi] = useState("");
  const prodiRef = useRef(null);
  const [openSkema, setOpenSkema] = useState(false);
  const skemaRef = useRef(null);

  const selected = useMemo(() => {
    const [fak, pr] = String(selectedKey || "").split("|");
    return prodiData.find((p) => p.fakultas === fak && p.prodi === pr) || prodiData[0];
  }, [prodiData, selectedKey]);

  const isLunas = semester === "lunas";

  const isFKIP = selected?.fakultas === "Fakultas Keguruan dan Ilmu Pendidikan";

  const cicilanCount = isFKIP ? 3 : 2;

  const isKedokteran = !!selected?.isKedokteran;

  const sourceSemesters = isKedokteran
    ? selected?.gelombang?.[gelombang]?.semesters
    : selected?.semesters;

  const s = useMemo(() => {
    const found = sourceSemesters?.find((x) => x.semester === semester);
    return found || sourceSemesters?.[0];
  }, [sourceSemesters, semester]);

  // const totalSemester = (s?.cicilan1 || 0) + (s?.cicilan2 || 0);

  // const totalSemester =
  //   (s?.cicilan1 || 0) +
  //   (s?.cicilan2 || 0) +
  //   (isFKIP ? (s?.cicilan3 || 0) : 0);

  const totalSemester = useMemo(() => {
    return calculateTotalPerSemester(s, isFKIP);
  }, [s, isFKIP]);

  const semestersForTotal = useMemo(() => {
    if (isKedokteran) {
      return selected?.gelombang?.[gelombang]?.semesters || [];
    }
    return selected?.semesters || [];
  }, [isKedokteran, selected, gelombang]);

  const totalSampaiLulus = useMemo(() => {
    return calculateTotalSampaiLulus({
      semesters: semestersForTotal,
      isFKIP,
      maxSemester: isKedokteran ? 7 : 8,
    });
  }, [semestersForTotal, isFKIP, isKedokteran]);

  //tambahan
  const isSemester1 = (s?.semester || semester) === 1;

  const currentSemester = s?.semester || semester;

  const baseCicilan = (currentSemester - 1) * cicilanCount;
  const cicilanKe1 = baseCicilan + 1;
  const cicilanKe2 = baseCicilan + 2;
  const cicilanKe3 = baseCicilan + 3;

  // Kedok semester 2 dan ke atas = single card
  const isKedokSingleStage = isKedokteran && (s?.semester || semester) >= 2;
  // Khusus pembeda judul
  const isKedokSemester2 = isKedokteran && currentSemester === 2;
  const isKedokSemester3Up = isKedokteran && currentSemester >= 3

  const labelCicilan1 = isKedokteran
    ? ""
    : isSemester1
      ? "Pembayaran Cicilan 1"
      : `Pembayaran cicilan ${cicilanKe1}`;

  const descCicilan1 = isSemester1
    ? "Nominal minimum yang dibayar saat daftar ulang (registrasi awal)."
    : "Nominal yang dibayar di awal untuk memulai semester berjalan.";

  const descRingkasCicilan1 = isSemester1
    ? "Bayar Saat Daftar Ulang (Cicilan 1). Detail pelunasan & rincian komponen tersedia di halaman ini."
    : "Pembayaran awal semester berjalan (Cicilan 1). Sisa pembayaran ditampilkan sebagai pelunasan.";

  const totalC1ByBreakdown = sumBreakdown(s?.rincianC1);
  const totalC2ByBreakdown = sumBreakdown(s?.rincianC2);
  const totalC3ByBreakdown = sumBreakdown(s?.rincianC3);

  const breakdownMismatch =
    (s?.rincianC1?.length ? totalC1ByBreakdown !== (s?.cicilan1 || 0) : false) ||
    (s?.rincianC2?.length ? totalC2ByBreakdown !== (s?.cicilan2 || 0) : false) ||
    (s?.rincianC3?.length ? totalC3ByBreakdown !== (s?.cicilan3 || 0) : false);

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
      // PRODI
      if (openProdi) {
        if (!prodiRef.current || !prodiRef.current.contains(e.target)) {
          setOpenProdi(false);
        }
      }

      // SKEMA / GELOMBANG
      if (openSkema) {
        if (!skemaRef.current || !skemaRef.current.contains(e.target)) {
          setOpenSkema(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openProdi, openSkema]);

  const hasInfakKelipatanC1 = (s?.rincianC1 || []).some(
    (x) => x.komponen === "Infak Kelipatan (50%)"
  );

  const hasInfakKelipatanC2 = (s?.rincianC2 || []).some(
    (x) => x.komponen === "Infak Kelipatan (50%)"
  );

  //lunas table
  // const lunasTable = useMemo(() => {
  //   if (!isLunas || isKedokteran) return null;

  //   return buildLunasTable(
  //     selected?.semesters || [],
  //     cicilanCount
  //   );
  // }, [isLunas, isKedokteran, selected, cicilanCount]);

  const lunasTable = useMemo(() => {
    if (!isLunas) return null;

    if (isKedokteran) {
      return buildLunasTableKedokteran(
        selected?.gelombang?.[gelombang]?.semesters || []
      );
    }

    return buildLunasTable(
      selected?.semesters || [],
      cicilanCount
    );
  }, [isLunas, isKedokteran, selected, gelombang, cicilanCount]);

  const statCardLabel = isLunas
    ? "Total Biaya Lunas 8 Semester"
    : `Total Biaya Semester ${semester}`;

  const statCardValue = isLunas
    ? formatIDR(lunasTable?.grandTotal || totalSampaiLulus || 0)
    : formatIDR(totalSemester);

  function getInfakWajibKedok(gelombang) {
    const map = {
      1: 100_000_000,
      2: 125_000_000,
      3: 150_000_000,
      4: 175_000_000,
    };
    return map[gelombang] || 0;
  }

  // tampilkan card rincian jika:
  // - NON kedok & belum lunas
  // - KEDOKTERAN & BELUM LUNAS
  const showRincianCard = !isLunas;

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
          </header>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                                    ? "bg-[#6B5B51] text-white font-semibold"
                                    : "text-neutral-800 hover:bg-[#6B5B51] hover:text-white")
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
                  {[1, 2, 3, 4].map((g) => (
                    <option key={g} value={g}>Gelombang {g}</option>
                  ))}
                </select>
              </div>
            ) : (
              // <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              //   <div className="text-xs font-semibold text-neutral-600">Pilih Skema Pembayaran</div>
              //   <select
              //     value={semester}
              //     onChange={(e) => setSemester(e.target.value === "lunas" ? "lunas" : Number(e.target.value))}
              //     className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm"
              //   >
              //     {semesterOptions.map((n) => (
              //       <option key={n} value={n}>Semester {n} (cicilan)</option>
              //     ))}
              //     <option value="lunas">Lunas (8 Semester)</option>
              //   </select>
              // </div>
              <div
                ref={skemaRef}
                className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <div className="text-xs font-semibold text-neutral-600">
                  Pilih Skema Pembayaran
                </div>

                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => setOpenSkema(v => !v)}
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-left flex items-center justify-between"
                >
                  <span className="truncate">
                    {semester === "lunas"
                      ? "Lunas (Semester 1 s.d 8)"
                      : `Cicilan — Semester ${semester}`}
                  </span>
                  <span className="text-neutral-400">▾</span>
                </button>

                {/* Dropdown */}
                {openSkema && (
                  <div className="absolute z-50 mt-2 w-full rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden">

                    {/* ===== CICILAN ===== */}
                    <div className="px-4 py-2 text-sm font-semibold text-neutral-700 bg-neutral-50">
                      Cicilan
                    </div>

                    {semesterOptions.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => {
                          setSemester(n);
                          setOpenSkema(false);
                        }}
                        className={
                          "w-full text-left px-8 py-2 text-sm transition-colors " +
                          (semester === n
                            ? "bg-[#6B5B51] text-white font-semibold"
                            : "text-neutral-800 hover:bg-[#6B5B51] hover:text-white")
                        }
                      >
                        Semester {n}
                      </button>
                    ))}

                    {/* ===== LUNAS ===== */}
                    <div className="px-4 py-2 mt-1 text-sm font-semibold text-neutral-700 bg-neutral-50">
                      Lunas
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSemester("lunas");
                        setOpenSkema(false);
                      }}
                      className={
                        "w-full text-left px-8 py-2 text-sm transition-colors " +
                        (semester === "lunas"
                          ? "bg-[#6B5B51] text-white font-semibold"
                          : "text-neutral-800 hover:bg-[#6B5B51] hover:text-white")
                      }
                    >
                      Semester 1 s.d 8
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* KOLOM 3: JIKA KEDOKTERAN = SEMESTER, JIKA BUKAN = TOGGLE */}
            {isKedokteran ? (
              <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold text-neutral-600">Pilih Skema Pembayaran</div>
                <select
                  value={semester}
                  onChange={(e) =>
                    setSemester(e.target.value === "lunas" ? "lunas" : Number(e.target.value))
                  }
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm"
                >
                  {semesterOptions.map((n) => (
                    <option key={n} value={n}>Semester {n}</option>
                  ))}

                  <option value="lunas">Semester 1 s.d 7</option>
                </select>
              </div>
            ) : (
              <StatCard
                tone="amber"
                label={statCardLabel}
                value={statCardValue}
              />
            )}

          </div>

          {!isKedokteran ? (
            <section className="mt-6 rounded-3xl px-2">
              <div className="font-extrabold mb-4">
                {isLunas
                  ? "Berikut rincian pembayaran lunas 8 semester:"
                  : `Berikut rincian pembayaran cicilan untuk semester ${semester}:`}
              </div>
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
                          Jenis Pembayaran
                        </th>
                        <th className="p-3 text-center border border-neutral-300 whitespace-nowrap">
                          Jumlah
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold">
                          DP (Dana Pembangunan)
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold text-center">Awal</td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold text-right">Rp 200.000.000</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold">
                          DPP (Dana Penyelenggara Pendidikan) Sarjana
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold text-center">
                          Per Semester
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold text-right">
                          Rp 27.600.000
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold">
                          DPP (Dana Penyelenggara Pendidikan) Profesi*
                        </td>
                        <td className="p-3 border border-neutral-300 whitespace-nowrap font-semibold text-center">
                          Per Semester
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
                        <th className="p-3 border border-neutral-300 text-center whitespace-nowrap">
                          Gelombang IV
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
                        <td className="p-3 border border-neutral-300 whitespace-nowrap text-right font-semibold">
                          Rp 175.000.000
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-neutral-300 font-semibold whitespace-nowrap">
                          Kelipatan
                        </td>
                        <td
                          className="p-3 border border-neutral-300 text-center whitespace-nowrap font-semibold"
                          colSpan={4}
                        >
                          Rp 25.000.000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="font-extrabold mb-4 mt-8 text-sm">POTONGAN DPP 12,5% UNTUK 10 ORANG PERTAMA YANG MEMBAYAR LUNAS (KHUSUS GELOMBANG EARLY BIRD)</div>
                <div className="font-semibold mb-4 text-xs text-neutral-600">*) Biaya Pendidikan dapat berubah sewaktu-waktu sesuai kebijakan yang berlaku</div>

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



          {isKedokteran ? (
            <section className="mt-6 rounded-3xl px-2">
              <div className="font-extrabold mb-4">
                {isLunas
                  ? "Berikut rincian pembayaran semester 1 s.d semester 7:"
                  : `Berikut rincian pembayaran semester ${semester}:`}
              </div>
            </section>
          ) : null}

          {showRincianCard && (
            <section className="mt-6 rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <div className="p-5 sm:p-6 border-b border-neutral-200">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold tracking-tight">
                      {selected?.fakultas} — {selected?.prodi}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">Semester {s?.semester || semester} {!isKedokteran && <> • Skema pembayaran {cicilanCount} tahap</>}</p>
                  </div>
                  <div className="text-xs text-neutral-500 sm:text-left">{selected?.catatan}</div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
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
                          {isKedokteran ? (
                            isKedokSemester3Up ? (
                              "Biaya Semester"
                            ) : isKedokSemester2 ? (
                              <>
                                Tahap 3 - {" "}
                                <span className="font-semibold text-neutral-600">Semester 2</span>
                              </>
                            ) : (
                              "Tahap 1 - Semester 1"
                            )
                          ) : null}
                        </div>

                        {!isKedokSingleStage && (
                          <div className="mt-1 text-base font-extrabold">
                            {labelCicilan1}
                          </div>
                        )}
                      </div>

                      {/* <Badge tone="green">{formatIDR(s?.cicilan1 || 0)}</Badge> */}

                      {s.rincianC1?.some((x) => x.komponen === "Infak Kelipatan (50%)") ? (
                        <Badge tone="green">
                          <span className="text-sm font-bold">
                            (Total rincian belum termasuk infak kelipatan)
                          </span>
                        </Badge>
                      ) : (
                        <Badge tone="green">
                          <span className="text-sm font-bold">
                            {formatIDR(s?.cicilan1 || 0)}
                          </span>
                        </Badge>
                      )}

                    </div>

                    {/* Rincian */}
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
                              <td className="px-4 py-3 text-sm text-neutral-800">
                                {x.komponen === "Infak Kelipatan (50%)" ? (
                                  <Badge tone="green">
                                    <span className="text-sm font-bold">
                                      {x.komponen}
                                    </span>
                                  </Badge>
                                ) : (
                                  <span
                                    className={
                                      x.komponen === "DPP Semester 2 (100%)"
                                        ? "text-neutral-800"
                                        : "text-neutral-800"
                                    }
                                  >
                                    {x.komponen}
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-semibold">
                                {x.komponen === "Infak Kelipatan (50%)" ? (
                                  <div className="flex justify-end">
                                    <Badge tone="green">
                                      <span className="text-sm font-bold">
                                        (Kelipatan Rp 25.000.000)
                                      </span>
                                    </Badge>
                                  </div>
                                ) : (
                                  <span
                                    className={
                                      x.komponen === "DPP Semester 2 (100%)"
                                        ? "text-neutral-600"
                                        : ""
                                    }
                                  >
                                    {formatIDR(x.nominal)}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                          <tr className="border-t border-neutral-200 bg-neutral-50">
                            {/* <td className="px-4 py-3 text-sm font-bold">Total rincian</td> */}
                            <td className="px-4 py-3 text-sm font-bold">
                              {hasInfakKelipatanC1 ? "Total rincian minimal" : "Total rincian"}
                            </td>
                            <td className="px-4 py-3 text-sm text-right font-extrabold">
                              {formatIDR(totalC1ByBreakdown)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>

                  {/* ================= CARD TAHAP 2 ================= */}
                  {!isKedokSingleStage && (
                    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-neutral-600">
                            {isKedokteran ? "Tahap 2 - Semester 1" : null}
                          </div>
                          {!isKedokteran && (
                            <div className="mt-1 text-base font-extrabold">Pembayaran cicilan {cicilanKe2}</div>
                          )}
                        </div>

                        {/* <Badge tone="green">{formatIDR(s?.cicilan2 || 0)}</Badge> */}

                        {s.rincianC2?.some((x) => x.komponen === "Infak Kelipatan (50%)") ? (
                          <Badge tone="green">
                            <span className="text-sm font-bold">
                              (Total rincian belum termasuk infak kelipatan)
                            </span>
                          </Badge>
                        ) : (
                          <Badge tone="green">
                            <span className="text-sm font-bold">
                              {formatIDR(s?.cicilan2 || 0)}
                            </span>
                          </Badge>
                        )}

                      </div>

                      {/* Rincian */}
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
                                {/* <td className="px-4 py-3 text-sm text-neutral-800">{x.komponen}</td> */}
                                <td className="px-4 py-3 text-sm">
                                  {x.komponen === "Infak Kelipatan (50%)" ? (
                                    <Badge tone="green">
                                      <span className="text-sm font-bold">
                                        {x.komponen}
                                      </span>
                                    </Badge>
                                  ) : (
                                    <span
                                      className={
                                        x.komponen === "DPP Semester 2 (100%)"
                                          ? "text-emerald-600 font-bold"
                                          : "text-neutral-800"
                                      }
                                    >
                                      {x.komponen}
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-right font-semibold">
                                  {x.komponen === "Infak Kelipatan (50%)" ? (
                                    <div className="flex justify-end">
                                      <Badge tone="green">
                                        <span className="text-sm font-bold">
                                          Kelipatan Rp 25.000.000
                                        </span>
                                      </Badge>
                                    </div>
                                  ) : (
                                    <span
                                      className={
                                        x.komponen === "DPP Semester 2 (100%)"
                                          ? "text-emerald-600 font-bold"
                                          : ""
                                      }
                                    >
                                      {formatIDR(x.nominal)}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                            <tr className="border-t border-neutral-200 bg-neutral-50">
                              {/* <td className="px-4 py-3 text-sm font-bold">Total rincian</td> */}
                              <td className="px-4 py-3 text-sm font-bold">
                                {hasInfakKelipatanC2 ? "Total rincian minimal" : "Total rincian"}
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-extrabold">
                                {formatIDR(totalC2ByBreakdown)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  )}

                  {isFKIP && (
                    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="mt-1 text-base font-extrabold">
                            Pembayaran cicilan {cicilanKe3}
                          </div>
                        </div>

                        <Badge tone="green">
                          <span className="text-sm font-bold">
                            {formatIDR(s?.cicilan3 || 0)}
                          </span>
                        </Badge>
                      </div>

                      {/* Rincian */}
                      <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
                        <table className="min-w-[420px] w-full">
                          <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500">
                              <th className="px-4 py-3">Komponen</th>
                              <th className="px-4 py-3 text-right">Nominal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(s?.rincianC3 || []).map((x) => (
                              <tr key={x.komponen}>
                                <td className="px-4 py-3 text-sm">{x.komponen}</td>
                                <td className="px-4 py-3 text-sm text-right font-semibold">
                                  {formatIDR(x.nominal)}
                                </td>
                              </tr>
                            ))}
                            <tr className="border-t border-neutral-200 bg-neutral-50">
                              <td className="px-4 py-3 text-sm font-bold">
                                Total rincian
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-extrabold">
                                {formatIDR(totalC3ByBreakdown)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            </section>
          )}

          {isLunas && !isKedokteran && lunasTable && (
            <section className="mt-6 rounded-3xl border border-neutral-200 bg-white shadow-sm p-6">
              <h2 className="font-extrabold mb-4 text-md">
                {selected?.fakultas} — {selected?.prodi}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full border border-neutral-300 border-collapse text-sm">
                  <thead>
                    <tr className="bg-neutral-100">
                      <th className="p-3 border border-neutral-300 text-center font-semibold">
                        Biaya
                      </th>

                      {Array.from({ length: 8 }).map((_, sIdx) => (
                        <th
                          key={sIdx}
                          className="p-3 border border-neutral-300 text-center font-semibold"
                        >
                          Semester {sIdx + 1}
                        </th>
                      ))}

                      <th className="p-3 border border-neutral-300 text-center font-semibold">
                        Jumlah
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* ===== ISI PER KOMPONEN ===== */}
                    {Object.entries(lunasTable.rowsMap).map(([komponen, values]) => {
                      // total per semester (akumulasi cicilan)
                      const semesterTotals = Array.from({ length: 8 }).map((_, semIdx) => {
                        const start = semIdx * cicilanCount;
                        const end = start + cicilanCount;

                        return values
                          .slice(start, end)
                          .reduce((sum, v) => sum + (v || 0), 0);
                      });

                      const rowTotal = semesterTotals.reduce((a, b) => a + b, 0);

                      return (
                        <tr key={komponen}>
                          <td className="p-3 border border-neutral-300 font-semibold">
                            {komponen}
                          </td>

                          {semesterTotals.map((v, i) => (
                            <td
                              key={i}
                              className="p-3 border border-neutral-300 text-right"
                            >
                              {v ? formatIDR(v) : "-"}
                            </td>
                          ))}

                          <td className="p-3 border border-neutral-300 text-right font-extrabold">
                            {formatIDR(rowTotal)}
                          </td>
                        </tr>
                      );
                    })}

                    {/* ===== BARIS JUMLAH PER SEMESTER ===== */}
                    <tr className="bg-neutral-50">
                      <td className="p-3 border border-neutral-300 font-extrabold">
                        Jumlah
                      </td>

                      {Array.from({ length: 8 }).map((_, semIdx) => {
                        const colTotal = Object.values(lunasTable.rowsMap).reduce(
                          (sum, row) => {
                            const start = semIdx * cicilanCount;
                            const end = start + cicilanCount;

                            return (
                              sum +
                              row.slice(start, end).reduce((a, b) => a + (b || 0), 0)
                            );
                          },
                          0
                        );

                        return (
                          <td
                            key={semIdx}
                            className="p-3 border border-neutral-300 text-right font-semibold"
                          >
                            {colTotal ? formatIDR(colTotal) : "-"}
                          </td>
                        );
                      })}

                      <td className="p-3 border border-neutral-300 text-right font-extrabold text-black bg-[#f3efec]">
                        {formatIDR(lunasTable.grandTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {isLunas && isKedokteran && lunasTable && (
            <section className="mt-6 rounded-3xl border border-neutral-200 bg-white shadow-sm p-6">
              <h2 className="font-extrabold mb-4 text-md">
                {selected?.fakultas} — {selected?.prodi}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full border border-neutral-300 border-collapse text-sm">
                  <thead>
                    <tr className="bg-neutral-100">
                      <th className="p-3 border border-neutral-300">Biaya</th>

                      {Array.from({
                        length: isKedokteran ? 7 : 8,
                      }).map((_, i) => (
                        <th key={i} className="p-3 border border-neutral-300 text-center">
                          Semester {i + 1}
                        </th>
                      ))}

                      <th className="p-3 border border-neutral-300 text-center">
                        Jumlah
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(lunasTable.rowsMap).map(([komponen, values]) => {
                      const rowTotal = values.reduce((a, b) => a + b, 0);

                      return (
                        <tr key={komponen}>
                          <td className="p-3 border border-neutral-300 font-semibold">
                            {komponen}
                          </td>

                          {values.map((v, i) => (
                            <td
                              key={i}
                              className="p-3 border border-neutral-300 text-right"
                            >
                              {v ? formatIDR(v) : "-"}
                            </td>
                          ))}

                          <td className="p-3 border border-neutral-300 text-right font-extrabold">
                            {formatIDR(rowTotal)}
                          </td>
                        </tr>
                      );
                    })}

                    {lunasTable.hasInfakKelipatan && (
                      <tr>
                        <td className="p-3 border border-neutral-300 font-semibold">
                          Infak Kelipatan
                        </td>

                        {/* Semester 1–2 */}
                        <td
                          colSpan={1}
                          className="p-3 border border-neutral-300 text-center"
                        >
                          Kelipatan <br /> Rp 25.000.000
                        </td>

                        {/* Semester 2–7 */}
                        {Array.from({ length: 6 }).map((_, i) => (
                          <td
                            key={i}
                            className="p-3 border border-neutral-300 text-right"
                          >
                            -
                          </td>
                        ))}

                        <td className="p-3 border border-neutral-300 text-right">
                          -
                        </td>
                      </tr>
                    )}

                    {/* TOTAL */}
                    <tr className="bg-neutral-50">
                      <td className="p-3 border border-neutral-300 font-extrabold">
                        Jumlah
                      </td>

                      {Array.from({
                        length: isKedokteran ? 7 : 8,
                      }).map((_, i) => {
                        const colTotal = Object.values(lunasTable.rowsMap).reduce(
                          (sum, row) => sum + (row[i] || 0),
                          0
                        );

                        return (
                          <td
                            key={i}
                            className="p-3 border border-neutral-300 text-right font-semibold"
                          >
                            {colTotal ? formatIDR(colTotal) : "-"}
                          </td>
                        );
                      })}

                      <td className="p-3 border border-neutral-300 text-right font-extrabold bg-[#f3efec]">
                        {formatIDR(lunasTable.grandTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="font-semibold mb-4 mt-4 text-xs text-neutral-600">*) Total Biaya belum termasuk Infak Kelipatan</div>
            </section>
          )}

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
