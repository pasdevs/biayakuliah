export const rawDataBiayaProdi = [
  // fakultas hukum
  {
    fakultas: "Fakultas Hukum",
    prodi: "Ilmu Hukum",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 9_100_000,
        cicilan2: 7_750_000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 750_000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_250_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 2_750_000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 750_000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_250_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 2_750_000 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 7_750_000,
        cicilan2: 7_750_000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 750_000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_250_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 2_750_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 750_000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_250_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 2_750_000 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 5_000_000,
        cicilan2: 5_000_000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 5_000_000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 5_000_000 }],
      })),
    ],
  },

  // fakultas ilmu sosial dan ilmu politik
  {
    fakultas: "Fakultas Ilmu Sosial dan Ilmu Politik",
    prodi: "Ilmu Administrasi Publik",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 6950000,
        cicilan2: 5600000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 725000 },
          { komponen: "PKKMB", nominal: 1350000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 725000 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 5600000,
        cicilan2: 5600000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 725000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 725000 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4000000,
        cicilan2: 4000000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ilmu Sosial dan Ilmu Politik",
    prodi: "Ilmu Kesejahteraan Sosial",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 6391000,
        cicilan2: 5041000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 666000 },
          { komponen: "PKKMB", nominal: 1350000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 666000 },
        ],
      },
      ...[2, 3].map((k) => ({
        semester: k,
        cicilan1: 5041000,
        cicilan2: 5041000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 666000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 666000 },
        ],
      })),
      {
        semester: 4,
        cicilan1: 5041000,
        cicilan2: 5048000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 666000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 673000 },
        ],
      },
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 3500000,
        cicilan2: 3500000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ilmu Sosial dan Ilmu Politik",
    prodi: "Ilmu Hubungan Internasional",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 6838000,
        cicilan2: 5488000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 613000 },
          { komponen: "PKKMB", nominal: 1350000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 613000 },
        ],
      },
      ...[2, 3].map((k) => ({
        semester: k,
        cicilan1: 5488000,
        cicilan2: 5488000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 613000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 613000 },
        ],
      })),
      {
        semester: 4,
        cicilan1: 5488000,
        cicilan2: 5489000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 613000 },
          { komponen: "PKKMB", nominal: 1350000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 614000 },
        ],
      },
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4000000,
        cicilan2: 4000000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ilmu Sosial dan Ilmu Politik",
    prodi: "Ilmu Administrasi Bisnis",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 6376000,
        cicilan2: 5026000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 651000 },
          { komponen: "PKKMB", nominal: 1350000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 651000 },
        ],
      },
      ...[2, 3].map((k) => ({
        semester: k,
        cicilan1: 5026000,
        cicilan2: 5026000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 651000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 651000 },
        ],
      })),
      {
        semester: 4,
        cicilan1: 5026000,
        cicilan2: 5028000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 651000 },
          { komponen: "PKKMB", nominal: 1350000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 653000 },
        ],
      },
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 3500000,
        cicilan2: 3500000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ilmu Sosial dan Ilmu Politik",
    prodi: "Ilmu Komunikasi",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 7218000,
        cicilan2: 5868000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 993000 },
          { komponen: "PKKMB", nominal: 1350000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 993000 },
        ],
      },
      ...[2, 3].map((k) => ({
        semester: k,
        cicilan1: 5868000,
        cicilan2: 5868000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 993000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 993000 },
        ],
      })),
      {
        semester: 4,
        cicilan1: 5868000,
        cicilan2: 5874000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 993000 },
          { komponen: "PKKMB", nominal: 1350000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 875000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 999000 },
        ],
      },
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4000000,
        cicilan2: 4000000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 }],
      })),
    ],
  },

  // Fakultas Teknik
  {
    fakultas: "Fakultas Teknik",
    prodi: "Teknik Industri",
    catatan: "Semester 5–8 umumnya lebih ringan karena komponen tertentu sudah selesai dicicil.",
    semesters: [
      {
        semester: 1,
        cicilan1: 7_681_250,
        cicilan2: 6_331_250,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 518_750 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 518_750 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 6_331_250,
        cicilan2: 6_331_250,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 518_750 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 518_750 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4_875_000,
        cicilan2: 4_875_000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Teknik",
    prodi: "Teknologi Pangan",
    catatan: "Semester 5–8 umumnya lebih ringan karena komponen tertentu sudah selesai dicicil.",
    semesters: [
      {
        semester: 1,
        cicilan1: 8056250,
        cicilan2: 6706250,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 5125000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 643750 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 5125000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 643750 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 6706250,
        cicilan2: 6706250,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 5125000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 643750 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 5125000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 643750 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 5125000,
        cicilan2: 5125000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 5125000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 5125000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Teknik",
    prodi: "Teknik Mesin",
    catatan: "Semester 5–8 umumnya lebih ringan karena komponen tertentu sudah selesai dicicil.",
    semesters: [
      {
        semester: 1,
        cicilan1: 7915625,
        cicilan2: 6565625,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 753125 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 753125 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 6565625,
        cicilan2: 6565625,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 753125 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 753125 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4_875_000,
        cicilan2: 4_875_000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4_875_000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Teknik",
    prodi: "Teknik Informatika",
    catatan: "Semester 5–8 umumnya lebih ringan karena komponen tertentu sudah selesai dicicil.",
    semesters: [
      {
        semester: 1,
        cicilan1: 7700000,
        cicilan2: 6350000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 787500 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 787500 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 6350000,
        cicilan2: 6350000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 787500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 787500 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4625000,
        cicilan2: 4625000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Teknik",
    prodi: "Teknik Lingkungan",
    catatan: "Semester 5–8 umumnya lebih ringan karena komponen tertentu sudah selesai dicicil.",
    semesters: [
      {
        semester: 1,
        cicilan1: 7481250,
        cicilan2: 6131250,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 568750 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 568750 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 6131250,
        cicilan2: 6131250,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 568750 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 568750 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4625000,
        cicilan2: 4625000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Teknik",
    prodi: "Perencanaan Wilayah dan Kota",
    catatan: "Semester 5–8 umumnya lebih ringan karena komponen tertentu sudah selesai dicicil.",
    semesters: [
      {
        semester: 1,
        cicilan1: 7593750,
        cicilan2: 6243750,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 681250 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 681250 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 6243750,
        cicilan2: 6243750,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 681250 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 937_500 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 681250 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4625000,
        cicilan2: 4625000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4625000 }],
      })),
    ],
  },

  // Fakultas Ekonomi dan Bisnis
  {
    fakultas: "Fakultas Ekonomi dan Bisnis",
    prodi: "Manajemen",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 7537500,
        cicilan2: 6187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 7_750_000,
        cicilan2: 7_750_000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4687500,
        cicilan2: 4687500,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ekonomi dan Bisnis",
    prodi: "Akuntansi",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 7537500,
        cicilan2: 6187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 7_750_000,
        cicilan2: 7_750_000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4687500,
        cicilan2: 4687500,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ekonomi dan Bisnis",
    prodi: "Ekonomi Pembangunan",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 7537500,
        cicilan2: 6187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 7_750_000,
        cicilan2: 7_750_000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4687500,
        cicilan2: 4687500,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4687500 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ekonomi dan Bisnis",
    prodi: "Bisnis Digital",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 5150000,
        cicilan2: 3800000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 800000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 800000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
      },
      ...[2, 3, 4].map((k) => ({
        semester: k,
        cicilan1: 3800000,
        cicilan2: 3800000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 800000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 800000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 500000 },
        ],
      })),
      {
        semester: 5,
        cicilan1: 3300000,
        cicilan2: 3300000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 800000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2500000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 800000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2500000 },
        ],
      },
      ...[6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 2500000,
        cicilan2: 2500000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 2500000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 2500000 }],
      })),
    ],
  },

  // Fakultas Keguruan dan Ilmu Pendidikan
  {
    fakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
    prodi: "Pendidikan Pancasila dan Kewarganegaraan",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 3350000,
        cicilan2: 3031250,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2000000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3031250 },
        ],
      },
      {
        semester: 2,
        cicilan1: 3531250,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3031250 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 3,
        cicilan1: 3237500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 50000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 4,
        cicilan1: 3237500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 50000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 5,
        cicilan1: 3687500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 6,
        cicilan1: 3737500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 50000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 7,
        cicilan1: 3187500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 8,
        cicilan1: 2687500,
        cicilan2: 2687500,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
    ],
  },

  {
    fakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
    prodi: "Pendidikan Ekonomi",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 3470000,
        cicilan2: 3231250,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 120000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3231250 },
        ],
      },
      {
        semester: 2,
        cicilan1: 3451250,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2831250 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 120000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 3,
        cicilan1: 3307500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 120000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 4,
        cicilan1: 3187500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 5,
        cicilan1: 3812500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 125000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 6,
        cicilan1: 3687500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 7,
        cicilan1: 3187500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 8,
        cicilan1: 3037500,
        cicilan2: 2687500,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 350000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
    ],
  },

  {
    fakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
    prodi: "Pendidikan Bahasa dan Sastra Indonesia",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 3450000,
        cicilan2: 3031250,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 100000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3031250 },
        ],
      },
      {
        semester: 2,
        cicilan1: 3631250,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3031250 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 100000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 3,
        cicilan1: 3287500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 100000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 4,
        cicilan1: 3287500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 100000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 5,
        cicilan1: 3787500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 100000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 6,
        cicilan1: 3787500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 100000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 7,
        cicilan1: 3187500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 8,
        cicilan1: 2687500,
        cicilan2: 2687500,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
    ],
  },

  {
    fakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
    prodi: "Pendidikan Biologi",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 3750000,
        cicilan2: 3431250,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2100000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 300000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3431250 },
        ],
      },
      {
        semester: 2,
        cicilan1: 3331250,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2531250 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 300000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 3,
        cicilan1: 3487500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 300000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 4,
        cicilan1: 3487500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 300000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 5,
        cicilan1: 4037500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 350000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 6,
        cicilan1: 3987500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 300000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 7,
        cicilan1: 3312500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 125000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 8,
        cicilan1: 2687500,
        cicilan2: 2687500,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
    ],
  },

  {
    fakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
    prodi: "Pendidikan Matematika",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 3400000,
        cicilan2: 3031250,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 50000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3031250 },
        ],
      },
      {
        semester: 2,
        cicilan1: 3581250,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3031250 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 50000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 3,
        cicilan1: 3287500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 100000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 4,
        cicilan1: 3237500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 50000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 5,
        cicilan1: 3687500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 6,
        cicilan1: 3787500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 100000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 7,
        cicilan1: 3187500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 8,
        cicilan1: 2687500,
        cicilan2: 2687500,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
    ],
  },

  {
    fakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
    prodi: "Pendidikan Guru Sekolah Dasar",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 3365000,
        cicilan2: 3031250,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 15000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3031250 },
        ],
      },
      {
        semester: 2,
        cicilan1: 3531250,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3031250 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 3,
        cicilan1: 3187500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 4,
        cicilan1: 3187500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 5,
        cicilan1: 3687500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 6,
        cicilan1: 3737500,
        cicilan2: 3687500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 50000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1000000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 7,
        cicilan1: 3187500,
        cicilan2: 3187500,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 500000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
      {
        semester: 8,
        cicilan1: 2687500,
        cicilan2: 2687500,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 2687500 },
        ],
      },
    ],
  },

  // Fakultas Ilmu Seni dan Sastra
  {
    fakultas: "Fakultas Ilmu Seni dan Sastra",
    prodi: "Desain Komunikasi Visual",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 6900000,
        cicilan2: 5550000,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
        ],
      },
      {
        semester: 2,
        cicilan1: 5550000,
        cicilan2: 5550000,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
        ],
      },
      ...[3, 4].map((k) => ({
        semester: k,
        cicilan1: 5625000,
        cicilan2: 5625000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1625000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1625000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 4000000,
        cicilan2: 4000000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 4000000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ilmu Seni dan Sastra",
    prodi: "Fotografi",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 6775000,
        cicilan2: 5425000,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3875000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3875000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
        ],
      },
      {
        semester: 2,
        cicilan1: 5425000,
        cicilan2: 5425000,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3875000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3875000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
        ],
      },
      ...[3, 4].map((k) => ({
        semester: k,
        cicilan1: 5500000,
        cicilan2: 5500000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1625000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3875000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1625000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3875000 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 3875000,
        cicilan2: 3875000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3875000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3875000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ilmu Seni dan Sastra",
    prodi: "Seni Musik",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 6350000,
        cicilan2: 5000000,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3450000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3450000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
        ],
      },
      {
        semester: 2,
        cicilan1: 5000000,
        cicilan2: 5000000,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3450000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3450000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1550000 },
        ],
      },
      ...[3, 4].map((k) => ({
        semester: k,
        cicilan1: 5075000,
        cicilan2: 5075000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1625000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3450000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1625000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3450000 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 3450000,
        cicilan2: 3450000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3450000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3450000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Ilmu Seni dan Sastra",
    prodi: "Sastra Inggris",
    catatan: "Pembayaran per semester dapat dilakukan 2 tahap (cicilan) sesuai ketentuan PMB.",
    semesters: [
      {
        semester: 1,
        cicilan1: 6350000,
        cicilan2: 5000000,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1500000 },
          { komponen: "PKKMB", nominal: 1_350_000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1500000 },
        ],
      },
      {
        semester: 2,
        cicilan1: 5000000,
        cicilan2: 5000000,
        rincianC1: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1500000 },
        ],
        rincianC2: [
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
          { komponen: "DPPS (Praktikum/Fasilitas)", nominal: 1500000 },
        ],
      },
      ...[3, 4].map((k) => ({
        semester: k,
        cicilan1: 5125000,
        cicilan2: 5125000,
        rincianC1: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1625000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
        ],
        rincianC2: [
          { komponen: "DP (Pengembangan Institusi)", nominal: 1625000 },
          { komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 },
        ],
      })),
      ...[5, 6, 7, 8].map((k) => ({
        semester: k,
        cicilan1: 3500000,
        cicilan2: 3500000,
        rincianC1: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 }],
        rincianC2: [{ komponen: "DPP (Biaya Pendidikan)", nominal: 3500000 }],
      })),
    ],
  },

  {
    fakultas: "Fakultas Kedokteran",
    prodi: "Kedokteran",
    isKedokteran: true,

    gelombang: {
      1: {
        label: "Gelombang 1",
        semesters: [
          {
            semester: 1,
            cicilan1: 165_150_000,
            cicilan2: 103_800_000,
            rincianC1: [
              { komponen: "DPU Universitas (50%)", nominal: 60_000_000 },
              { komponen: "DPF Fakultas(50%)", nominal: 40_000_000 },
              { komponen: "Infak Wajib (50%)", nominal: 50_000_000 },
              { komponen: "DPP (50%)", nominal: 13_800_000 },
              { komponen: "PKKMB", nominal: 1_350_000 },
            ],
            rincianC2: [
              { komponen: "DPU Universitas (25%)", nominal: 30_000_000 },
              { komponen: "DPF Fakultas(25%)", nominal: 20_000_000 },
              { komponen: "Infak Wajib (40%)", nominal: 40_000_000 },
              { komponen: "DPP (50%)", nominal: 13_800_000 },
              { komponen: "Infak Kelipatan (50%)", nominal: "" },
            ],
          },
          {
            semester: 2,
            cicilan1: 87_600_000,
            cicilan2: "",
            rincianC1: [
              { komponen: "DPU Universitas (25%)", nominal: 30_000_000 },
              { komponen: "DPF Fakultas(25%)", nominal: 20_000_000 },
              { komponen: "Infak Wajib (10%)", nominal: 10_000_000 },
              { komponen: "DPP (Semester 2)", nominal: 27_600_000 },
              { komponen: "Infak Kelipatan (50%)", nominal: "" },
            ],
            rincianC2: [],
          },
          ...[3, 4, 5, 6, 7, 8].map((k) => ({
            semester: k,
            cicilan1: 27_600_000,
            cicilan2: "",
            rincianC1: [
              { komponen: "DPP", nominal: 27_600_000 }
            ],
            rincianC2: [],
          })),
        ],
      },

      2: {
        label: "Gelombang 2",
        semesters: [
          {
            semester: 1,
            cicilan1: 177_650_000,
            cicilan2: 113_800_000,
            rincianC1: [
              { komponen: "DPU Universitas (50%)", nominal: 60_000_000 },
              { komponen: "DPF Fakultas(50%)", nominal: 40_000_000 },
              { komponen: "Infak Wajib (50%)", nominal: 62_500_000 },
              { komponen: "DPP (50%)", nominal: 13_800_000 },
              { komponen: "PKKMB", nominal: 1_350_000 },
            ],
            rincianC2: [
              { komponen: "DPU Universitas (25%)", nominal: 30_000_000 },
              { komponen: "DPF Fakultas(25%)", nominal: 20_000_000 },
              { komponen: "Infak Wajib (40%)", nominal: 50_000_000 },
              { komponen: "DPP (50%)", nominal: 13_800_000 },
              { komponen: "Infak Kelipatan (50%)", nominal: "" },
            ],
          },
          {
            semester: 2,
            cicilan1: 90_100_000,
            cicilan2: "",
            rincianC1: [
              { komponen: "DPU Universitas (25%)", nominal: 30_000_000 },
              { komponen: "DPF Fakultas(25%)", nominal: 20_000_000 },
              { komponen: "Infak Wajib (10%)", nominal: 12_500_000 },
              { komponen: "DPP (Semester 2)", nominal: 27_600_000 },
              { komponen: "Infak Kelipatan (50%)", nominal: "" },
            ],
            rincianC2: [],
          },
          ...[3, 4, 5, 6, 7, 8].map((k) => ({
            semester: k,
            cicilan1: 27_600_000,
            cicilan2: "",
            rincianC1: [
              { komponen: "DPP", nominal: 27_600_000 }
            ],
            rincianC2: [],
          })),
        ],
      },

      3: {
        label: "Gelombang 3",
        semesters: [
          {
            semester: 1,
            cicilan1: 190_150_000,
            cicilan2: 123_800_000,
            rincianC1: [
              { komponen: "DPU Universitas (50%)", nominal: 60_000_000 },
              { komponen: "DPF Fakultas(50%)", nominal: 40_000_000 },
              { komponen: "Infak Wajib (50%)", nominal: 75_000_000 },
              { komponen: "DPP (50%)", nominal: 13_800_000 },
              { komponen: "PKKMB", nominal: 1_350_000 },
            ],
            rincianC2: [
              { komponen: "DPU Universitas (25%)", nominal: 30_000_000 },
              { komponen: "DPF Fakultas(25%)", nominal: 20_000_000 },
              { komponen: "Infak Wajib (40%)", nominal: 60_000_000 },
              { komponen: "DPP (50%)", nominal: 13_800_000 },
              { komponen: "Infak Kelipatan (50%)", nominal: "" },
            ],
          },
          {
            semester: 2,
            cicilan1: 92_600_000,
            cicilan2: "",
            rincianC1: [
              { komponen: "DPU Universitas (25%)", nominal: 30_000_000 },
              { komponen: "DPF Fakultas(25%)", nominal: 20_000_000 },
              { komponen: "Infak Wajib (10%)", nominal: 15_000_000 },
              { komponen: "DPP (Semester 2)", nominal: 27_600_000 },
              { komponen: "Infak Kelipatan (50%)", nominal: "" },
            ],
            rincianC2: [],
          },
          ...[3, 4, 5, 6, 7, 8].map((k) => ({
            semester: k,
            cicilan1: 27_600_000,
            cicilan2: "",
            rincianC1: [
              { komponen: "DPP", nominal: 27_600_000 }
            ],
            rincianC2: [],
          })),
        ],
      },

      4: {
        label: "Gelombang 4",
        semesters: [
          {
            semester: 1,
            cicilan1: 201_300_000,
            cicilan2: 133_800_000,
            rincianC1: [
              { komponen: "DPU Universitas (50%)", nominal: 60_000_000 },
              { komponen: "DPF Fakultas(50%)", nominal: 40_000_000 },
              { komponen: "Infak Wajib (50%)", nominal: 87_500_000 },
              { komponen: "DPP (50%)", nominal: 13_800_000 },
              { komponen: "PKKMB", nominal: 1_350_000 },
            ],
            rincianC2: [
              { komponen: "DPU Universitas (25%)", nominal: 30_000_000 },
              { komponen: "DPF Fakultas(25%)", nominal: 20_000_000 },
              { komponen: "Infak Wajib (40%)", nominal: 70_000_000 },
              { komponen: "DPP (50%)", nominal: 13_800_000 },
              { komponen: "Infak Kelipatan (50%)", nominal: "" },
            ],
          },
          {
            semester: 2,
            cicilan1: 95_100_000,
            cicilan2: "",
            rincianC1: [
              { komponen: "DPU Universitas (25%)", nominal: 30_000_000 },
              { komponen: "DPF Fakultas(25%)", nominal: 20_000_000 },
              { komponen: "Infak Wajib (10%)", nominal: 17_500_000 },
              { komponen: "DPP (Semester 2)", nominal: 27_600_000 },
              { komponen: "Infak Kelipatan (50%)", nominal: "" },
            ],
            rincianC2: [],
          },
          ...[3, 4, 5, 6, 7, 8].map((k) => ({
            semester: k,
            cicilan1: 27_600_000,
            cicilan2: "",
            rincianC1: [
              { komponen: "DPP", nominal: 27_600_000 }
            ],
            rincianC2: [],
          })),
        ],
      },

    },
  },
];
