/* eslint-disable unicorn/number-literal-case */
// 16-bit Cyclic Redundancy Check.
export function computeCRC(value: string) {
  const hexstring = stringToHex(value);

  const crcTable = [
    0x00_00, 0x10_21, 0x20_42, 0x30_63, 0x40_84, 0x50_a5, 0x60_c6, 0x70_e7,
    0x81_08, 0x91_29, 0xa1_4a, 0xb1_6b, 0xc1_8c, 0xd1_ad, 0xe1_ce, 0xf1_ef,
    0x12_31, 0x02_10, 0x32_73, 0x22_52, 0x52_b5, 0x42_94, 0x72_f7, 0x62_d6,
    0x93_39, 0x83_18, 0xb3_7b, 0xa3_5a, 0xd3_bd, 0xc3_9c, 0xf3_ff, 0xe3_de,
    0x24_62, 0x34_43, 0x04_20, 0x14_01, 0x64_e6, 0x74_c7, 0x44_a4, 0x54_85,
    0xa5_6a, 0xb5_4b, 0x85_28, 0x95_09, 0xe5_ee, 0xf5_cf, 0xc5_ac, 0xd5_8d,
    0x36_53, 0x26_72, 0x16_11, 0x06_30, 0x76_d7, 0x66_f6, 0x56_95, 0x46_b4,
    0xb7_5b, 0xa7_7a, 0x97_19, 0x87_38, 0xf7_df, 0xe7_fe, 0xd7_9d, 0xc7_bc,
    0x48_c4, 0x58_e5, 0x68_86, 0x78_a7, 0x08_40, 0x18_61, 0x28_02, 0x38_23,
    0xc9_cc, 0xd9_ed, 0xe9_8e, 0xf9_af, 0x89_48, 0x99_69, 0xa9_0a, 0xb9_2b,
    0x5a_f5, 0x4a_d4, 0x7a_b7, 0x6a_96, 0x1a_71, 0x0a_50, 0x3a_33, 0x2a_12,
    0xdb_fd, 0xcb_dc, 0xfb_bf, 0xeb_9e, 0x9b_79, 0x8b_58, 0xbb_3b, 0xab_1a,
    0x6c_a6, 0x7c_87, 0x4c_e4, 0x5c_c5, 0x2c_22, 0x3c_03, 0x0c_60, 0x1c_41,
    0xed_ae, 0xfd_8f, 0xcd_ec, 0xdd_cd, 0xad_2a, 0xbd_0b, 0x8d_68, 0x9d_49,
    0x7e_97, 0x6e_b6, 0x5e_d5, 0x4e_f4, 0x3e_13, 0x2e_32, 0x1e_51, 0x0e_70,
    0xff_9f, 0xef_be, 0xdf_dd, 0xcf_fc, 0xbf_1b, 0xaf_3a, 0x9f_59, 0x8f_78,
    0x91_88, 0x81_a9, 0xb1_ca, 0xa1_eb, 0xd1_0c, 0xc1_2d, 0xf1_4e, 0xe1_6f,
    0x10_80, 0x00_a1, 0x30_c2, 0x20_e3, 0x50_04, 0x40_25, 0x70_46, 0x60_67,
    0x83_b9, 0x93_98, 0xa3_fb, 0xb3_da, 0xc3_3d, 0xd3_1c, 0xe3_7f, 0xf3_5e,
    0x02_b1, 0x12_90, 0x22_f3, 0x32_d2, 0x42_35, 0x52_14, 0x62_77, 0x72_56,
    0xb5_ea, 0xa5_cb, 0x95_a8, 0x85_89, 0xf5_6e, 0xe5_4f, 0xd5_2c, 0xc5_0d,
    0x34_e2, 0x24_c3, 0x14_a0, 0x04_81, 0x74_66, 0x64_47, 0x54_24, 0x44_05,
    0xa7_db, 0xb7_fa, 0x87_99, 0x97_b8, 0xe7_5f, 0xf7_7e, 0xc7_1d, 0xd7_3c,
    0x26_d3, 0x36_f2, 0x06_91, 0x16_b0, 0x66_57, 0x76_76, 0x46_15, 0x56_34,
    0xd9_4c, 0xc9_6d, 0xf9_0e, 0xe9_2f, 0x99_c8, 0x89_e9, 0xb9_8a, 0xa9_ab,
    0x58_44, 0x48_65, 0x78_06, 0x68_27, 0x18_c0, 0x08_e1, 0x38_82, 0x28_a3,
    0xcb_7d, 0xdb_5c, 0xeb_3f, 0xfb_1e, 0x8b_f9, 0x9b_d8, 0xab_bb, 0xbb_9a,
    0x4a_75, 0x5a_54, 0x6a_37, 0x7a_16, 0x0a_f1, 0x1a_d0, 0x2a_b3, 0x3a_92,
    0xfd_2e, 0xed_0f, 0xdd_6c, 0xcd_4d, 0xbd_aa, 0xad_8b, 0x9d_e8, 0x8d_c9,
    0x7c_26, 0x6c_07, 0x5c_64, 0x4c_45, 0x3c_a2, 0x2c_83, 0x1c_e0, 0x0c_c1,
    0xef_1f, 0xff_3e, 0xcf_5d, 0xdf_7c, 0xaf_9b, 0xbf_ba, 0x8f_d9, 0x9f_f8,
    0x6e_17, 0x7e_36, 0x4e_55, 0x5e_74, 0x2e_93, 0x3e_b2, 0x0e_d1, 0x1e_f0,
  ];

  const s = hexstring.match(/../g) ?? [];
  let crc = 0xff_ff;
  let index: number;

  for (const character of s) {
    const c = Number(`0x${character}`);
    index = (c ^ (crc >> 8)) & 0xff;
    crc = (crcTable[index] as number) ^ (crc << 8);
  }
  const answer = Math.trunc(crc) & 0xff_ff;
  return numberToHex(answer);
}

export function validateChecksum(emvString: string) {
  const emvData = emvString.slice(0, Math.max(0, emvString.length - 4));
  const checksum = emvString
    .slice(Math.max(0, emvString.length - 4))
    .toUpperCase();
  const expectedCRC = computeCRC(emvData).toUpperCase();

  return expectedCRC === checksum;
}

function stringToHex(value: string) {
  return Buffer.from(value, "utf8").toString("hex");
}

function numberToHex(n: number) {
  const hex = (1 * n).toString(16);
  return hex.length % 2 == 0 ? hex : `0${hex}`;
}
